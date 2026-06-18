import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, data } from 'react-router-dom';
import axios from 'axios';
import { Upload, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSelector } from "react-redux";
import Header from './Header';
export default function AccountCreationPage() {
 
   const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  
  

  const [formData, setFormData] = useState({
    accountNumber: '', // Add additional DTOAccount field properties if required
   

  });

  const [files, setFiles] = useState({
    passportPhoto: null,
    identityCard: null
  });
const [accountType,setAccountType]=useState("");
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fileKey) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({ ...prev, [fileKey]: e.target.files[0] }));
    }
  };
  const [accountLimitReached, setAccountLimitReached] = useState(false);
const [accountTypeList, setAccountTypeList] = useState([]);
useEffect(() => {
  const getAllowedAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/account/allowed/accounts",
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      let x=response.data.accountTypeList
if(x.length===0){
  setStatus({ type: 'danger', text: "Only 3 accounts are permitted" });
  setAccountLimitReached(true)
}
      setAccountTypeList(response.data.accountTypeList);
    } catch (err) {
      console.log(err);
    }
  };

  getAllowedAccounts();
}, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!files.passportPhoto || !files.identityCard) {
      setStatus({ type: 'danger', text: 'Please upload both required documents to proceed.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', text: '' });

    const dataPayload = new FormData();

    
    dataPayload.append('files', files.passportPhoto);
    dataPayload.append('files', files.identityCard);

   
    dataPayload.append('accountType', accountType);
   

    try {
     console.log(data.accountType)
      const response = await axios.post('http://localhost:8080/api/account/add/Account', dataPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        
           'Authorization': `Bearer ${user.token}`
        }
      });

      setStatus({ type: 'success', text: 'Account application and documents submitted successfully!' });
      setTimeout(() => {
        navigate('/customer-dashboard');
      }, 2500);

    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Failed to initialize application parameters.';
      setStatus({ type: 'danger', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Header />

      <div className="bg-bank-gradient">
        <div className="form-card">
          
          <button type="button" onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={16} /> Back
          </button>

         
          <h1 className="page-title text-navy">Create Account</h1>
          <p className="sub-title">Upload Documents & Complete Account Setup</p>

          {status.text && (
            <div className={`alert-bar alert-${status.type}`}>
              {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{status.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            
            <div className="field-group">
               <label className="form-label ">
    Select Account Type
  </label>
          <select required className='form-select shadow-sm' onChange={(e) =>

             {console.log("Selected:", e.target.value);
              setAccountType(e.target.value)}}>
                 <option>select the account type</option>
  {accountTypeList.map((type, index) => (
    <option key={index} value={type}>
      {type.replace("_"," ")}
    </option>
  ))}
</select>
            </div>

           
            <div className="upload-container">
              
              {/* Box A: Passport Photo Asset */}
              <div className={`upload-box ${files.passportPhoto ? 'file-selected' : ''}`}>
                <Upload className="upload-icon" size={24} />
                <div className="upload-label">Passport Size Photo</div>
                <div className="upload-hint">
                  {files.passportPhoto ? files.passportPhoto.name : 'Click to upload JPG / PNG'}
                </div>
                <input 
                  type="file" 
                  accept="image/jpeg, image/png"
                  onChange={(e) => handleFileChange(e, 'passportPhoto')}
                />
              </div>

             
              <div className={`upload-box ${files.identityCard ? 'file-selected' : ''}`}>
                <Upload className="upload-icon" size={24} />
                <div className="upload-label">Aadhaar Card Document</div>
                <div className="upload-hint">
                  {files.identityCard ? files.identityCard.name : 'Click to upload PDF / JPG'}
                </div>
                <input 
                  type="file" 
                  accept="image/jpeg, image/png, application/pdf"
                  onChange={(e) => handleFileChange(e, 'identityCard')}
                />
              </div>

            </div>

            <button type="submit" disabled={loading || accountLimitReached} className="btn-submit">
              {loading ? 'Submitting Application Documents...' : 'Complete Secure Verification'}
            </button>

          </form>

        </div>
      </div>
    </>
  );
}
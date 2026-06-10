import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSelector } from "react-redux";
export default function AccountCreationPage() {
  const { accountType } = useParams();
   const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Normalize parameter layout to match your backend Enum structure (e.g., "BUSINESS ACCOUNT" -> "BUSINESS_ACCOUNT")
  const formattedAccountType = accountType ? accountType.replace(/%20/g, ' ').replace(/ /g, '_') : '';

  const [formData, setFormData] = useState({
    accountNumber: '', // Add additional DTOAccount field properties if required
    initialBalance: '',
  });

  const [files, setFiles] = useState({
    passportPhoto: null,
    identityCard: null
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!files.passportPhoto || !files.identityCard) {
      setStatus({ type: 'danger', text: 'Please upload both required documents to proceed.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', text: '' });

    const dataPayload = new FormData();

    // 1. Append the Multipart files array matching the backend @RequestParam("files") configuration
    dataPayload.append('files', files.passportPhoto);
    dataPayload.append('files', files.identityCard);

    // 2. Append DTOAccount model data elements matching backend @ModelAttribute DTOAccount properties
    dataPayload.append('accountType', formattedAccountType);
   

    try {
      // Execute the request via Axios utilizing an implicit authenticated session cookielayer/token authorization header if needed
      const response = await axios.post('http://localhost:8080/api/account/add/Account', dataPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        
           'Authorization': `Bearer ${user.token}`
        }
      });

      setStatus({ type: 'success', text: 'Account application and documents submitted successfully!' });
      setTimeout(() => {
        navigate('/accountList');
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
     

      <div className="bg-bank-gradient">
        <div className="form-card">
          
          <button type="button" onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={16} /> Back
          </button>

          {/* Main Heading dynamically displaying account type parameter mapping */}
          <h1 className="page-title text-navy">{formattedAccountType.replace(/_/g, ' ')}</h1>
          <p className="sub-title">Upload Documents & Complete Account Setup</p>

          {status.text && (
            <div className={`alert-bar alert-${status.type}`}>
              {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{status.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* Input fields to dynamically satisfy standard DTOAccount configurations */}
            <div className="field-group">
              <label>Initial Deposit Amount (INR)</label>
              <input 
                type="number" 
                name="initialBalance" 
                required 
                min="0"
                value={formData.initialBalance}
                onChange={handleInputChange}
                placeholder="e.g. 10000"
              />
            </div>

            {/* Document Collection Container Elements */}
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

              {/* Box B: Verification Card Document */}
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

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Submitting Application Documents...' : 'Complete Secure Verification'}
            </button>

          </form>

        </div>
      </div>
    </>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User, Lock, FileText, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import axios from 'axios';
import Header from './Header';
export default function SignupForm() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullname: '',
    email: '',
    gender: 'MALE',
    dob: '',
    phonenumber: '',
    aadharno: '',
    panno: '',
    location: ''
  });

  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setStatusMessage({ type: "", text: "" });

  try {
    const response = await axios.post(
      "http://localhost:8080/api/customer/addCustomer",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    setStatusMessage({
      type: "success",
      text: "Customer account successfully registered!",
    });

      navigate("/signin");
  

  } catch (error) {
    console.error(error);

    setStatusMessage({
      type: "danger",
      text:
        error.response?.data?.message ||
        "Registration failed. Please check parameters.",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Header />

      <div className="bg-bank-gradient">
        <div className="card-custom">
          
          <div className="form-header">
            <h2>Onboard New Customer</h2>
            <p>Fill out system profiles securely below</p>
          </div>

          {statusMessage.text && (
            <div className={`alert-custom alert-${statusMessage.type}`}>
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* Account Credentials */}
            <div className="section-divider">Account Credentials</div>
            <div className="form-grid-2">
              <div className="input-group-custom">
                <label>User Name</label>
                <div className="input-wrapper-inner">
                  <User />
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>
              </div>
              <div className="input-group-custom">
                <label>Password</label>
                <div className="input-wrapper-inner">
                  <Lock />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Personal Profile */}
            <div className="section-divider">Personal Profile</div>
            <div className="form-grid-2">
              <div className="input-group-custom">
                <label>Full Name</label>
                <div className="input-wrapper-inner">
                  <User />
                  <input
                    type="text"
                    name="fullname"
                    required
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>
              </div>
              <div className="input-group-custom">
                <label>Email Address</label>
                <div className="input-wrapper-inner">
                  <Mail />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="form-grid-3">
              <div className="input-group-custom">
                <label>Gender</label>
                <div className="input-wrapper-inner">
                  <User />
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
              <div className="input-group-custom">
                <label>Date of Birth</label>
                <div className="input-wrapper-inner">
                  <Calendar />
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-group-custom">
                <label>Phone Number</label>
                <div className="input-wrapper-inner">
                  <Phone />
                  <input
                    type="tel"
                    name="phonenumber"
                    required
                    value={formData.phonenumber}
                    onChange={handleChange}
                    placeholder="9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="section-divider">Verification & Demographics</div>
            <div className="form-grid-3">
              <div className="input-group-custom">
                <label>Aadhaar Number</label>
                <div className="input-wrapper-inner">
                  <FileText />
                  <input
                    type="text"
                    name="aadharno"
                    required
                    value={formData.aadharno}
                    onChange={handleChange}
                    placeholder="1234-5678-9012"
                  />
                </div>
              </div>
              <div className="input-group-custom">
                <label>PAN Number</label>
                <div className="input-wrapper-inner">
                  <FileText />
                  <input
                    type="text"
                    name="panno"
                    required
                    value={formData.panno}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                  />
                </div>
              </div>
              <div className="input-group-custom">
                <label>Location</label>
                <div className="input-wrapper-inner">
                  <MapPin />
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. CHENNAI"
                  />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-submit-custom">
              {loading ? 'Processing Registration...' : 'Register Customer Profile'}
            </button>

            <button type="button" onClick={() => navigate(-1)} className="btn-back-custom">
              Back to System Control
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
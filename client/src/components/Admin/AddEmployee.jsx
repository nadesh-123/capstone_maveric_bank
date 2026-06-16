import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AdminHeader from './AdminHeader';

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    contactno: '',
    role: 'EMPLOYEE' // Default selection matching your backend Role enum
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  // Extract the token securely from your Redux store state
  const token = useSelector((state) => state.user?.token);

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
    setMessage({ type: '', text: '' });

    try {
      // Axios request with Bearer authentication configuration
      console.log(formData)
      console.log(token)
      const response = await axios.post(
        'http://localhost:8080/api/admin/add-employee', 
        formData, 
        {
          headers: {
           
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setMessage({ type: 'success', text: 'Employee registered successfully!' });
      // Reset form variables upon successful dispatch
      setFormData({ name: '', username: '', email: '', contactno: '', role: 'EMPLOYEE' });
    } catch (error) {
      console.error("Error creating employee account:", error);
      const backendErrorMessage = error.response?.data?.message || 'Failed to add employee. Please check authorizations.';
      setMessage({ type: 'danger', text: backendErrorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .admin-card {
          border: none;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .form-control, .form-select {
          border-radius: 8px;
          padding: 10px 14px;
          border-color: #dee2e6;
        }
        .form-control:focus, .form-select:focus {
          box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15);
          border-color: #0d6efd;
        }
        .btn-submit {
          border-radius: 8px;
          padding: 12px;
          font-weight: 600;
        }
      `}
      </style>
 <AdminHeader />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card admin-card p-4 p-sm-5 bg-white">
              
              {/* Module Header */}
              <div className="text-center mb-4">
                <h3 className="fw-bold text-dark mb-1">Register New Employee</h3>
                <p className="text-muted small">Fill out profile credentials to provision corporate access level parameters.</p>
              </div>

              {/* Server Notifications banner */}
              {message.text && (
                <div className={`alert alert-${message.type} alert-dismissible fade show d-flex align-items-center mb-4`} role="alert">
                  <div className="small fw-medium">{message.text}</div>
                </div>
              )}

              {/* Form implementation */}
              <form onSubmit={handleSubmit}>
                
                {/* Full Name Input */}
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="John Doe"
                  />
                </div>

                {/* Corporate Username Input */}
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold">Username</label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="johndoe_emp"
                  />
                </div>

                {/* Email Anchor Input */}
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="johndoe@company.com"
                  />
                </div>

                {/* Contact Number Input */}
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold">Contact Number</label>
                  <input
                    type="text"
                    name="contactno"
                    required
                    value={formData.contactno}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="+1234567890"
                  />
                </div>

                {/* Role Enumeration Options Mapping */}
                <div className="mb-4">
                  <label className="form-label text-secondary small fw-semibold">System Access Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="MANAGER">Manager</option>
                   
                  </select>
                </div>

                {/* Submission Target Action trigger */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-submit w-100 shadow-sm d-flex align-items-center justify-content-center"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing Provisioning...
                    </>
                  ) : (
                    'Provision Employee Account'
                  )}
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
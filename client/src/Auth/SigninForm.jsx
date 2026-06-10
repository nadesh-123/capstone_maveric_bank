import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import axios from 'axios';
export default function SigninForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user.id);
    console.log(user.username);
    
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const credentials = formData.username+":"+formData.password;
      const encodedCredentials = window.btoa(credentials);

      const response =await axios.get('http://localhost:8080/api/user/loginv2', {
        
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Basic "+encodedCredentials
                }
      });

    
        const data =response.data;
        const res=await axios.get("http://localhost:8080/api/user/get-details",
          {
            headers:{
              "Authorization":"Bearer "+data.token
            }
          }
        )
       const userDetails=res.data
        dispatch(
          setUser({
            id: userDetails.userId,
            username: data.username,
           
            token: data.token
          })
        );

        if (userDetails.role === "CUSTOMER") {
          navigate("/customer-dashboard");
        } else if (userDetails.role === "EMPLOYEE") {
          navigate("/employee-dashboard");
        }
      }catch (error) {
      console.log("Network or client error:", error);
      setError('A network error occurred. Please try again.');
    }
  };

  return (
    <>
      <style>{`
        .bg-bank-gradient {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
        }
        .text-navy-primary {
          color: #0A2540;
        }
        .btn-navy-primary {
          background-color: #0A2540;
          color: #ffffff;
          border: none;
          transition: all 0.2s ease-in-out;
        }
        .btn-navy-primary:hover {
          background-color: #061729;
          color: #ffffff;
          transform: translateY(-1px);
        }
        .btn-navy-primary:active {
          transform: translateY(0);
        }
        .text-emerald-accent {
          color: #00a388;
        }
        .text-emerald-accent:hover {
          color: #00826c;
        }
        .form-control:focus {
          border-color: #0A2540;
          box-shadow: 0 0 0 0.25rem rgba(10, 37, 64, 0.15);
        }
        .card-custom {
          border: none;
          border-radius: 1.25rem;
          box-shadow: 0 1rem 3rem rgba(10, 37, 64, 0.08) !important;
        }
        .input-group-text-custom {
          background-color: #f8f9fa;
          border-right: none;
          color: #64748b;
        }
        .input-custom {
          border-left: none;
        }
      `}</style>

      <div className="container-fluid min-vh-screen d-flex align-items-center justify-content-center bg-bank-gradient p-4">
        <div className="row w-full justify-content-center" style={{ maxWidth: '450px' }}>
          <div className="col-12">
            <div className="card card-custom bg-white p-4 p-md-5">
              
              {/* Header */}
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center mb-3 rounded-circle" style={{ backgroundColor: 'rgba(10, 37, 64, 0.05)', width: '60px', height: '60px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0A2540" style={{ width: '32px', height: '32px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                  </svg>
                </div>
                <h2 className="fw-bold tracking-tight text-navy-primary mb-1">
                  Secure Sign In
                </h2>
                <p className="text-muted small">
                  Access your secure corporate banking interface
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center py-2 px-3 mb-4 rounded-3" role="alert" style={{ fontSize: '0.875rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="me-2" style={{ width: '18px', height: '18px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <div>{error}</div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>

                {/* Username Field */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary small mb-1">
                    User Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text input-group-text-custom">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '18px', height: '18px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control form-control-lg input-custom bg-light fs-6"
                      placeholder="Enter username"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label fw-semibold text-secondary small mb-0">
                      Password
                    </label>
                    <a href="#" className="text-decoration-none small fw-medium text-emerald-accent">
                      Forgot password?
                    </a>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text input-group-text-custom">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '18px', height: '18px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control form-control-lg input-custom bg-light fs-6"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-navy-primary btn-lg w-100 py-2.5 fw-semibold fs-6 shadow-sm mb-3"
                >
                  Sign In
                </button>
              </form>

              {/* Footer Link */}
              <div className="text-center mt-2">
                <p className="text-muted small mb-0">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => navigate('/signup')} 
                    className="btn btn-link p-0 text-decoration-none small fw-semibold text-emerald-accent alignment-baseline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function LoanApplication() {
  const token = useSelector((state) => state.user.token);

  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    disbursementAccountId: '',
    loanType: '',
    requestedAmount: '',
    tenureYears: '',
    purpose: '',
    monthlyIncome: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8080/api/account/getActiveAccounts', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      disbursementAccount: parseInt(formData.disbursementAccountId, 10),
      loanType: formData.loanType,
      requestedAmount: parseFloat(formData.requestedAmount),
      tenureYears: parseInt(formData.tenureYears, 10),
      purpose: formData.purpose,
      monthlyIncome: parseFloat(formData.monthlyIncome)
    };

    axios.post('http://localhost:8080/api/loan-application/apply', payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setMessage({ type: 'success', text: 'Loan application submitted successfully!' });
      setFormData({
        disbursementAccountId: '',
        loanType: '',
        requestedAmount: '',
        tenureYears: '',
        purpose: '',
        monthlyIncome: ''
      });
    })
    .catch((err) => {
      setMessage({ type: 'danger', text: 'Failed to submit loan application. Please try again.' });
      console.error(err);
    });
  };

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm border border-secondary-subtle">
        <div className="card-header bg-dark text-white py-3">
          <h4 className="card-title mb-0 text-center">Apply for a Loan</h4>
        </div>
        <div className="card-body p-4">
          
          {message.text && (
            <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
              {message.text}
              <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <label className="form-label fw-semibold">Disbursement Account</label>
              <select
                name="disbursementAccountId"
                className="form-select"
                value={formData.disbursementAccountId}
                onChange={handleChange}
                required
              >
                <option value="">Select Account</option>
                {accounts.map((acc) => (
                  <option key={acc.accno} value={acc.accountNumber}>
                    {acc.accountType.replace('_', ' ')} - Acc No: {acc.accountNumber} (Bal: ₹{acc.balance})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Loan Type</label>
              <select
                name="loanType"
                className="form-select"
                value={formData.loanType}
                onChange={handleChange}
                required
              >
                <option value="">Select Loan Type</option>
                <option value="HOME_LOAN">Home Loan</option>
                <option value="CAR_LOAN">Car Loan</option>
                <option value="GOLD_LONE">Gold Loan</option>
                <option value="PERSONAL_LOAN">Personal Loan</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Requested Amount (₹)</label>
                <input
                  type="number"
                  name="requestedAmount"
                  className="form-type form-control"
                  value={formData.requestedAmount}
                  onChange={handleChange}
                  min="1"
                  step="any"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Tenure (Years)</label>
                <input
                  type="number"
                  name="tenureYears"
                  className="form-control"
                  value={formData.tenureYears}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Monthly Income (₹)</label>
              <input
                type="number"
                name="monthlyIncome"
                className="form-control"
                value={formData.monthlyIncome}
                onChange={handleChange}
                min="1"
                step="any"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Purpose of Loan</label>
              <textarea
                name="purpose"
                className="form-control"
                rows="3"
                value={formData.purpose}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-dark btn-lg py-2">
                Apply Loan
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
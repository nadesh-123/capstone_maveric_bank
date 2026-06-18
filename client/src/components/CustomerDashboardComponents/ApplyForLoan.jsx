import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from './Header';

export default function ApplyForLoan() {
  const token = useSelector((state) => state.user.token);

  const [accounts, setAccounts] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [maxLoanAmount, setMaxLoanAmount] = useState(null);

  const [message, setMessage] = useState({
    type: '',
    text: ''
  });

  const [formData, setFormData] = useState({
    disbursementAccountId: '',
    loanType: '',
    requestedAmount: '',
    tenureYears: '',
    purpose: '',
    monthlyIncome: ''
  });

  // Fetch active accounts
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:8080/api/account/getActiveAccounts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          setAccounts(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [token]);

  // Automatically calculate max loan amount
  useEffect(() => {
    const calculateMaxLoan = async () => {
      if (
        formData.loanType &&
        formData.monthlyIncome &&
        formData.tenureYears
      ) {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/loan/max-amount',
            {
              monthlySalary: parseFloat(formData.monthlyIncome),
              loanType: formData.loanType,
              tenureYears: parseInt(formData.tenureYears, 10)
            }
          );

          setMaxLoanAmount(response.data.maximumLoanAmount);
        } catch (error) {
          console.error(error);
          setMaxLoanAmount(null);
        }
      } else {
        setMaxLoanAmount(null);
      }
    };

    calculateMaxLoan();
  }, [
    formData.loanType,
    formData.monthlyIncome,
    formData.tenureYears
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const allowedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg'
    ];

    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setMessage({
          type: 'danger',
          text: 'Only PDF, PNG and JPEG files are allowed.'
        });

        e.target.value = '';
        setSelectedFiles([]);
        return;
      }
    }

    setSelectedFiles(files);

    setMessage({
      type: '',
      text: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      maxLoanAmount &&
      parseFloat(formData.requestedAmount) > maxLoanAmount
    ) {
      setMessage({
        type: 'danger',
        text: `Requested amount cannot exceed ₹${Number(
          maxLoanAmount
        ).toLocaleString()}`
      });

      return;
    }

    try {
      const payload = {
        disbursementAccount: parseInt(
          formData.disbursementAccountId,
          10
        ),
        loanType: formData.loanType,
        requestedAmount: parseFloat(formData.requestedAmount),
        tenureYears: parseInt(formData.tenureYears, 10),
        purpose: formData.purpose,
        monthlyIncome: parseFloat(formData.monthlyIncome)
      };

      // Apply loan
      const response = await axios.post(
        'http://localhost:8080/api/loan-application/apply',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const appId = response.data.id;

      // Upload files only if files are selected
      if (selectedFiles.length > 0) {
        const fileFormData = new FormData();

        selectedFiles.forEach((file) => {
          fileFormData.append('files', file);
        });

        await axios.post(
          `http://localhost:8080/api/documents/upload/${appId}`,
          fileFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }

      setMessage({
        type: 'success',
        text: 'Loan application submitted successfully!'
      });

      setFormData({
        disbursementAccountId: '',
        loanType: '',
        requestedAmount: '',
        tenureYears: '',
        purpose: '',
        monthlyIncome: ''
      });

      setSelectedFiles([]);
      setMaxLoanAmount(null);

      document.getElementById('fileInput').value = '';
    } catch (error) {
      console.error(error);

      setMessage({
        type: 'danger',
        text: 'An error occurred during submission.'
      });
    }
  };

  return (
    <div>
        <Header />
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm border border-secondary-subtle">
        <div className="card-header btn-navy-primary text-white py-3">
          <h4 className="card-title mb-0 text-center">
            Apply for a Loan
          </h4>
        </div>

        <div className="card-body p-4">
          {message.text && (
            <div
              className={`alert alert-${message.type} alert-dismissible fade show`}
            >
              {message.text}
              <button
                type="button"
                className="btn-close"
                onClick={() =>
                  setMessage({
                    type: '',
                    text: ''
                  })
                }
              />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Account */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Disbursement Account
              </label>

              <select
                className="form-select"
                name="disbursementAccountId"
                value={formData.disbursementAccountId}
                onChange={handleChange}
                required
              >
                <option value="">Select Account</option>

                {accounts.map((acc) => (
                  <option
                    key={acc.accountNumber}
                    value={acc.accountNumber}
                  >
                    {acc.accountType.replace('_', ' ')} - Acc No :
                    {acc.accountNumber} (Bal : ₹{acc.balance})
                  </option>
                ))}
              </select>
            </div>

            {/* Loan Type */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Loan Type
              </label>

              <select
                className="form-select"
                name="loanType"
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

            {/* Tenure */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Tenure (Years)
              </label>

              <input
                type="number"
                className="form-control"
                name="tenureYears"
                value={formData.tenureYears}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            {/* Income */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Monthly Income (₹)
              </label>

              <input
                type="number"
                className="form-control"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            {/* Eligible amount */}
            {maxLoanAmount && (
              <div className="alert alert-info">
                Maximum Eligible Loan Amount :
                <strong>
                  ₹{Number(maxLoanAmount).toLocaleString()}
                </strong>
              </div>
            )}

            {/* Requested Amount */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Requested Amount (₹)
              </label>

              <input
                type="number"
                className="form-control"
                name="requestedAmount"
                value={formData.requestedAmount}
                onChange={handleChange}
                min="1"
                max={maxLoanAmount || undefined}
                required
              />

              {maxLoanAmount &&
                parseFloat(formData.requestedAmount || 0) >
                  maxLoanAmount && (
                  <div className="text-danger mt-2">
                    Requested amount cannot exceed ₹
                    {Number(maxLoanAmount).toLocaleString()}
                  </div>
                )}
            </div>

            {/* Purpose */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Purpose of Loan
              </label>

              <textarea
                className="form-control"
                rows="3"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>

            {/* Documents */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Upload Documents (Optional)
              </label>

              <input
                id="fileInput"
                type="file"
                className="form-control"
                multiple
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />

              <div className="form-text">
                PDF, PNG and JPEG files are supported.
              </div>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-navy-primary btn-dark btn-lg"
              >
                Apply Loan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
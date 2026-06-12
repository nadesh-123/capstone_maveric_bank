
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "./Header";

export default function AddBeneficiary() {
  const token = useSelector((state) => state.user.token);

  const [branches, setBranches] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsccode, setIfsccode] = useState("");

  const [validationErrors, setValidationErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/branch/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBranches(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationErrors({});
    setGeneralError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/api/beneficiary/add",
        {
          accountNumber,
          ifsccode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Beneficiary added successfully.");
      setAccountNumber("");
      setIfsccode("");
    } catch (error) {
      if (error.response?.data?.message) {
        setGeneralError(error.response.data.message);
      } else {
        setValidationErrors(error.response?.data || {});
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0d6efd 0%, #6f42c1 100%)",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div className="card-header bg-white text-center py-4 border-0">
              <h2 className="fw-bold text-primary mb-2">
                Add Beneficiary
              </h2>

              <p className="text-muted mb-0">
                Securely add a beneficiary account
              </p>
            </div>

            {/* Body */}
            <div className="card-body p-4 p-md-5">
              {generalError && (
                <div
                  className="alert alert-danger shadow-sm"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {generalError}
                </div>
              )}

              {successMessage && (
                <div
                  className="alert alert-success shadow-sm"
                  role="alert"
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Branch Dropdown */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Select Branch
                  </label>

                  <select
                    className={`form-select form-select-lg ${
                      validationErrors.ifsccode
                        ? "is-invalid"
                        : ""
                    }`}
                    value={ifsccode}
                    onChange={(e) =>
                      setIfsccode(e.target.value)
                    }
                    required
                  >
                    <option value="">
                      Choose a Branch
                    </option>

                    {branches.map((branch, index) => (
                      <option
                        key={index}
                        value={branch.ifsccode}
                      >
                        {branch.branchName} (
                        {branch.ifsccode})
                      </option>
                    ))}
                  </select>

                  {validationErrors.ifsccode && (
                    <div className="invalid-feedback">
                      {validationErrors.ifsccode}
                    </div>
                  )}
                </div>

                {/* Account Number */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Account Number
                  </label>

                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      validationErrors.accountNumber
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter Account Number"
                    value={accountNumber}
                    onChange={(e) =>
                      setAccountNumber(e.target.value)
                    }
                    required
                  />

                  {validationErrors.accountNumber && (
                    <div className="invalid-feedback">
                      {
                        validationErrors.accountNumber
                      }
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-lg shadow-sm"
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Adding Beneficiary...
                      </>
                    ) : (
                      "Add Beneficiary"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="card-footer text-center bg-light border-0 py-3">
              <small className="text-muted">
                Ensure account details are entered
                correctly before submission.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}


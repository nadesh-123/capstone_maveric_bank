import React from "react";

export default function SimpleCard() {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title">Customer Account</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Savings Account
          </h6>

          <p className="card-text">
            Account Number: 1234567890
          </p>

          <button className="btn btn-primary">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
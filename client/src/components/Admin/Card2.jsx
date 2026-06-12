import React from "react";

export default function Card2() {
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow border-0" style={{ width: "22rem" }}>
        <div className="card-header bg-primary text-white fw-bold">
          Customer Profile
        </div>

        <div className="card-body">
          <h5 className="card-title">John Doe</h5>

          <p className="card-text">
            Account Type: Savings
          </p>

          <p className="card-text">
            Balance: ₹50,000
          </p>

          <button className="btn btn-primary w-100">
            View Account
          </button>
        </div>
      </div>
    </div>
  );
}
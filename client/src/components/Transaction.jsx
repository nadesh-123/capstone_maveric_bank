import React from 'react';

export default function Transaction() {
  return (
    <div>
      <h5 className="text-secondary mb-3 border-bottom pb-2">Transaction</h5>
      <div className="row g-3 text-center">
        
        <div className="col-12 col-sm-4">
          <div className="card h-100 border-primary btn btn-outline-primary p-2 d-flex flex-column align-items-center justify-content-center text-dark">
            <div className="fs-3 mb-1">↓</div>
            <div className="fw-bold">Deposit</div>
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="card h-100 border-danger btn btn-outline-danger p-2 d-flex flex-column align-items-center justify-content-center text-dark">
            <div className="fs-3 mb-1">↑</div>
            <div className="fw-bold">Withdraw</div>
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="card h-100 border-info btn btn-outline-info p-2 d-flex flex-column align-items-center justify-content-center text-dark">
            <div className="fs-3 mb-1">→</div>
            <div className="fw-bold">Transfer</div>
          </div>
        </div>

      </div>
    </div>
  );
}
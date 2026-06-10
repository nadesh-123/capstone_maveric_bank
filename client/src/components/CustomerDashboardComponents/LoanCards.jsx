import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Mapping the enum to user-friendly titles and specific actions
const loanDetails = {
  HOME_LOAN: { title: 'Home Loan', icon: '🏠' },
  CAR_LOAN: { title: 'Car Loan', icon: '🚗' },
  GOLD_LONE: { title: 'Gold Loan', icon: '🪙' }, // Keeps your exact enum key
  PERSONAL_LOAN: { title: 'Personal Loan', icon: '💼' }
};

const LoanCards = () => {
  // Handler for the "Know More" action
  const handleKnowMore = (loanKey) => {
    console.log(`Fetching details for: ${loanKey}`);
    // Add your routing or modal logic here
  };

  return (
    <div className="container my-4">
      <div className="table-responsive shadow-sm rounded border">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="ps-4" style={{ width: '70%' }}>Loan Type</th>
              <th scope="col" className="text-end pe-4" style={{ width: '30%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(loanDetails).map((key) => {
              const loan = loanDetails[key];
              return (
                <tr key={key}>
                  <td className="ps-4 fw-medium text-secondary">
                    <span className="me-2">{loan.icon}</span> {loan.title}
                  </td>
                  <td className="text-end pe-4">
                    <button 
                      onClick={() => handleKnowMore(key)}
                      className="btn btn-sm btn-outline-primary px-3 rounded-pill fw-semibold"
                    >
                      Know More
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanCards;
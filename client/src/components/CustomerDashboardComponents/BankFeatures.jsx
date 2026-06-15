import React from 'react';

const BankFeatures = () => {
  // Custom inline styles to enforce your exact background color specifications
  const containerStyle = {
    backgroundColor: '#3C2CDA',
    minHeight: '100vh'
  };

  const cardStyle = {
    backgroundColor: '#07125E',
    height: '60vh'
  };

  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: '#07125E',
    fontWeight: 'bold',
    letterSpacing: '0.05em'
  };

  return (
    <div style={containerStyle} className="w-100 py-5 px-3 d-flex flex-column justify-content-center align-items-center font-sans">
      
      {/* Hero Banner Header Section */}
      <div className="text-center mb-5 text-white style={{ maxWidth: '768px' }}">
        <h1 className="display-4 fw-bold mb-3">
          Smart Banking, Simplified for You.
        </h1>
        <p className="text-uppercase tracking-widest small fw-semibold text-white-50 mb-4">
          Secure • Fast • Customer-Centric
        </p>
        <button style={buttonStyle} className="btn px-4 py-2 text-uppercase rounded-0 border-0 shadow-sm">
          Open Your Account Today
        </button>
      </div>

      {/* 3-Card Container Grid */}
      <div className="container-fluid px-0" style={{ maxWidth: '1200px' }}>
        <div className="row g-4 justify-content-center">
          
          {/* Card 1: Why Choose Us */}
          <div className="col-12 col-md-4">
            <div style={cardStyle} className="text-white p-4 rounded-0 d-flex flex-column justify-content-between border border-secondary border-opacity-25">
              <div>
                <h2 className="h4 fw-bold text-uppercase pb-3 border-bottom border-secondary border-opacity-50 tracking-wide">
                  Why Choose Us
                </h2>
                <ul className="list-unstyled mt-4 lh-lg text-white-50 small">
                  <li className="mb-2">• Lower Interest Rates on loans compared to competitors.</li>
                  <li className="mb-2">• Higher Savings Interest to attract depositors.</li>
                  <li className="mb-2">• 24/7 Digital Banking with mobile/web access.</li>
                  <li className="mb-2">• Instant Account Opening with paperless KYC.</li>
                </ul>
              </div>
              <div className="small text-muted text-uppercase tracking-wider fw-semibold" style={{ fontSize: '0.75rem' }}>
                01 / Differentiators
              </div>
            </div>
          </div>

          {/* Card 2: Services */}
          <div className="col-12 col-md-4">
            <div style={cardStyle} className="text-white p-4 rounded-0 d-flex flex-column justify-content-between border border-secondary border-opacity-25">
              <div>
                <h2 className="h4 fw-bold text-uppercase pb-3 border-bottom border-secondary border-opacity-50 tracking-wide">
                  Services
                </h2>
                <ul className="list-unstyled mt-4 lh-lg text-white-50 small">
                  <li className="mb-2">• Personal Banking options tailored for individual growth.</li>
                  <li className="mb-2">• Corporate Banking solutions designed under one roof for enterprises.</li>
                  <li className="mb-2">• Seamless fund management and secure asset handling.</li>
                </ul>
              </div>
              <div className="small text-muted text-uppercase tracking-wider fw-semibold" style={{ fontSize: '0.75rem' }}>
                02 / Ecosystem
              </div>
            </div>
          </div>

          {/* Card 3: Customer Benefits */}
          <div className="col-12 col-md-4">
            <div style={cardStyle} className="text-white p-4 rounded-0 d-flex flex-column justify-content-between border border-secondary border-opacity-25">
              <div>
                <h2 className="h4 fw-bold text-uppercase pb-3 border-bottom border-secondary border-opacity-50 tracking-wide">
                  Customer Benefits
                </h2>
                <ul className="list-unstyled mt-4 lh-lg text-white-50 small">
                  <li className="mb-2">• <span className="fw-bold text-white">Zero Hidden Charges</span> → Transparent fee structure.</li>
                  <li className="mb-2">• <span className="fw-bold text-white">Reward Programs</span> → Cashback, loyalty points, or discounts.</li>
                  <li className="mb-2">• <span className="fw-bold text-white">Dedicated Support</span> → Chatbot + human support for queries.</li>
                  <li className="mb-2">• <span className="fw-bold text-white">Financial Tools</span> → Expense tracker, loan calculator, EMI planner.</li>
                </ul>
              </div>
              <div className="small text-muted text-uppercase tracking-wider fw-semibold" style={{ fontSize: '0.75rem' }}>
                03 / Advantages
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BankFeatures;
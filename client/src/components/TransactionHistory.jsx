import React from 'react';

const dummyHistory = [
  { description: 'Paid to Appolo pharmacy', amount: 15, type: 'debit' },
  { description: 'Received from Guru K', amount: 2000, type: 'credit' }
];

export default function TransactionHistory() {
  return (
    <div>
      <h5 className="text-secondary mb-3 border-bottom pb-2">Transaction History</h5>
      <div className="table-responsive">
        <table className="table table-striped table-hover mb-0">
          <tbody>
            {dummyHistory.map((tx, index) => (
              <tr key={index}>
                <td className="text-start py-3">
                  <span className="d-block fw-medium">{tx.description}</span>
                </td>
                <td className={`text-end py-3 fw-bold ${tx.type === 'credit' ? 'text-success' : 'text-danger'}`}>
                  {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
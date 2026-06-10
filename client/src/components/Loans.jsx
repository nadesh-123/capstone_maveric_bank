import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LoanCards from './CustomerDashboardComponents/LoanCards';
const dummyLoans = [
  { type: 'Home Loan', amount: 200000, dateIssued: '12/04/2024' },
  { type: 'Car Loan', amount: 30000, dateIssued: '22/08/2025' }
];

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/loan/getAll", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };

    if (user?.token) {
      fetchLoans();
    }
  }, [user]);
  return (
    <div>
      <h5 className="text-secondary mb-3 border-bottom pb-2">Loans</h5>
      <div className="table-responsive">
        {loans.length<=0?<LoanCards />:
        <table className="table table-bordered align-middle text-center mb-0">
          <thead className="table-light">
            <tr>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>Date Issued</th>
            </tr>
          </thead>
          <tbody>
            {
            
            loans.map((loan, index) => (
              <tr key={index}>
                <td className="fw-semibold">{loan.type}</td>
                <td className="text-danger fw-bold">₹{loan.amount}</td>
                <td>{loan.dateIssued}</td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </div>
  );
}
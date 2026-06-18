import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LoanCards from "./LoanCards";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/loan/getAll",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setLoans(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.token) {
      fetchLoans();
    }
  }, [user]);

  return (
   <>
  <h4 className="loan-heading fs-1" style={{margin:"20px",text:"center",color: "#3C2CD9"}}>LOANS</h4>

  {loans.length === 0 ? (
    <LoanCards />
  ) : (
    <div className="loan-container" >
      {loans.map((loan, index) => (
        <div className="loan-card" style={{background:"#f4f3fc"}} key={index}>
          <div className="loan-header">
            <div>
              <div className="loan-type">
                {loan.loanType}
              </div>

              <div className="loan-tenure fs-4 ">
                {loan.tenureYears} Years
              </div>
            </div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="loan-status">
              Active
            </div>
          </div>

          <div className="loan-body">
            <div>
              <div className="loan-label">Loan Amount</div>
              <div className="loan-amount">
                ₹{Number(loan.loanAmount).toLocaleString()}
              </div>
            </div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="text-end">
              <div className="loan-label">EMI</div>
              <div className="loan-emi">
                ₹{Number(loan.emiAmount).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</>


  );
}
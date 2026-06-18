import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export default function Accounts() {

  const [accounts,setAccount]=useState([]);
   const user = useSelector((state) => state.user);
  useEffect(()=>{
    const getAccounts=async()=>{
try {
  const res=await axios.get("http://localhost:8080/api/account/getActiveAccounts",{
    headers:{
      "Authorization":"Bearer "+user.token
    }
  
  })
  setAccount(res.data)
} catch (error) {
  console.log(error)
}}
getAccounts()
},[user.token])
const deactivateAccount = async (accountNumber) => {
   if (window.confirm(`Are you sure you want to close account ${accountNumber}?`)) {
  try {
   
    const response = await axios.post(
      `http://localhost:8080/api/account/deactivate/${accountNumber}`, 
      null,
      {
        headers: {
          Authorization: `Bearer ${user.token}`, 
        },
      }
    );

   
  } catch (error) {
    console.error('Error deactivating account:', error);
  
  }}
};
  return (
    <div>
      <h5 className="hexaware mb-3 fs-1 border-bottom pb-2" style={{color: "#3C2CD9" }}>ACCOUNTS</h5>
      <div className="row g-3">
        {

        accounts.length<=0?( 
          <div className="col-12 col-sm-6">
            <div className="card h-100 border-secondary">
              <div className="card-body">
          <h6 className="card-title fw-bold text-uppercase text-primary">
  Create An Account To Perform Transactions
</h6>

                <p className="card-text mb-1">
                  <small className="text-muted"> </small>
                  <strong></strong>
                </p>
                <p className="card-text mb-0">
                  <small className="text-muted"> </small>
                  <span className="fw-bold text-success"></span>
                </p>
              </div>
            </div>
          </div>
        ):
        
        accounts.map((acc, index) => (
          <div key={index} className="col-12 col-sm-6">
            <div className="card h-100 border-secondary account-card">
              <div className="account-card-header">
      <div>
        <h5 className="account-type">
          {acc.accountType.replace("_", " ")}
        </h5>
        <p className="branch-name">{acc.branchName}</p>
      </div>

      {acc.balance === 0 && (
        <button
          className="deactivate-btn"
          onClick={() => deactivateAccount(acc.accountNumber)}
        >
          Deactivate
        </button>
      )}
    </div>

    <div className="account-card-body">
      <div className="account-info">
        <span className="label">Account Number</span>
        <span className="value">{acc.accountNumber}</span>
      </div>

      <div className="account-info text-end">
        <span className="label">Available Balance</span>
        <span className="balance">₹{acc.balance.toLocaleString()}</span>
      </div>
    </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
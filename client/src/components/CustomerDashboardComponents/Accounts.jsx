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
      <h5 className="text-secondary mb-3 border-bottom pb-2">Accounts</h5>
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
            <div className="card h-100 border-secondary">
              <div className="card-body">
          <h6 className="card-title fw-bold text-uppercase text-primary">
  {acc.accountType}
</h6>

                <p className="card-text mb-1">
                  <small className="text-muted">Acc No: </small>
                  <strong>{acc.accountNumber}</strong>
                </p>
                <p className="card-text mb-0">
                  <small className="text-muted">Balance: </small>
                  <span className="fw-bold text-success">₹{acc.balance}</span><span>{acc.balance===0?<button onClick={()=>deactivateAccount(acc.accountNumber)}className='btn btn-warning'>Deactivate</button>:""}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
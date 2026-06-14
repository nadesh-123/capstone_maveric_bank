import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const dummyHistory = [
  { description: 'Paid to Appolo pharmacy', amount: 15, type: 'debit' },
  { description: 'Received from Guru K', amount: 2000, type: 'credit' }
];

export default function TransactionHistory() {
  
  const [transactions,setTransactions]=useState([])
    const token = useSelector((state) => state.user?.token);
useEffect(()=>{
const getTransactionHistory=async ()=>{
  try {
    const response= await axios.get("http://localhost:8080/api/transaction/get-transactions?page=0",{
      headers:{
       'Authorization': `Bearer ${token}`
      }
    })
    setTransactions(response.data)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
  
}
getTransactionHistory()
},[])
  return (
    <div>
      <h5 className="text-secondary mb-3 border-bottom pb-2">Transaction History</h5>
      <div className="table-responsive">
        <table className="table table-striped table-hover mb-0">
          <tbody>
            {transactions.map((tx, index) =>{
              let type=""
              let saccount=""
              let taccount=""
           
              if(tx.transactionType==="DEPOSIT"){
                type="DEPOSIT"
                taccount=tx.target_account
              }
              else if(tx.transactionType==="WITHDRAW"){
                   type="WITHDRAW"
                   saccount=tx.source_account
              }
              else if((tx.transactionType==="TRANSFER" && tx.customerId===null)){
                type="IN TRANSFER"
                saccount=tx.source_account
                taccount==tx.target_account
              }
              else{
              type="OUT TRANSFER"
              taccount=tx.source_account
              saccount=tx?.target_account
            
             
              }

                  return (
              <tr key={index}>
                <td className="text-start py-2">
                  <span className="d-block fw-medium">{
                    type==="DEPOSIT"?<div>
    <span className="d-block fw-medium">Deposited In</span>
    <small className="text-muted">Account No: {taccount}</small>
</div>:type==="WITHDRAW"?<div>
    <span className="d-block fw-medium">Withdraw from</span>
    <small className="text-muted">Account No: {saccount}</small>
</div>:type==="IN TRANSFER"?<div>
    <span className="d-block fw-medium">Rceived from</span>
    <small className="text-muted">Account No: {saccount} to {tx.target_account}</small>
</div>:<div>
    <span className="d-block fw-medium">Pait to</span>
    <small className="text-muted">Account No: {saccount} from {taccount}</small>
</div>
                    }</span>
                </td>
                <td className='text-end py-3'>
                <span className={`d-block  fw-bold ${(tx.transactionType==="DEPOSIT" ||(tx.transactionType==="TRANSFER" && tx.customerId===null)) ? 'text-success' : 'text-danger'}`}>
                  {(tx.transactionType==="DEPOSIT" ||(tx.transactionType==="TRANSFER" && tx.customerId===null)) ? '+' : '-'}₹{tx.amount}
                </span>
                <br />
             
                <small>{tx.madeAt.toString().split("T")[0]}</small>
                </td>
              </tr>
            )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
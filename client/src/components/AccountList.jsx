import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`http://localhost:8080/api/account/getAccounts/${user.cusid}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setAccounts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.cusid, user.token]);

  return (
    <div>
      <h1>Accounts List</h1>

      {accounts.map((account) => (
        <div
          key={account.accno}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>Account No: {account.accno}</h3>

          <p>Account Type: {account.accountType}</p>

          <p>Branch Name: {account.branchName}</p>

          <p>Balance: ₹{account.balance}</p>

          <p>Status: {account.status}</p>
        </div>
      ))}
    </div>
  );
}
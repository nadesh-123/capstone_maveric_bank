import React from 'react';
import AccountTypeCard from './AccountTypeCard';
import { useNavigate } from 'react-router-dom';
  import currentAccountImg from '../../assets/CurrentAccount.png';
  import savingsAccount from "../../assets/SavingsAccount.png"
  import fixedDeposit from "../../assets/FixedDeposit.png"
export default function AccountSelectionPage() {
  // Centralized data matrix for your banking accounts

  const navigate=useNavigate()
  const accountTypes = [
    {
      id: 1,
      title: 'SAVINGS ACCOUNT',
      imageUrl: savingsAccount
    },
    {
      id: 2,
      title: 'CURRENT ACCOUNT',
      imageUrl: currentAccountImg
    },
    {
      id: 3,
      title: 'FIXED DEPOSIT',
      imageUrl: fixedDeposit
    }
  ];

  return (
    <>
      <style>{`
       
      `}</style>

      <div className="page-wrapper">
        <div className="page-container">
          
          <div className="page-header">
            <h1>Select Your Account Type</h1>
            <p>Choose a secure plan tailored to your financial goals</p>
          </div>

          {/* Grid Container that displays components side-by-side in columns */}
          <div className="cards-column-grid">
            {accountTypes.map((account) => (
              <AccountTypeCard 
                key={account.id}
                title={account.title}
                imageUrl={account.imageUrl}
                
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
import { useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from "react-router-dom";
import {
  X,
  User,
  CreditCard,
  Wallet,
  ArrowLeftRight,
  ChevronDown,
  ChevronRight,
  Building2
} from "lucide-react";

import BankFeatures from "../components/BankFeatures";

export default function MavericBankHome() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);

  return (
    <>
      <div className="min-vh-screen bg-light">
        {/* Main Content */}
        <div className="container py-5 px-4 text-center">
          <div className="row justify-content-center py-4">
            <div className="col-12 col-lg-10">
              
              <div className="mb-4" style={{ minHeight: '60px' }}>
                <TypeAnimation 
                  sequence={[ 
                    'Welcome to Maveric Bank', 
                    3000, 
                    'You are at the right place for secure and trusted banking services.',
                    2000 
                  ]} 
                  wrapper="h1" 
                  speed={80} 
                  repeat={Infinity} 
                  className="display-6 fw-bold text-navy-primary mb-0" 
                />
              </div>

              <p className="text-muted mx-auto mb-5 fs-6 lh-lg" style={{ maxWidth: '750px' }}>
                Experience secure and modern banking with Maveric Bank. Manage your
                accounts, track transactions, and access all banking services through
                a clean and user-friendly dashboard.
              </p>

          
        

            </div>
          </div>
        </div>

      </div>
      <BankFeatures />
    </>
  );
}
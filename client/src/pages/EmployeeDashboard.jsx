import React, { useState,useEffect } from 'react';
import { useSelector } from "react-redux";
import { 
  UserCheck, FileText, Landmark, LogOut, 
  CheckCircle, XCircle, ChevronRight, Eye, 
  FileSpreadsheet, AlertTriangle, ShieldAlert
} from 'lucide-react';
import CustomerDetailsModal from '../components/CustomerDetetailsModel.jsx'; // Adjust path if needed
export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('accounts');
 const user = useSelector((state) => state.user);
  // Mock Data for UI Rendering
  
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

const handleShowCustomerDetails = async (customerId) => {
  try {
    // Dynamically appends the row's customer ID to your absolute link route
    const response = await fetch(`http://localhost:8080/api/getCustomer/user-id/${customerId}`, {
      method: "GET",
      headers: {"Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const customerData = await response.json();
      setSelectedCustomer(customerData); // Store fetched customer payload
      setIsCustomerModalOpen(true);       // Launch popup visibility template
    } else {
      console.error(`Failed fetching user profiles for ID: ${customerId}`);
    }
  } catch (error) {
    console.error("Network exception matching verification endpoint:", error);
  }
};

const handleShowDetails = () => {
  setSelectedAccount(account);
  setIsModalOpen(true);
};
  const loanApplications = [
    { id: "LN-4401", applicant: "Rohan Das", amount: "₹5,00,000", type: "Home Loan" },
    { id: "LN-4402", applicant: "Sneha Reddy", amount: "₹1,50,000", type: "Personal" },
  ];

  const [pendingAccounts, setPendingAccounts] = useState([]);
const [loading, setLoading] = useState(false);

// Whenever activeTab changes, this effect runs
useEffect(() => {
  if (activeTab === 'accounts') {
    fetchUnapprovedAccounts();
  }
}, [activeTab]);

const fetchUnapprovedAccounts = async () => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:8080/api/account/get/account/unapproved", {
      method: "GET",
      headers: {"Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json",
        // Include your JWT token header here if basic/token auth is active:
        // "Authorization": `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      setPendingAccounts(data);
    } else {
      console.error("Failed to fetch unapproved accounts: Status", response.status);
    }
  } catch (error) {
    console.error("Network error fetching accounts:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex h-screen bg-lightWhite font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-customBlack text-snowWhite flex flex-col justify-between shadow-xl">
        <div>
          {/* Brand/Logo */}
          <div className="p-6 bg-darkBlue flex items-center gap-3 border-b border-bdrLight/20">
            <div className="h-8 w-8 rounded-lg bg-brightBlue flex items-center justify-center font-bold text-lg text-snowWhite">
            B
            </div>
            <div>
              <h1 className="font-bold text-md leading-tight text-white">MAVERIC BANK</h1>
              <span className="text-xs text-white">Employee Portal</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 px-4 space-y-2">
            <button 
              onClick={() => setActiveTab('accounts')}
              className={`w-full flex text-white items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'accounts' 
                  ? 'bg-hexawareBlue text-snowWhite shadow-lg shadow-hexawareBlue/30' 
                  : 'text-silver hover:bg-darkBlue hover:text-snowWhite'
              }`}
            >
              <UserCheck size={18} />
              
              Manage Accounts
            </button>

            <button 
              onClick={() => setActiveTab('loans')}
              className={`w-full flex text-white items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'loans' 
                  ? 'bg-hexawareBlue text-snowWhite shadow-lg shadow-hexawareBlue/30' 
                  : 'text-silver hover:bg-darkBlue hover:text-snowWhite'
              }`}
            >
              <Landmark size={18} />
              Manage Loans
            </button>

            <button 
              onClick={() => setActiveTab('reports')}
              className={`w-full flex text-white items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'reports' 
                  ? 'bg-hexawareBlue text-snowWhite shadow-lg shadow-hexawareBlue/30' 
                  : 'text-silver hover:bg-darkBlue hover:text-snowWhite'
              }`}
            >
              <FileText size={18} />
              Generate Reports
            </button>
          </nav>
        </div>

        {/* LOG OUT BUTTON */}
        <div className="p-4 border-t border-bdrLight/10">
          <button 
            onClick={() => alert("Logging out...")}
            className="w-full text-white flex items-center gap-3 px-4 py-3 text-sm font-medium text-error hover:bg-error/10 rounded-xl transition-all"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* TOP HEADER */}
        <header className="bg-snowWhite border-b border-bdrLight px-8 py-4 flex items-center justify-between shadow-sm shrink-0">
          <div>
            <h2 className="text-xl font-bold text-customBlack">
              {activeTab === 'accounts' && "Customer Accounts Management"}
              {activeTab === 'loans' && "Credit & Loan Operations"}
              {activeTab === 'reports' && "Analytics & Regulatory Reporting"}
            </h2>
            <p className="text-xs text-silver mt-0.5">Welcome back, Operational Officer</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm  text-customBlack font-medium">Internal System</p>
              <p className="text-xs text-brightBlue font-medium">Terminal #04</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-brightBlue/10 text-brightBlue flex items-center justify-center font-bold">
              OP
            </div>
          </div>
        </header>

        {/* DYNAMIC DASHBOARD VIEWPORTS */}
        <div className="p-8 space-y-8 flex-1">
          
          {/* ================= TAB 1: MANAGE CUSTOMER ACCOUNTS ================= */}
          {activeTab === 'accounts' && (
            <>
          

              {/* Action Modules */}
              {/* Use Case: Approve New Account Creation */}
<div className="bg-snowWhite rounded-2xl border border-bdrLight shadow-sm overflow-hidden">
  <div className="px-6 py-4 bg-darkBlue text-snowWhite font-semibold flex justify-between items-center">
    <span>Approve New Account Onboarding</span>
    <span className="text-xs bg-brightBlue px-2.5 py-0.5 rounded-full">Action Required</span>
  </div>
  
  <div className="divide-y divide-bdrLight">
    {loading ? (
      <div className="p-8 text-center text-sm text-silver font-medium">
        Loading unapproved accounts...
      </div>
    ) : pendingAccounts.length === 0 ? (
      <div className="p-8 text-center text-sm text-silver font-medium">
        No pending accounts for approval.
      </div>
    ) : (
      pendingAccounts.map((acc) => (
        <div key={acc.accno} className="p-4 flex items-center justify-between hover:bg-lightWhite/30 transition-colors">
          <div>
            <p className="text-sm font-bold text-customBlack">Account No: {acc.accno}</p>
            <p className="text-xs text-silver">
              <span className="font-medium text-hexawareBlue">
                {acc.accountType ? acc.accountType.replace('_', ' ') : 'UNKNOWN'}
              </span> 
              • Balance: <span className="font-semibold text-customBlack">₹{acc.balance?.toFixed(2)}</span>
            </p>
            <p className="text-[10px] text-silver">ID: Cust-{acc.cusId} • Branch-{acc.branchId}</p>
          </div>

          <div className="flex items-center gap-2">
            <button 
            onClick={() => handleShowCustomerDetails(acc.cusId)}
              className="p-2 text-silver hover:bg-lightWhite hover:text-darkBlue rounded-lg transition-colors flex items-center justify-center"
              title="Show Details"
            >
              <Eye size={18} />
            </button>

            <button 
              
              className="px-3 py-1.5 bg-brightBlue text-snowWhite rounded-lg text-xs font-semibold hover:bg-brightBlue/90 transition-colors flex items-center gap-1 shadow-sm"
            >
              <CheckCircle size={14} /> Approve Account
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</div>

             
            </>
          )}

          {/* ================= TAB 2: MANAGE LOANS ================= */}
          {activeTab === 'loans' && (
            <div className="space-y-6">
              <div className="bg-snowWhite rounded-2xl border border-bdrLight shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-hexawareBlue text-snowWhite font-semibold">
                  Loan Applications Pipeline (Review / Approve / Disburse)
                </div>
                <div className="p-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-bdrLight text-xs font-bold uppercase text-silver tracking-wider">
                        <th className="pb-3">Application ID</th>
                        <th className="pb-3">Applicant Name</th>
                        <th className="pb-3">Loan Type</th>
                        <th className="pb-3">Amount Requested</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-bdrLight text-sm text-customBlack">
                      {loanApplications.map((loan) => (
                        <tr key={loan.id} className="hover:bg-lightWhite/20">
                          <td className="py-4 font-mono font-bold text-brightBlue">{loan.id}</td>
                          <td className="py-4 font-medium">{loan.applicant}</td>
                          <td className="py-4">{loan.type}</td>
                          <td className="py-4 font-semibold">{loan.amount}</td>
                          <td className="py-4 text-right flex justify-end gap-2">
                            <button className="px-3 py-1.5 border border-bdrLight rounded-lg text-xs font-semibold text-customBlack hover:bg-lightWhite">
                              Review Files
                            </button>
                            <button className="px-3 py-1.5 bg-error text-snowWhite rounded-lg text-xs font-semibold hover:bg-error/90">
                              Reject
                            </button>
                            <button className="px-3 py-1.5 bg-brightBlue text-snowWhite rounded-lg text-xs font-semibold hover:bg-brightBlue/90">
                              Approve & Disburse
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: GENERATE REPORTS ================= */}
          {activeTab === 'reports' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Report 1 */}
              <div className="bg-snowWhite p-6 rounded-2xl border border-bdrLight shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-brightBlue/10 text-brightBlue flex items-center justify-center mb-4">
                    <FileSpreadsheet size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-customBlack">Financial Performance Reports</h4>
                  <p className="text-xs text-silver mt-1">Generates real-time structural balance sheets, asset yields, and dynamic interest margin data streams.</p>
                </div>
                <button className="mt-6 w-full py-2.5 bg-darkBlue hover:bg-customBlack text-snowWhite text-xs font-bold rounded-xl tracking-wide transition-colors uppercase">
                  Compile Fiscal Report
                </button>
              </div>

              {/* Report 2 */}
              <div className="bg-snowWhite p-6 rounded-2xl border border-bdrLight shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-honey/10 text-honey flex items-center justify-center mb-4">
                    <AlertTriangle size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-customBlack">Regulatory Audits & Compliance Reports</h4>
                  <p className="text-xs text-silver mt-1">Preps direct transactional reporting data configurations matching statutory banking guidelines.</p>
                </div>
                <button className="mt-6 w-full py-2.5 bg-darkBlue hover:bg-customBlack text-snowWhite text-xs font-bold rounded-xl tracking-wide transition-colors uppercase">
                  Export Compliance Pack
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
      <CustomerDetailsModal 
        isOpen={isCustomerModalOpen}
        customer={selectedCustomer}
        onClose={() => setIsCustomerModalOpen(false)}
      />
    </div>
  );
}
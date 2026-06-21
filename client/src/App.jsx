
import './App.css'



import SigninForm from './Auth/SigninForm.jsx'
import { Navigate, Route,Routes } from "react-router-dom";
import BankHomePage from './components/LandingPage.jsx'

import MavericBankHome from './pages/MavericBankHome.jsx'



import EmployeeDashboard from './pages/EmployeeDashboard.jsx'

import ProfilePopup from './components/CustomerDashboardComponents/ProfilePopup.jsx'
import SignupForm from './components/CustomerDashboardComponents/SignupForm..jsx'



import LoanApplication from './components/CustomerDashboardComponents/ApplyLoan.jsx'
import Auth from './pages/Auth.jsx'
import AdminAuth from './pages/AdminAuth.jsx'

import Card2 from './components/Admin/Card2.jsx'
import EmployeeSignin from './components/Admin/EmployeeSignin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AddEmployee from './components/Admin/AddEmployee.jsx'
import AddBeneficiary from './components/CustomerDashboardComponents/AddBeneficiary.jsx'
import TransactionHistory from './components/CustomerDashboardComponents/TransactionHistory.jsx'
import Unauthorized from './components/Unauthorized.jsx'
import ProtectedRoute from './Auth/ProtectedRoute.jsx'
import CustomerDashboard from './pages/CustomerDashboard.jsx'
import TransactionsView from './pages/TransactionsView.jsx'
import AccountSelectionPage from './components/CustomerDashboardComponents/AccountSelectionPage.jsx';
import AccountCreationPage from './components/CustomerDashboardComponents/AccountCreationPage.jsx';
import TransactionHistoryFilter from './components/CustomerDashboardComponents/TransactionHistoryFilter.jsx';
import AccountApprovalDash from './components/Employee/AccountApprovalDash.jsx';
import PendingLoans from './components/Employee/PendingLoans.jsx';
import ManagerDashBoard from './pages/ManagerDashBoard.jsx';
import AccountDeactivationRequests from './components/Employee/AccountDeactivationRequests.jsx';
import ApplyForLoan from './components/CustomerDashboardComponents/ApplyForLoan.jsx';
import EmployeeList from './components/Admin/EmployeeList.jsx';
import CustomerList from './components/Admin/CustomerList.jsx';
import LoanPendingPage from './pages/LoanPendingPage.jsx';
function App() {
 

  return <div >

 {/*<Route path="/employee-dashboard" element={ <EmployeeDashboard />} />
    <Route path="/create-account" element={<CreateAccount />} />
    
    <Route path="/land" element={<BankHomePage />} />
     <Route path="/customerDetails" element={<CustomerDetails />} />
    
      <Route path="/emp-signin" element={<EmployeeSignin />} />
      <Route path="/signup" element={<UserCustomer />} />
       <Route path="/accountList" element={<AccountList />} 
       />*/}

      <Routes>
      
       <Route path="/empsignin" element={<AdminAuth />} />
       <Route path="/signin" element={<Auth />} />
          <Route path="/signup" element={<SignupForm />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
   <Route path="/" element={<MavericBankHome />} />
      


        <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      
            <Route path="/add-beneficiary" element={<AddBeneficiary />} />
           
             <Route path="/create-account" element={<AccountCreationPage />} />
          <Route path='/createAccount/:accountType' element={<AccountCreationPage />}/>
          <Route path="/applyLoan" element={<ApplyForLoan />} />
          <Route path="/transaction-latest" element={<TransactionHistory />} />
              <Route path="/transactions/all" element={<TransactionHistoryFilter />} />
            <Route path="/transactions" element={<TransactionsView />}>
            
            <Route path="latest" element={<TransactionHistory />}/>
            </Route>
        </Route>
<Route element={<ProtectedRoute allowedRoles={['MANAGER','EMPLOYEE']} />}>
          <Route path="/manager-dashboard" element={<ManagerDashBoard />} />
            <Route path="/emp/account-requests" element={<AccountApprovalDash />} />
           <Route path="/emp/loan-requests" element={<LoanPendingPage />} />
            <Route path="/emp/account-detactvaion-requests" element={<AccountDeactivationRequests />} />
        </Route>
       


        <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE"]} />}>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/emp/account-requests" element={<AccountApprovalDash />} />
                <Route path="/emp/loan-requests" element={<LoanPendingPage />} />
        </Route>

   
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/add-emp" element={<AddEmployee />} />
            <Route path="/admin-dashboard/employee-list" element={<EmployeeList />} />
            <Route path="/admin-dashboard/customer-list" element={<CustomerList />} />
        </Route>

         
        
      </Routes>
    
  </div>

}

export default App

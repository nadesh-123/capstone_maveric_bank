
import './App.css'


import UserCustomer from './components/UserCustomer.jsx'
import SigninForm from './Auth/SigninForm.jsx'
import { Navigate, Route,Routes } from "react-router-dom";
import BankHomePage from './components/LandingPage.jsx'
import CustomerDetails from './components/CustomerDetails.jsx'
import MavericBankHome from './pages/MavericBankHome.jsx'
import CreateAccount from './components/CreateAccount.jsx'
import AccountList from './components/AccountList.jsx'

import EmployeeDashboard from './pages/EmployeeDashboard.jsx'

import ProfilePopup from './components/CustomerDashboardComponents/ProfilePopup.jsx'
import SignupForm from './components/CustomerDashboardComponents/SignupForm..jsx'
import AccountSelectionPage from './components/AccountSelectionPage.jsx'
import AccountCreationPage from './components/AccountCreationPage.jsx'

import LoanApplication from './components/ApplyLoan.jsx'
import Auth from './pages/Auth.jsx'
import AdminAuth from './pages/AdminAuth.jsx'
import SimpleCard from './components/simpleCard.jsx'
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
      


        <Route element={<ProtectedRoute allowedRoles={"CUSTOMER"} />}>
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      
            <Route path="/add-beneficiary" element={<AddBeneficiary />} />
             <Route path="/create-account" element={<AccountSelectionPage />} />
          <Route path='/createAccount/:accountType' element={<AccountCreationPage />}/>
          <Route path="/transaction-latest" element={<TransactionHistory />} />
            <Route path="/accountList" element={<LoanApplication />} />
            <Route path="/transactions" element={<TransactionsView />}>
            <Route path="latest" element={<TransactionHistory />}/>
            </Route>
        </Route>

       


        <Route element={<ProtectedRoute allowedRoles={"EMPLOYEE"} />}>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      
        </Route>

   
        <Route element={<ProtectedRoute allowedRoles={'ADMIN'} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/add-emp" element={<AddEmployee />} />
          
        </Route>

         
        
      </Routes>
    
  </div>

}

export default App

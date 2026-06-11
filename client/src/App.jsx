
import './App.css'

import Sample2 from './components/sample2'
import Sample from './components/Sample.jsx'
import UserCustomer from './components/UserCustomer.jsx'
import SigninForm from './Auth/SigninForm.jsx'
import { Route,Routes } from "react-router-dom";
import BankHomePage from './components/LandingPage.jsx'
import CustomerDetails from './components/CustomerDetails.jsx'
import MavericBankHome from './pages/MavericBankHome.jsx'
import CreateAccount from './components/CreateAccount.jsx'
import AccountList from './components/AccountList.jsx'
import EmployeeSignin from './components/EmployeeSignin.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import "./styles/style.css"
import ProfilePopup from './components/ProfilePopup.jsx'
import SignupForm from './components/CustomerDashboardComponents/SignupForm..jsx'
import AccountSelectionPage from './components/AccountSelectionPage.jsx'
import AccountCreationPage from './components/AccountCreationPage.jsx'
import CustomerDashBoard from './pages/CustomerDashboard.jsx'
import LoanApplication from './components/ApplyLoan.jsx'
import Auth from './pages/Auth.jsx'
import AdminAuth from './pages/AdminAuth.jsx'
function App() {
 

  return <div >
 
   <Routes>
   
 {/*<Route path="/employee-dashboard" element={ <EmployeeDashboard />} />
    <Route path="/create-account" element={<CreateAccount />} />
    
    <Route path="/land" element={<BankHomePage />} />
     <Route path="/customerDetails" element={<CustomerDetails />} />
    
      <Route path="/emp-signin" element={<EmployeeSignin />} />
      <Route path="/signup" element={<UserCustomer />} />
       <Route path="/accountList" element={<AccountList />} 
       />*/}
         <Route path="/signin" element={<Auth />} />
           <Route path="/empsignin" element={<AdminAuth />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/customer-dashboard" element={<CustomerDashBoard />} />
           <Route path="/" element={<MavericBankHome />} />
         <Route path="/create-account" element={<AccountSelectionPage />} />
          <Route path='/createAccount/:accountType' element={<AccountCreationPage />}/>
            <Route path="/accountList" element={<LoanApplication />} />
              <Route path="/emp" element={<AdminAuth />} />
    </Routes>
  </div>

}

export default App

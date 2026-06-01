
import './App.css'
import UserDetail from './pages/UserDetail'
import Sample2 from './components/sample2'
import Sample from './components/Sample.jsx'
import UserCustomer from './components/UserCustomer.jsx'
import SigninForm from './components/SigninForm.jsx'
import { Route,Routes } from "react-router-dom";
import BankHomePage from './components/LandingPage.jsx'
import CustomerDetails from './components/CustomerDetails.jsx'
import MavericBankHome from './pages/MavericBankHome.jsx'
import CreateAccount from './components/CreateAccount.jsx'
import AccountList from './components/AccountList.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
function App() {
 

  return <div >
   <Routes>
   
     <Route path="/employee-dashboard" element={ <EmployeeDashboard />} />
    <Route path="/create-account" element={<CreateAccount />} />
    <Route path="/Home" element={<MavericBankHome />} />
    <Route path="/land" element={<BankHomePage />} />
     <Route path="/customerDetails" element={<CustomerDetails />} />
      <Route path="/signin" element={<SigninForm />} />
      <Route path="/signup" element={<UserCustomer />} />
       <Route path="/accountList" element={<AccountList />} />
    </Routes>
  </div>

}

export default App

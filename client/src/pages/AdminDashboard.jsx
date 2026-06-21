import { useEffect,useState } from "react";
import AccountStat from "../components/Admin/AccountStat";
import AddEmployee from "../components/Admin/AddEmployee";
import AdminHeader from "../components/Admin/AdminHeader";
import BranchStat from "../components/Admin/BranchStat";
import {
  FaUsers,
  FaUserTie,
  FaUniversity,
  FaExchangeAlt
} from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
export default function AdminDashboard(){
    const user=useSelector((state)=>state.user)
    const[activeCustomers,setActiveCustomers]=useState();
    const[activeEmployees,setActiveEmployees]=useState();
    const[activeAccounts,setActiveAccounts]=useState();
    const[totalTransactions,setTotalTransactions]=useState();
    useEffect(()=>{
   const getReports=async ()=>{
    try {
         const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
       const response=await axios.get("http://localhost:8080/api/admin/get-reports",config)
        setActiveAccounts(response.data.activeAccounts)
        setActiveCustomers(response.data.activeCustomers)
        setActiveEmployees(response.data.activeEmployees)
        setTotalTransactions(response.data.totalTransactions)
    } catch (error) {
        console.log(error)
    }
   }
   getReports()
    },[])
   return (
    <div>
        <AdminHeader />
    <div className="container-fluid admin-dashboard">

      {/* Header */}
      <div className="dashboard-header mb-4">
        <h2>Admin Dashboard</h2>
        <p>Welcome Back, Admin</p>
      </div>

      {/* Cards */}
      <div className="row g-4">

        {/* Customers */}
        <div className="col-lg-3 col-md-6">
          <div className="dashboard-card">
            <div className="card-icon customers">
              <FaUsers />
            </div>

            <div>
              <h6>Active Customers</h6>
              <h2>{activeCustomers}</h2>
            </div>
          </div>
        </div>

        {/* Employees */}
        <div className="col-lg-3 col-md-6">
          <div className="dashboard-card">
            <div className="card-icon employees">
              <FaUserTie />
            </div>

            <div>
              <h6>Active Employees</h6>
              <h2>{activeEmployees}</h2>
            </div>
          </div>
        </div>

        {/* Accounts */}
        <div className="col-lg-3 col-md-6">
          <div className="dashboard-card">
            <div className="card-icon accounts">
              <FaUniversity />
            </div>

            <div>
              <h6>Active Accounts</h6>
              <h2>{activeAccounts}</h2>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="col-lg-3 col-md-6">
          <div className="dashboard-card">
            <div className="card-icon transactions">
              <FaExchangeAlt />
            </div>

            <div>
              <h6>Total Transactions</h6>
              <h2>{totalTransactions}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}

      {/* Charts */}
      <div className="row mt-4 g-4">

        <div className="col-lg-8">
          <div className="chart-card">
            <div className="chart-header">
              <h5>Branch Statistics</h5>
            </div >
 <BranchStat/>
           
          </div>
        </div>

        <div className="col-lg-4">
          <div className="chart-card">
            <div className="chart-header">
              <h5>Account Distribution</h5>
            </div>
<AccountStat />
            
          </div>
        </div>

      </div>



    </div>
    </div>
  );
}
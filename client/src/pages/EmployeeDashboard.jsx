import React, { useEffect } from 'react'
import EmployeeProfile from '../components/Employee/EmployeeProfile'
import AdminHeader from '../components/Admin/AdminHeader'
import EmployeeActionStat from '../components/Employee/EmployeeActionStat'
import EmployeeDoughNutStat from '../components/Employee/EmployeeDoughNutStat'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import {
  FaUsers,
  FaUserSlash,
  FaFileInvoiceDollar,
} from "react-icons/fa";
const EmployeeDashboard = () => {
  const user = useSelector((state) => state.user);
  const[statData,setStatData]=useState({});
useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/emp/get-pending-actinons", {
                    headers: {
                        "Authorization": "Bearer " + user.token
                    }
                });
                setStatData(response?.data);
                
            } catch (error) {
                console.log(error);
            }
        };
        getInfo();
    }, [user.token]);

  return (
    <div>
       <div>
      <AdminHeader />
     </div>
 <div className="container-fluid py-4">
      <div className="row ">

        {/* LEFT SIDE */}
        <div className="col-lg-6">

  {/* Top Row */}
  <div className="row g-3">

    {/* Total Accounts */}
    <div className="col-6">
      <div className="dashboard-card square-card">
        <div className="card-icon bg-primary">
          <FaUsers />
        </div>

        <div className="text-center">
          <h6>Account Requests</h6>
          <h2>{statData.pendingAccounts}</h2>
        </div>
      </div>
    </div>

    {/* Account Deactivations */}
    <div className="col-6">
      <div className="dashboard-card square-card">
        <div className="card-icon bg-danger">
          <FaUserSlash />
        </div>

        <div className="text-center">
          <h6>Account Deactivations</h6>
          <h2>{statData.pendingAccountDeActivations}</h2>
        </div>
      </div>
    </div>

  </div>

  {/* Bottom Row */}
  <div className="row mt-5">
    <div className="col-12 d-flex justify-content-center">

      <div className="dashboard-card square-card">
        <div className="card-icon bg-success">
          <FaFileInvoiceDollar />
        </div>

        <div className="text-center">
          <h6>Loan Applications</h6>
          <h2>{statData.loanApplications}</h2>
        </div>
      </div>

    </div>
  </div>

</div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6">

          {/* Pie Chart */}
          <div className="dashboard-card chart-card">
            <h5 className="mb-3">Account Statistics</h5>

            <div className="chart-placeholder">
              <EmployeeActionStat />
            </div>

            {/*
              Example:
              <PieChartComponent />
            */}
          </div>

          {/* Bar Chart */}
          <div className="dashboard-card chart-card mt-4">
            <h5 className="mb-3">Loan Statistics</h5>

            <div className="chart-placeholder">
           <EmployeeDoughNutStat />
            </div>

            {/*
              Example:
              <BarChartComponent />
            */}
          </div>
        </div>
      </div>
    </div>
     
    </div>
  )
}

export default EmployeeDashboard

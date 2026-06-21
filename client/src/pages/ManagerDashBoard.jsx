import React, { useEffect, useState } from "react";
import AdminHeader from "../components/Admin/AdminHeader";
import EmployeeActionStat from "../components/Employee/EmployeeActionStat";
import EmployeeDoughNutStat from "../components/Employee/EmployeeDoughNutStat";
import PendingLoans from "../components/Employee/PendingLoans";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  FaUsers,
  FaUserSlash,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import "../styles/empdashboard.css";

const ManagerDashBoard = () => {
  const user = useSelector((state) => state.user);

  const [statData, setStatData] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/emp/get-pending-actinons",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );

        setStatData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getInfo();
  }, [user.token]);

  return (
    <>
      <AdminHeader />

      <div className="container-fluid dashboard-wrapper">

        {/* ===== Top Cards ===== */}
        <div className="row g-4 mb-4">

          <div className="col-lg-4 col-md-6">
            <div className="stat-card">
              <div className="icon bg-primary">
                <FaUsers />
              </div>

              <div>
                <h6>Account Requests</h6>
                <h2>{statData.pendingAccounts}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="stat-card">
              <div className="icon bg-danger">
                <FaUserSlash />
              </div>

              <div>
                <h6>Account Deactivations</h6>
                <h2>{statData.pendingAccountDeActivations}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="stat-card">
              <div className="icon bg-success">
                <FaFileInvoiceDollar />
              </div>

              <div>
                <h6>Loan Applications</h6>
                <h2>{statData.loanApplications}</h2>
              </div>
            </div>
          </div>

        </div>

        {/* ===== Charts ===== */}
        <div className="row g-4 mb-4">

          <div className="col-lg-6">
            <div className="chart-card">
              <div className="chart-header">
                <h5>Account Statistics</h5>
              </div>

              <div className="chart-body">
                <EmployeeActionStat />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="chart-card">
              <div className="chart-header">
                <h5>Loan Statistics</h5>
              </div>

              <div className="chart-body">
                <EmployeeDoughNutStat />
              </div>
            </div>
          </div>

        </div>

        {/* ===== Pending Loans ===== */}
        <div className="row">
          

              <PendingLoans />
            </div>

      

      </div>
    </>
  );
};

export default ManagerDashBoard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AdminHeader from '../Admin/AdminHeader';

const PendingLoans = () => {
    const user = useSelector((state) => state.user);
    const token = user?.token;

    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [emiData, setEmiData] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({});

    // Pagination State
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        if (token) {
            fetchPendingLoans(currentPage);
        }
    }, [currentPage, token]);

    const fetchPendingLoans = async (page) => {
        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get(
                `http://localhost:8080/api/loanApplication-pending?page=${page}&size=${pageSize}`, 
                config
            );
            
            const loanList = response.data.data || [];
            setLoans(loanList);
            setTotalPages(response.data.totalPages || 1);

            // Fetch EMI details for each loan application
            loanList.forEach(loan => {
                fetchEmiDetails(loan.id);
            });
        } catch (error) {
            console.error("Error fetching pending loans:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchEmiDetails = async (applicationId) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get(
                `http://localhost:8080/api/loan/calculate-emi/${applicationId}`, 
                config
            );
            console.log(response.data)
            setEmiData(prevState => ({
                ...prevState,
                [applicationId]: response.data.monthlyEmi
            }));
            console.log(emiData)
        } catch (error) {
            console.error(`Error fetching EMI for ID ${applicationId}:`, error);
        }
    };

    const handleStatusChange = (applicationId, value) => {
        setSelectedStatus(prevState => ({
            ...prevState,
            [applicationId]: value
        }));
    };

    const handleUpdateStatus = async (applicationId) => {
        const statusToUpdate = selectedStatus[applicationId];
        if (!statusToUpdate) {
            alert("Please select a status from the dropdown first.");
            return;
        }

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            // Sending as RequestParam via query string matching backend signature
            await axios.put(
                `http://localhost:8080/api/loan-application/action/${applicationId}?loanStatus=${statusToUpdate}`,
                {},
                config
            );
            
            // Re-render data upon successful update
            fetchPendingLoans(currentPage);
        } catch (error) {
            console.error("Error updating loan status:", error);
        }
    };

    const evaluateCriteria = (monthlyIncome, emi) => {
        console.log(emi)
        if (emi === undefined || emi === null) return "Loading...";
        const halfSalary = monthlyIncome * 0.55;
        return emi < halfSalary ? "PASSED" : "FAILED";
    };

    return (
        <div>
            <AdminHeader />
        <div className="container mt-4">
            <h2 className="mb-4">Pending Loan Applications</h2>

            {loading ? (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>App ID / Account</th>
                                <th>Loan Type</th>
                                <th>Requested Amount</th>
                                <th>Tenure (Yrs)</th>
                                <th>Monthly Income</th>
                                <th>Monthly EMI</th>
                                <th>Criteria</th>
                                <th>Present Status</th>
                                <th>Update Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center py-4">No pending loan applications found.</td>
                                </tr>
                            ) : (
                                loans.map((loan) => {
                                    const appId = loan.id;
                                    const emi = emiData[appId];
                                    const criteriaResult = evaluateCriteria(loan.monthlyIncome,emi);
                                     if(loan.loanStatus==="PENDING"&&user.role==="MANAGER"){
                                        return 
                                     }
                                     if(loan.loanStatus==="ONGOING"&&user.role==="EMPLOYEE"){
                                        return 
                                     }
                                    return (
                                        <tr key={appId}>
                                            <td>{appId}</td>
                                            <td>{loan.loanType}</td>
                                            <td>${loan.requestedAmount.toFixed(2)}</td>
                                            <td>{loan.tenureYears}</td>
                                            <td>${loan.monthlyIncome.toFixed(2)}</td>
                                            <td>
                                                {emi !== undefined ? `$${Number(emi).toFixed(2)}` : '...'}
                                            </td>
                                            <td>
                                                <span className={`badge ${criteriaResult === 'PASSED' ? 'bg-success' : criteriaResult === 'FAILED' ? 'bg-danger' : 'bg-secondary'}`}>
                                                    {criteriaResult}
                                                </span>
                                            </td>
                                             <td>{loan.loanStatus}</td>
                                            <td>
                                                <select 
                                                    className="form-select form-select-sm"
                                                    value={selectedStatus[appId] || ""}
                                                    onChange={(e) => handleStatusChange(appId, e.target.value)}
                                                >
                                                    <option value="" disabled>Select Status</option>
                                                    {user.role==="EMPLOYEE"? <>
                                                    <option value="REJECTED">REJECTED</option>
                                                    <option value="ONGOING">ONGOING</option>
                                                    </>: <>
                                                    <option value="REJECTED">REJECTED</option>
                                                    <option value="APPROVED">APPROVED</option>
                                                    </>}
                                                   
                                                </select>
                                            </td>
                                           
                                            <td className="text-center">
                                                <button 
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleUpdateStatus(appId)}
                                                >
                                                    Update
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination UI */}
            {totalPages > 0 && (
                <nav className="d-flex justify-content-center mt-3">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}>
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages).keys()].map((page) => (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(page)}>
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
        </div>
    );
};

export default PendingLoans;
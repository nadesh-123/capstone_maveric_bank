import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const AccountApprovalDash = () => {
    const user = useSelector((state) => state.user);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 2; 

    // Modal State
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    // Track activated button states locally per account number
    const [activatedAccounts, setActivatedAccounts] = useState({});
  const [arry, setArry] = useState([]);
    useEffect(() => {
        fetchUnapprovedAccounts(currentPage);
    }, [currentPage]);

    const fetchUnapprovedAccounts = async (page) => {
          
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/account/unapproved?page=${page}&size=${pageSize}`,{
                    headers: {
                        "Authorization": "Bearer " + user.token
                    }
                });
            setAccounts(response.data.accounts || []);
            setTotalPages(response.data.totalPages || 1);
           setArry(Array.from({ length:response.data.totalPages}))
        } catch (error) {
            console.error("Error fetching unapproved accounts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = async (customerId) => {
        setModalLoading(true);
        setSelectedCustomer(null);
        try {
            const response = await axios.get(`http://localhost:8080/api/emp/getCustomer/${customerId}`,{
                    headers: {
                        "Authorization": "Bearer " + user.token
                    }
                });
            setSelectedCustomer(response.data);
        } catch (error) {
            console.error("Error fetching customer details:", error);
        } finally {
            setModalLoading(false);
        }
    };

    const handleActivateAccount = async (accountNumber) => {
        try {
            await axios.put(`http://localhost:8080/api/emp/approve/${accountNumber}`,{},{
                    headers: {
                        "Authorization": "Bearer " + user.token
                    }
                });
            setActivatedAccounts(prevState => ({
                ...prevState,
                [accountNumber]: true
            }));
        } catch (error) {
            console.error("Error activating account:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Unapproved Account Requests</h2>

            {loading ? (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Account No</th>
                                <th>Account Type</th>
                              
                                <th>Balance</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">No unapproved accounts found.</td>
                                </tr>
                            ) : (
                                accounts.map((account) => (
                                    <tr key={account.accno}>
                                        <td>{account.accno}</td>
                                        <td>{account.accountType}</td>
                                       
                                        <td>₹{account.balance.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge ${activatedAccounts[account.accno] ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                {activatedAccounts[account.accno] ? 'ACTIVE' : account.status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button 
                                                className="btn btn-info btn-sm me-2 text-white"
                                                data-bs-toggle="modal"
                                                data-bs-target="#customerModal"
                                                onClick={() => handleViewDetails(account.cusId)}
                                            >
                                                View Details
                                            </button>

                                            {activatedAccounts[account.accno] ? (
                                                <button className="btn btn-success btn-sm" disabled>
                                                    Activated
                                                </button>
                                            ) : (
                                                <button 
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleActivateAccount(account.accno)}
                                                >
                                                    Activate
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 0 && (
                <nav className="d-flex justify-content-center mt-3">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                            <button className="page-item page-link" onClick={() => setCurrentPage(currentPage-1)}>
                                Previous
                            </button>
                        </li>
                        {arry.map((_, page) =>  (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(page)}>
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage+1)}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {/* Bootstrap Modal Popup Component  */}
            <div className="modal fade" id="customerModal" tabIndex="-1" aria-labelledby="customerModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title" id="customerModalLabel">Customer Information</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {modalLoading && (
                                <div className="text-center my-3">
                                    <div className="spinner-border text-secondary" role="status"></div>
                                </div>
                            )}
                            
                            {!modalLoading && selectedCustomer && (
                                <div className="container-fluid">
                                    
                                    <div className="row mb-2">
                                        <div className="col-5 fw-bold">Full Name:</div>
                                        <div className="col-7">{selectedCustomer.fullname}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 fw-bold">Email:</div>
                                        <div className="col-7 text-break">{selectedCustomer.email}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 fw-bold">Gender:</div>
                                        <div className="col-7">{selectedCustomer.gender}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 fw-bold">DOB:</div>
                                        <div className="col-7">{selectedCustomer.dob}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 fw-bold">Phone:</div>
                                        <div className="col-7">{selectedCustomer.phonenumber}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 fw-bold">Aadhar No:</div>
                                        <div className="col-7">{selectedCustomer.aadharno}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 fw-bold">PAN No:</div>
                                        <div className="col-7">{selectedCustomer.panno}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 fw-bold">Location:</div>
                                        <div className="col-7">{selectedCustomer.location}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountApprovalDash;
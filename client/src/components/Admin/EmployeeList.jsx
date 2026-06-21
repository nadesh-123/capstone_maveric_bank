import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AdminHeader from './AdminHeader';

const EmployeeList = () => {
    // Get user token from Redux store
    const user = useSelector((state) => state.user);
    const token = user?.token;

    // Component states
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    // Fetch employees from API
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            // Adjust query parameters if your backend expects page/size
            const response = await axios.get(`http://localhost:8080/api/admin/get-alL-emp`, {
                params: { page: currentPage, size: 10 }, 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data) {
                setEmployees(response.data.data || []);
                setTotalPages(response.data.totalPages || 0);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch whenever page changes
    useEffect(() => {
        fetchEmployees();
    }, [currentPage]);

    // Handle Deactivate/Delete Action
    const handleDeactivate = async (userId) => {
        if (window.confirm("Are you sure you want to deactivate this employee?")) {
            try {
                await axios.delete(`http://localhost:8080/api/admin/remove-emp/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert("Employee deactivated successfully!");
               
                fetchEmployees(); 
            } catch (error) {
                console.error("Error deactivating employee:", error);
                alert("Failed to deactivate employee.");
            }
        }
    };

    // Create array for pagination matching your exact mapping syntax `arry.map`
    const arry = Array.from({ length: totalPages });

    return (
        <div>
            <AdminHeader />
        <div className="container mt-5">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
                    <h5 className="mb-0 fw-bold">Employee Management</h5>
                    <span className="badge bg-secondary">Total Pages: {totalPages}</span>
                </div>
                
                <div className="card-body p-0">
                    {loading ? (
                        <div className="d-flex justify-content-center my-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light text-uppercase fs-7 text-secondary">
                                    <tr>
                                        <th className="ps-4">Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Status</th>
                                        <th className="text-center pe-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.length > 0 ? (
                                        employees.map((emp) => (
                                            <tr key={emp.userId}>
                                                <td className="ps-4 fw-semibold text-dark">{emp.name}</td>
                                                <td>{emp.email}</td>
                                                <td><code className="text-muted">{emp.username}</code></td>
                                                <td>
                                                    <span className={`badge rounded-pill ${emp.status === 'ACTIVE' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                        {emp.status}
                                                    </span>
                                                </td>
                                                <td className="text-center pe-4">
                                                    <button 
                                                        className="btn btn-outline-danger btn-sm px-3 rounded-pill"
                                                        onClick={() => handleDeactivate(emp.userId)}
                                                    >
                                                        Deactivate
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-muted">
                                                No employees found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 0 && (
                <nav className="d-flex justify-content-center mt-4">
                    <ul className="pagination shadow-sm">
                        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                                Previous
                            </button>
                        </li>
                        {arry.map((_, page) => (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(page)}>
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
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

export default EmployeeList;
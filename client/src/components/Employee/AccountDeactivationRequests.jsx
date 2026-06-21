import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AdminHeader from '../Admin/AdminHeader';

const AccountDeactivationRequests = () => {
  const user = useSelector((state) => state.user);
  const token = user?.token;

  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [size] = useState(5); 

  useEffect(() => {
    if (token) {
      fetchRequests();
    }
  }, [page, token]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/account/deactivation-request', {
        params: { page, size },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      setRequests(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching deactivation requests:', error);
    }
  };

  const handleDeactivate = async (accountNumber) => {
    if (window.confirm(`Are you sure you want to close account ${accountNumber}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/emp/close-account/${accountNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        });
        alert('Account closed successfully');
        fetchRequests(); 
      } catch (error) {
        console.error('Error closing account:', error);
        alert('Failed to close account');
      }
    }
  };

  return (
    <div>
      <AdminHeader />
    <div className="container mt-4">
      <h2 className="mb-4">Account Deactivation Requests</h2>
      
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Account Number</th>
              <th>Username</th>
              <th>Created At</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.accountNumber}</td>
                  <td>{req.username}</td>
                  <td>{new Date(req.createdAt).toLocaleString()}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeactivate( req.accountNumber)}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3">
                  No deactivation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary btn-sm"
          disabled={page === 0}
          onClick={() => setPage(page-1)}
        >
          Previous
        </button>
        <span className="fw-bold">
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          disabled={page >= totalPages - 1}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default AccountDeactivationRequests;
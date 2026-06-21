import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/userSlice";
import { 
  X, 
  CreditCard, 
  Wallet, 
  Coins, 
  ArrowLeftRight, 
  User, 
  LogOut 
} from 'lucide-react';

export default function AdminProfile({ isOpen, onClose }) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const menuItems = [
    {
      label: 'Onboard Employee',
      icon: <CreditCard size={20} />,
      path: '/admin-dashboard/add-emp'
    },
      {
      label: 'Employee Management',
      icon: <CreditCard size={20} />,
      path: '/admin-dashboard/employee-list'
    },
       {
      label: 'Customer Management',
      icon: <CreditCard size={20} />,
      path: '/admin-dashboard/customer-list'
    },

 
  ];

  return (
    <>
     <style>{`
        .bg-navy-primary {
          background-color: #0A2540;
        }
        .text-navy-primary {
          color: #0A2540;
        }
        .text-emerald-accent {
          color: #00a388;
        }
        .profile-sidebar {
          width: 340px;
          box-shadow: -0.5rem 0 2.5rem rgba(10, 37, 64, 0.15);
          z-index: 1060;
          transition: transform 0.3s ease-in-out;
        }
        .profile-sidebar-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1.25rem;
          border: none;
          background: transparent;
          border-radius: 0.75rem;
          color: #475569;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          text-align: left;
        }
        .profile-sidebar-btn:hover {
          background-color: rgba(10, 37, 64, 0.05);
          color: #0A2540;
          transform: translateX(4px);
        }
        .profile-sidebar-btn .icon-wrapper {
          color: #0A2540;
          display: flex;
          align-items: center;
        }
        .profile-sidebar-btn:hover .icon-wrapper {
          color: #00a388;
        }
        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1.25rem;
          border: 1px solid #fee2e2;
          background-color: #fff5f5;
          border-radius: 0.75rem;
          color: #dc2626;
          font-weight: 500;
          transition: all 0.2s;
        }
        .logout-btn:hover {
          background-color: #fee2e2;
        }
        .avatar-placeholder {
          width: 80px;
          height: 80px;
          background-color: #0A2540;
          color: #ffffff;
          font-size: 2rem;
          font-weight: 700;
          box-shadow: 0 0.5rem 1rem rgba(10, 37, 64, 0.1);
        }
        .sidebar-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 1050;
        }
      `}</style>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div className="sidebar-backdrop" onClick={onClose}></div>
      )}

      {/* Sidebar Panel */}
      {/* FIXED: Removed 'translate-middle-x' entirely from the class list below */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-white profile-sidebar d-flex flex-column"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          margin: 0,
          padding: 0
        }}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between p-4 border-bottom">
          <h2 className="fs-5 fw-bold text-navy-primary m-0">Profile Menu</h2>
          <button
            onClick={onClose}
            className="btn border-0 p-1 text-muted"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info Section */}
        <div className="d-flex flex-column align-items-center py-4 border-bottom text-center px-3">
          {currentUser?.avatar ? (
            <img
              className="rounded-circle object-fit-cover border border-3 border-white shadow-sm mb-3"
              src={currentUser.avatar}
              alt="profile"
              style={{ width: '80px', height: '80px' }}
            />
          ) : (
            <div className="avatar-placeholder rounded-circle d-flex align-items-center justify-content-center mb-3">
              {currentUser?.username ? currentUser.username.charAt(0).toUpperCase() : <User size={36} />}
            </div>
          )}
          <h3 className="fs-5 fw-semibold text-dark mb-1">
            {currentUser?.username || 'Welcome User'}
          </h3>
          <p className="text-muted small m-0">
            Secure Corporate Banking Customer
          </p>
        </div>

        {/* Navigation Menu Links */}
        <div className="p-4 d-flex flex-column gap-2 flex-grow-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="profile-sidebar-btn"
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
            >
              <span className="icon-wrapper">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Footer Actions (Sign Out) */}
        <div className="p-4 border-top bg-light">
          <button
            className="logout-btn"
            onClick={() => {
                dispatch(clearUser())
              navigate('/empsignin');
              onClose();
            }}
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
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
      label: 'Create Account',
      icon: <CreditCard size={20} />,
      path: '/create-account'
    },
    {
      label: 'Manage Account',
      icon: <Wallet size={20} />,
      path: '/accountList'
    },
    {
      label: 'Manage Loans',
      icon: <Coins size={20} />,
      path: '/manage-loans'
    },
    {
      label: 'Transactions',
      icon: <ArrowLeftRight size={20} />,
      path: '/transactions'
    }
  ];

  return (
    <>
      <style>{`
        
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
              navigate('/');
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
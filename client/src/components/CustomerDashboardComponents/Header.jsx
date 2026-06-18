import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect ,useState} from 'react';
import { Building2, User } from 'lucide-react';
import ProfilePopup from './ProfilePopup.jsx';
export default function Header() {
  const currentUser  = useSelector((state) => state.user);
  const navigate = useNavigate();
const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <>
      

      {/* Changed py-3 px-4 to just py-3 p-0 to drop header side padding */}
      <header className="navbar navbar-expand navbarbg shadow sticky-top py-3 p-3">
        {/* Changed container-fluid classes to px-0 to push items to the exact viewport boundaries */}
        <div className="container-fluid d-flex justify-content-between align-items-center w-100 px-0 m-0">
          
          {/* Logo Section */}
          <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
            <div className="bg-white p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
              <Building2 style={{ color: '#0A2540' }} size={20} />
            </div>
            <h1 className="navbar-brand navtitle fw-bold tracking-wide m-0 fs-4 d-flex align-items-center flex-wrap">
              <span>Maveric</span>
              <span className="navtitle ms-1">Bank</span>
            </h1>
          </Link>

          {/* Navigation Links & Profile */}
          <div className="d-flex align-items-center gap-4">
            <ul className="navbar-nav d-flex align-items-center gap-3 gap-sm-4 m-0 p-0 list-unstyled">
              <li className="nav-item d-none d-sm-inline">
                <Link to="/" className="nav-link nav-link-custom text-white p-0 text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="nav-item d-none d-sm-inline">
                <Link to="/about" className="nav-link nav-link-custom p-0 text-white text-decoration-none">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <div  className="text-decoration-none d-flex align-items-center">
                  {currentUser.id != null ? (
                    <img
                      className="rounded-circle object-fit-cover border border-2 border-white shadow-sm"
                      src={currentUser.avatar}
                      alt="profile"
                      style={{ width: '36px', height: '36px' }}
                      onClick={() => setIsProfileOpen(true)}
                    />
                  ) : (
                    <Link  to="/signin" className="d-flex align-items-center justify-content-center text-white shadow-sm text-capitalize"
                     onClick={() => navigate("/signin")}>
                      sign in
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>

        </div>
      </header>
      <ProfilePopup 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  );
}
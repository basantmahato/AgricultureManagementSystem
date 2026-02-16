import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar-sticky">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo-icon">🌱</span>
        <span className="navbar-logo-text">agroFarm</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className="nav-link">HOME</Link>
        <Link to="/store" className="nav-link">OUR STORE</Link>
        <Link to="/know-your-soil" className="nav-link">KNOW YOUR SOIL</Link>
        <Link to="/blog" className="nav-link">FARM BLOG</Link>
      </div>

      <div className="navbar-actions">
        <Link to="/cart" className="nav-icon-btn nav-cart-btn" aria-label="Cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
        </Link>

        <div className="navbar-user-wrap" ref={menuRef}>
          <button
            className="nav-icon-btn user-btn"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-label="User menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {userMenuOpen && (
            <div className="navbar-dropdown">
              {user ? (
                <>
                  {user.role !== "admin" && (
                    <>
                      <Link to="/dashboard" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Dashboard
                      </Link>
                      <Link to="/tasks" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                        Tasks
                      </Link>
                      <Link to="/know-your-soil" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22v-6M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /><path d="M12 8V2M4.93 10.93l4.24 4.24M16.24 7.76l4.24 4.24" />
                        </svg>
                        Know Your Soil
                      </Link>
                    </>
                  )}
                  {user.role === "admin" && (
                    <Link to="/admin" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                      Admin
                    </Link>
                  )}
                  <button className="dropdown-item logout-item" onClick={() => { logout(); setUserMenuOpen(false); }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
                    </svg>
                    Signup
                  </Link>
                  <Link to="/login" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    Login
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .navbar-sticky {
          position: sticky;
          top: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 1px 20px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(10px);
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #16a34a;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 0.5px;
        }
        .navbar-logo-icon { font-size: 24px; }
        .navbar-links {
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .nav-link {
          text-decoration: none;
          color: #334155;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #16a34a; }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: #16a34a;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .nav-icon-btn:hover { background: #f0fdf4; }
        .nav-cart-btn { position: relative; text-decoration: none; }
        .nav-cart-badge { position: absolute; top: -4px; right: -4px; min-width: 18px; height: 18px; padding: 0 5px; background: #dc2626; color: #fff; font-size: 11px; font-weight: 700; border-radius: 999px; display: flex; align-items: center; justify-content: center; }
        .navbar-user-wrap { position: relative; }
        .navbar-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 180px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
          padding: 8px;
          animation: dropdown-appear 0.2s ease;
        }
        @keyframes dropdown-appear {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          background: none;
          color: #334155;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
        }
        .dropdown-item:hover { background: #f0fdf4; color: #16a34a; }
        .logout-item { color: #dc2626; }
        .logout-item:hover { background: #fef2f2; color: #dc2626; }
        @media (max-width: 900px) {
          .navbar-links { gap: 16px; }
          .nav-link { font-size: 12px; }
        }
        @media (max-width: 700px) {
          .navbar-sticky { padding: 12px 16px; }
          .navbar-links { display: none; }
          .navbar-logo-text { font-size: 16px; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;

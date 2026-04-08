import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LayoutDashboard,
  CheckSquare,
  Sprout,
  Shield,
  UserPlus,
  LogIn,
  LogOut,
  Home,
  Store,
  BookOpen,
  Mail
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileNavOpen]);

  useEffect(() => {
    if (mobileNavOpen) {
      setUserMenuOpen(false);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen || !mobileNavRef.current) return;
    const t = window.setTimeout(() => {
      const focusable = mobileNavRef.current?.querySelector(
        "button, [href]"
      );
      focusable?.focus();
    }, 100);
    return () => clearTimeout(t);
  }, [mobileNavOpen]);

  const closeMobile = () => setMobileNavOpen(false);

  return (
    <nav
      className={`navbar-sticky${mobileNavOpen ? " navbar-sticky--mobile-drawer-open" : ""}`}
    >
      <Link to="/" className="navbar-brand" onClick={closeMobile}>
        <span className="navbar-logo-icon">🌱</span>
        <span className="navbar-logo-text">agroFarm</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className="nav-link">HOME</Link>
        <Link to="/store" className="nav-link">OUR STORE</Link>
        <Link to="/know-your-soil" className="nav-link">KNOW YOUR SOIL</Link>
        <Link to="/blog" className="nav-link">FARM BLOG</Link>
        <Link to="/contact" className="nav-link">CONTACT</Link>
      </div>

      <div className="navbar-actions">
        <Link to="/cart" className="nav-icon-btn nav-cart-btn" aria-label="Cart" onClick={closeMobile}>
          <ShoppingCart size={22} strokeWidth={2} />
          {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
        </Link>

        <div className="navbar-user-wrap" ref={menuRef}>
          <button
            type="button"
            className="nav-icon-btn user-btn"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-expanded={userMenuOpen}
            aria-label="User menu"
          >
            <User size={22} strokeWidth={2} />
          </button>

          {userMenuOpen && (
            <div className="navbar-dropdown">
              {user ? (
                <>
                  {user.role !== "admin" && (
                    <>
                      <Link to="/dashboard" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <LayoutDashboard size={18} strokeWidth={2} />
                        Dashboard
                      </Link>
                      <Link to="/tasks" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <CheckSquare size={18} strokeWidth={2} />
                        Tasks
                      </Link>
                      <Link to="/know-your-soil" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <Sprout size={18} strokeWidth={2} />
                        Know Your Soil
                      </Link>
                    </>
                  )}
                  {user.role === "admin" && (
                    <Link to="/admin" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <Shield size={18} strokeWidth={2} />
                      Admin
                    </Link>
                  )}
                  <button
                    type="button"
                    className="dropdown-item logout-item"
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                  >
                    <LogOut size={18} strokeWidth={2} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                    <UserPlus size={18} strokeWidth={2} />
                    Signup
                  </Link>
                  <Link to="/login" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                    <LogIn size={18} strokeWidth={2} />
                    Login
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          className="nav-icon-btn navbar-mobile-toggle"
          onClick={() => setMobileNavOpen((o) => !o)}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        >
          {mobileNavOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </div>

      {mobileNavOpen && (
        <>
          <button
            type="button"
            className="navbar-mobile-backdrop"
            aria-label="Close menu"
            onClick={closeMobile}
          />
          <div
            id="mobile-nav-panel"
            className="navbar-mobile-panel"
            ref={mobileNavRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
          >
            <div className="navbar-mobile-panel-head">
              <h2 id="mobile-nav-title" className="navbar-mobile-panel-title">
                Menu
              </h2>
              <button
                type="button"
                className="navbar-mobile-panel-close"
                onClick={closeMobile}
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={2} />
              </button>
            </div>
            <div className="navbar-mobile-panel-scroll">
              <p className="navbar-mobile-eyebrow">Explore</p>
              <nav className="navbar-mobile-navlist" aria-label="Primary pages">
                <Link to="/" className="navbar-mobile-item" onClick={closeMobile}>
                  <Home size={20} strokeWidth={2} aria-hidden />
                  <span>Home</span>
                </Link>
                <Link to="/store" className="navbar-mobile-item" onClick={closeMobile}>
                  <Store size={20} strokeWidth={2} aria-hidden />
                  <span>Our store</span>
                </Link>
                <Link
                  to="/know-your-soil"
                  className="navbar-mobile-item"
                  onClick={closeMobile}
                >
                  <Sprout size={20} strokeWidth={2} aria-hidden />
                  <span>Know your soil</span>
                </Link>
                <Link to="/blog" className="navbar-mobile-item" onClick={closeMobile}>
                  <BookOpen size={20} strokeWidth={2} aria-hidden />
                  <span>Farm blog</span>
                </Link>
                <Link to="/contact" className="navbar-mobile-item" onClick={closeMobile}>
                  <Mail size={20} strokeWidth={2} aria-hidden />
                  <span>Contact us</span>
                </Link>
                <Link to="/cart" className="navbar-mobile-item" onClick={closeMobile}>
                  <span className="navbar-mobile-item-cart-wrap">
                    <ShoppingCart size={20} strokeWidth={2} aria-hidden />
                    {cartCount > 0 && (
                      <span className="navbar-mobile-item-badge">{cartCount}</span>
                    )}
                  </span>
                  <span>Cart</span>
                </Link>
              </nav>

              <p className="navbar-mobile-eyebrow">Account</p>
              <div className="navbar-mobile-navlist">
                {user ? (
                  <>
                    {user.role !== "admin" && (
                      <>
                        <Link
                          to="/dashboard"
                          className="navbar-mobile-item"
                          onClick={closeMobile}
                        >
                          <LayoutDashboard size={20} strokeWidth={2} aria-hidden />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/tasks"
                          className="navbar-mobile-item"
                          onClick={closeMobile}
                        >
                          <CheckSquare size={20} strokeWidth={2} aria-hidden />
                          <span>Tasks</span>
                        </Link>
                      </>
                    )}
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="navbar-mobile-item"
                        onClick={closeMobile}
                      >
                        <Shield size={20} strokeWidth={2} aria-hidden />
                        <span>Admin</span>
                      </Link>
                    )}
                    <button
                      type="button"
                      className="navbar-mobile-item navbar-mobile-item--logout"
                      onClick={() => {
                        logout();
                        closeMobile();
                      }}
                    >
                      <LogOut size={20} strokeWidth={2} aria-hidden />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="navbar-mobile-item"
                      onClick={closeMobile}
                    >
                      <UserPlus size={20} strokeWidth={2} aria-hidden />
                      <span>Sign up</span>
                    </Link>
                    <Link
                      to="/login"
                      className="navbar-mobile-item"
                      onClick={closeMobile}
                    >
                      <LogIn size={20} strokeWidth={2} aria-hidden />
                      <span>Log in</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;

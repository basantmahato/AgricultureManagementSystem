import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard, ClipboardList } from "lucide-react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update layout on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🌱 AgroTask</div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div style={styles.navLinks}>
          <NavLink to="/dashboard" style={styles.link}>Dashboard</NavLink>
          <NavLink to="/tasks" style={styles.link}>Tasks</NavLink>
        </div>
      )}

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button onClick={toggleMenu} style={styles.menuButton}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      )}

      {/* Mobile Drawer */}
      <div style={{ 
        ...styles.drawer, 
        transform: isOpen && isMobile ? "translateX(0)" : "translateX(100%)" 
      }}>
        <div style={styles.drawerLinks}>
          <NavLink to="/dashboard" onClick={toggleMenu} style={styles.drawerLink}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/tasks" onClick={toggleMenu} style={styles.drawerLink}>
            <ClipboardList size={20} /> Tasks
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem",
    height: "70px",
    background: "#0f172a",
    color: "#fff",
    position: "relative",
    zIndex: 100
  },
  logo: { fontSize: "1.5rem", fontWeight: "bold" },
  navLinks: { display: "flex", gap: "2rem" },
  link: { color: "#cbd5e1", textDecoration: "none" },
  menuButton: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    zIndex: 101
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    width: "250px",
    background: "#1e293b",
    transition: "transform 0.3s ease-in-out",
    padding: "80px 20px",
    boxShadow: "-2px 0 10px rgba(0,0,0,0.5)"
  },
  drawerLinks: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  drawerLink: { 
    color: "#fff", 
    textDecoration: "none", 
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }
};

export default Nav;
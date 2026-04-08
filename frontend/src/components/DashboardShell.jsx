import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Home } from "lucide-react";

function navMatchActive(location, match) {
  const { pathname, search } = location;
  const q = new URLSearchParams(search);
  switch (match) {
    case "dashboard-home":
      return (
        pathname === "/dashboard" &&
        q.get("view") !== "weather" &&
        q.get("view") !== "orders" &&
        q.get("view") !== "soil"
      );
    case "dashboard-weather":
      return pathname === "/dashboard" && q.get("view") === "weather";
    case "dashboard-orders":
      return pathname === "/dashboard" && q.get("view") === "orders";
    case "dashboard-soil":
      return pathname === "/dashboard" && q.get("view") === "soil";
    case "tasks":
      return pathname === "/tasks";
    default:
      return false;
  }
}

/**
 * Sidebar layout for admin / user dashboards.
 * Pass items with `section` (in-page id) and/or `to` (react-router path).
 * Optional `navMatch` for `to` items when pathname alone is ambiguous (e.g. dashboard + query).
 */
function DashboardShell({
  variant = "user",
  sidebarTitle,
  sidebarSubtitle,
  pageTitle,
  pageSubtitle,
  items = [],
  activeSection,
  onSectionChange,
  children,
  headerActions = null
}) {
  const topTitle = pageTitle ?? sidebarTitle;
  const topSubtitle = pageSubtitle ?? sidebarSubtitle;
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  const isActive = (item) => {
    if (item.to) {
      return false;
    }
    return item.section === activeSection;
  };

  const handleNavClick = (item) => {
    if (item.section && onSectionChange) {
      onSectionChange(item.section);
    }
    closeMobile();
  };

  return (
    <div className={`dash-shell dash-shell--${variant}`}>
      <button
        type="button"
        className="dash-mobile-toggle"
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((o) => !o)}
      >
        {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
      </button>

      {mobileOpen && (
        <button
          type="button"
          className="dash-backdrop"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      )}

      <aside className={`dash-sidebar ${mobileOpen ? "dash-sidebar--open" : ""}`}>
        <div className="dash-sidebar-brand">
          <span className="dash-sidebar-badge">{variant === "admin" ? "Admin" : "Dashboard"}</span>
          <h2 className="dash-sidebar-title">{sidebarTitle}</h2>
          {sidebarSubtitle && <p className="dash-sidebar-sub">{sidebarSubtitle}</p>}
        </div>

        <nav className="dash-nav" aria-label="Dashboard sections">
          <ul className="dash-nav-list">
            {items.map((item) => {
              const Icon = item.icon;
              const badge =
                typeof item.badge === "number" ? item.badge : item.badge?.();

              if (item.to) {
                return (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive: navActive }) => {
                        const active =
                          item.navMatch != null
                            ? navMatchActive(location, item.navMatch)
                            : navActive;
                        return `dash-nav-link${active ? " dash-nav-link--active-route" : ""}`;
                      }}
                      onClick={closeMobile}
                    >
                      {Icon && (
                        <span className="dash-nav-icon" aria-hidden>
                          <Icon size={20} strokeWidth={2} />
                        </span>
                      )}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              }

              return (
                <li key={item.section}>
                  <button
                    type="button"
                    className={`dash-nav-link${isActive(item) ? " dash-nav-link--active" : ""}`}
                    onClick={() => handleNavClick(item)}
                  >
                    {Icon && (
                      <span className="dash-nav-icon" aria-hidden>
                        <Icon size={20} strokeWidth={2} />
                      </span>
                    )}
                    <span className="dash-nav-text">{item.label}</span>
                    {badge != null && badge !== 0 && (
                      <span className="dash-nav-badge">{badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="dash-sidebar-footer">
          <Link to="/" className="dash-sidebar-home" onClick={closeMobile}>
            <Home size={18} strokeWidth={2} aria-hidden />
            Back to site
          </Link>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <div className="dash-topbar-inner">
            <div className="dash-topbar-text">
              <h1 className="dash-page-title">{topTitle}</h1>
              {topSubtitle && <p className="dash-page-sub">{topSubtitle}</p>}
            </div>
            <div className="dash-topbar-actions">
              {headerActions}
            </div>
          </div>
        </header>
        <div className="dash-content">{children}</div>
      </div>

      <style>{`
        .dash-shell {
          --dash-sidebar-w: 280px;
          --dash-top-offset: 4.25rem;
          --dash-accent: var(--color-primary);
          --dash-surface: var(--color-surface);
          --dash-muted: var(--color-text-muted);
          --dash-border: var(--color-border);
          display: flex;
          align-items: stretch;
          height: calc(100dvh - var(--dash-top-offset));
          max-height: calc(100dvh - var(--dash-top-offset));
          min-height: calc(100dvh - var(--dash-top-offset));
          overflow: hidden;
          background: var(--color-surface-subtle);
          position: relative;
          box-sizing: border-box;
        }
        .dash-shell--admin {
          --dash-sidebar-bg: linear-gradient(180deg, #064e3b 0%, #022c22 100%);
          --dash-sidebar-fg: #ecfdf5;
          --dash-sidebar-muted: rgba(236, 253, 245, 0.65);
          --dash-nav-active-bg: rgba(255, 255, 255, 0.12);
          --dash-nav-hover-bg: rgba(255, 255, 255, 0.06);
        }
        .dash-shell--user {
          --dash-sidebar-bg: linear-gradient(180deg, #14532d 0%, #166534 45%, #14532d 100%);
          --dash-sidebar-fg: #f0fdf4;
          --dash-sidebar-muted: rgba(240, 253, 244, 0.7);
          --dash-nav-active-bg: rgba(255, 255, 255, 0.14);
          --dash-nav-hover-bg: rgba(255, 255, 255, 0.08);
        }
        .dash-mobile-toggle {
          display: none;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1002;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          border: none;
          background: var(--color-primary);
          color: #fff;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(22, 163, 74, 0.4);
        }
        .dash-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(15, 23, 42, 0.45);
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .dash-sidebar {
          width: var(--dash-sidebar-w);
          flex-shrink: 0;
          align-self: stretch;
          height: 100%;
          min-height: 0;
          background: var(--dash-sidebar-bg);
          color: var(--dash-sidebar-fg);
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 999;
          overflow: hidden;
        }
        .dash-sidebar-brand {
          flex-shrink: 0;
          padding: 28px 22px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .dash-sidebar-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          margin-bottom: 10px;
        }
        .dash-sidebar-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 6px;
          line-height: 1.25;
          color: #fff;
        }
        .dash-sidebar-sub {
          margin: 0;
          font-size: 13px;
          color: var(--dash-sidebar-muted);
          line-height: 1.45;
          word-break: break-word;
        }
        .dash-nav {
          flex: 1;
          min-height: 0;
          padding: 16px 12px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .dash-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .dash-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 14px;
          border: none;
          border-radius: var(--radius-lg);
          background: transparent;
          color: var(--dash-sidebar-fg);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          text-align: left;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        a.dash-nav-link { color: inherit; }
        .dash-nav-link:hover {
          background: var(--dash-nav-hover-bg);
        }
        .dash-nav-link--active,
        .dash-nav-link--active-route {
          background: var(--dash-nav-active-bg);
          color: #fff;
        }
        .dash-nav-icon {
          display: flex;
          color: #86efac;
          flex-shrink: 0;
        }
        .dash-nav-link--active .dash-nav-icon,
        .dash-nav-link--active-route .dash-nav-icon {
          color: #fff;
        }
        .dash-nav-text { flex: 1; }
        .dash-nav-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
        }
        .dash-sidebar-footer {
          flex-shrink: 0;
          padding: 16px 14px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .dash-sidebar-home {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: var(--radius-lg);
          color: var(--dash-sidebar-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.15s, color 0.15s;
        }
        .dash-sidebar-home:hover {
          background: var(--dash-nav-hover-bg);
          color: #fff;
        }
        .dash-main {
          flex: 1;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .dash-topbar {
          flex-shrink: 0;
          background: var(--dash-surface);
          border-bottom: 1px solid var(--dash-border);
          position: relative;
          z-index: 5;
        }
        .dash-topbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px clamp(20px, 4vw, 32px);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .dash-page-title {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 3vw, 1.65rem);
          font-weight: 700;
          color: var(--color-accent);
          margin: 0 0 4px;
          letter-spacing: -0.02em;
        }
        .dash-page-sub {
          margin: 0;
          font-size: 14px;
          color: var(--dash-muted);
          font-family: var(--font-body);
        }
        .dash-topbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .dash-content {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: clamp(20px, 4vw, 32px);
          box-sizing: border-box;
        }
        @media (max-width: 960px) {
          /* Above .navbar-sticky (1000) and mobile nav drawer (up to 1060) */
          .dash-mobile-toggle {
            display: flex;
            z-index: 1090;
          }
          .dash-backdrop {
            display: block;
            z-index: 1080;
          }
          .dash-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 1085;
            transform: translateX(-100%);
            transition: transform 0.25s ease;
            box-shadow: 8px 0 40px rgba(0, 0, 0, 0.2);
          }
          .dash-sidebar--open {
            transform: translateX(0);
          }
        }
        @media (min-width: 961px) {
          .dash-mobile-toggle { display: none !important; }
          .dash-backdrop { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default DashboardShell;

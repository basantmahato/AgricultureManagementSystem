import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-block">
          <h3 className="footer-logo">agroFarm</h3>
          <p className="footer-text">
            Smart farm management platform with real-time weather insights and equipment marketplace.
          </p>
        </div>
        <div className="footer-block">
          <h4 className="footer-head">Quick Links</h4>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/dashboard" className="footer-link">Dashboard</Link>
          <Link to="/tasks" className="footer-link">Tasks</Link>
        </div>
        <div className="footer-block">
          <h4 className="footer-head">Contact</h4>
          <p className="footer-text">support@agrofarm.com</p>
          <p className="footer-text">India</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} agroFarm. All rights reserved.
      </div>
      <style>{`
        .footer {
          background: linear-gradient(135deg, #0f172a, #020617);
          color: #cbd5e1;
          margin-top: 0;
        }
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(40px, 8vw, 60px) clamp(20px, 5vw, 48px);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 32px;
        }
        .footer-block { display: flex; flex-direction: column; gap: 12px; }
        .footer-logo { color: #fff; font-size: 18px; font-weight: 700; margin: 0; }
        .footer-head { color: #fff; font-size: 14px; font-weight: 600; margin: 0 0 4px; }
        .footer-text { font-size: 14px; line-height: 1.6; margin: 0; }
        .footer-link { font-size: 14px; color: #94a3b8; text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: #16a34a; }
        .footer-bottom {
          text-align: center;
          padding: 20px 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 13px;
          color: #94a3b8;
        }
      `}</style>
    </footer>
  );
}

export default Footer;

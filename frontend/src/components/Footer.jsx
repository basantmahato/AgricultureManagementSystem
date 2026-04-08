import { Link } from "react-router-dom";

const SITE_LINKS = [
  { to: "/", label: "Home" },
  { to: "/store", label: "Our store" },
  { to: "/know-your-soil", label: "Know your soil" },
  { to: "/blog", label: "Farm blog" },
  { to: "/contact", label: "Contact" }
];

const ACCOUNT_LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/tasks", label: "Tasks" },
  { to: "/cart", label: "Cart" },
  { to: "/login", label: "Log in" }
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand-col">
            <Link to="/" className="site-footer__brand">
              agroFarm
            </Link>
            <p className="site-footer__about">
              Farm tasks, soil tests, and equipment in one place—built for growers who want clarity, not clutter.
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="Site pages">
            <p className="site-footer__heading">Site</p>
            <ul className="site-footer__list">
              {SITE_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="site-footer__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__nav" aria-label="Account">
            <p className="site-footer__heading">Account</p>
            <ul className="site-footer__list">
              {ACCOUNT_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="site-footer__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <p className="site-footer__heading">Contact</p>
            <p className="site-footer__contact-text">
              <a href="mailto:support@agrofarm.com" className="site-footer__email">
                support@agrofarm.com
              </a>
            </p>
            <p className="site-footer__location">India</p>
            <Link to="/contact" className="site-footer__cta">
              Send a message
            </Link>
          </div>
        </div>

        <div className="site-footer__base">
          <p className="site-footer__copy">© {year} agroFarm. All rights reserved.</p>
          <nav className="site-footer__meta" aria-label="Footer shortcuts">
            <Link to="/blog" className="site-footer__meta-link">
              Blog
            </Link>
            <Link to="/store" className="site-footer__meta-link">
              Store
            </Link>
            <Link to="/contact" className="site-footer__meta-link">
              Help
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

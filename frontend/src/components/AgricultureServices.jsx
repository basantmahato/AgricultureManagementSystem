import { Link } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const AgricultureServices = ({ id }) => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const pillars = [
    {
      title: "Know your soil",
      desc: "Book tests, upload photos, and follow status from pending to completed—with notes from your team.",
      link: "/know-your-soil",
      linkLabel: "Book a test",
      accent: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
    },
    {
      title: "Equip your operation",
      desc: "Curated catalog with transparent pricing. Add to cart and checkout with cash on delivery.",
      link: "/store",
      linkLabel: "Browse store",
      accent: "linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)",
    },
    {
      title: "Run the season",
      desc: "Log tasks, costs, and priorities. Your dashboard ties weather context to what matters next.",
      link: "/register",
      linkLabel: "Get started",
      accent: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    },
  ];

  return (
    <section id={id} className="agri-services">
      <div className="agri-inner">
        <header className="agri-head" data-aos="fade-up">
          <span className="landing-section-label">Solutions</span>
          <h2 className="agri-title">From soil to harvest</h2>
          <p className="agri-lead">
            Three pillars that mirror how real farms work—measure, invest, and execute.
          </p>
        </header>
        <div className="agri-columns">
          {pillars.map((p, index) => (
            <article
              key={p.title}
              className="agri-pillar"
              data-aos="fade-up"
              data-aos-delay={index * 90}
              style={{ "--pillar-accent": p.accent }}
            >
              <div className="agri-pillar-top" />
              <h3>{p.title}</h3>
              <p className="agri-pillar-desc">{p.desc}</p>
              <Link to={p.link} className="agri-pillar-link">
                {p.linkLabel}
                <ArrowUpRight size={18} strokeWidth={2.2} aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .agri-services {
          padding: clamp(72px, 12vw, 112px) var(--container-pad-x, 20px);
          background: #fff;
        }
        .agri-inner {
          max-width: 1120px;
          margin: 0 auto;
        }
        .agri-head {
          text-align: center;
          max-width: 520px;
          margin: 0 auto 48px;
        }
        .agri-title {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 4vw, 2.35rem);
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 14px;
          letter-spacing: -0.02em;
        }
        .agri-lead {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          margin: 0;
        }
        .agri-columns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .agri-pillar {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 28px 24px 26px;
          border-radius: 20px;
          border: 1px solid var(--color-border);
          background: var(--pillar-accent);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .agri-pillar:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(15, 23, 42, 0.1);
        }
        .agri-pillar-top {
          width: 40px;
          height: 4px;
          border-radius: 999px;
          background: var(--color-primary);
          margin-bottom: 20px;
        }
        .agri-pillar h3 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-accent);
          margin: 0 0 12px;
        }
        .agri-pillar-desc {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: #475569;
          line-height: 1.6;
          margin: 0 0 20px;
          flex: 1;
        }
        .agri-pillar-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-primary);
          text-decoration: none;
          margin-top: auto;
        }
        .agri-pillar-link:hover {
          color: var(--color-primary-hover);
        }
        @media (max-width: 900px) {
          .agri-columns {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

export default AgricultureServices;

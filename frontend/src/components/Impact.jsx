import AOS from "aos";
import { useEffect } from "react";

function Impact() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const stats = [
    { value: "5,000+", label: "Farmers connected" },
    { value: "12,000+", label: "Soil reports generated" },
    { value: "150+", label: "Cities served" },
    { value: "10,000+", label: "Acres improved" },
  ];

  return (
    <section className="impact" aria-labelledby="impact-heading">
      <div className="impact-inner">
        <h2 id="impact-heading" className="impact-title" data-aos="fade-up">
          Impact that compounds
        </h2>
        <p className="impact-sub" data-aos="fade-up">
          Real numbers from farmers who use agroFarm to run tighter operations.
        </p>
        <div className="impact-grid">
          {stats.map((s, i) => (
            <div key={s.label} className="impact-card" data-aos="fade-up" data-aos-delay={i * 70}>
              <span className="impact-value">{s.value}</span>
              <span className="impact-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .impact {
          padding: clamp(72px, 11vw, 120px) var(--container-pad-x, 20px);
          background: linear-gradient(165deg, #022c22 0%, #064e3b 42%, #065f46 100%);
          color: #ecfdf5;
          text-align: center;
        }
        .impact-inner {
          max-width: 1040px;
          margin: 0 auto;
        }
        .impact-title {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
          color: #fff;
        }
        .impact-sub {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          color: rgba(236, 253, 245, 0.75);
          margin: 0 auto 48px;
          max-width: 42ch;
          line-height: 1.6;
        }
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .impact-card {
          padding: 28px 20px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .impact-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.1);
        }
        .impact-value {
          display: block;
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 700;
          color: #86efac;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .impact-label {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: rgba(236, 253, 245, 0.8);
          line-height: 1.4;
        }
        @media (max-width: 900px) {
          .impact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .impact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

export default Impact;

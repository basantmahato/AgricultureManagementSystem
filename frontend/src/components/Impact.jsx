import AOS from "aos";
import { useEffect } from "react";

function Impact() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const stats = [
    { value: "5,000+", label: "Farmers Connected" },
    { value: "12,000+", label: "Soil Health Reports Generated" },
    { value: "150+", label: "Cities Served" },
    { value: "10,000+", label: "Acres of Land Improved" },
  ];

  return (
    <section className="impact">
      <h2 className="impact-title" data-aos="fade-up">Our Impact</h2>
      <div className="impact-grid">
        {stats.map((s, i) => (
          <div key={i} className="impact-card" data-aos="fade-up" data-aos-delay={i * 80}>
            <span className="impact-value">{s.value}</span>
            <span className="impact-label">{s.label}</span>
          </div>
        ))}
      </div>
      <style>{`
        .impact {
          padding: clamp(60px, 10vw, 100px) clamp(20px, 5vw, 48px);
          background: #f8fafc;
          text-align: center;
        }
        .impact-title { color: #16a34a; font-size: clamp(24px, 4vw, 32px); font-weight: 700; margin: 0 0 40px; }
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .impact-card {
          background: #fff;
          padding: 32px 24px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .impact-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
        .impact-value { display: block; font-size: clamp(28px, 5vw, 36px); font-weight: 800; color: #16a34a; margin-bottom: 8px; }
        .impact-label { font-size: 14px; color: #64748b; }
        @media (max-width: 500px) { .impact-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </section>
  );
}

export default Impact;

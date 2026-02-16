import AOS from "aos";
import { useEffect } from "react";

function Features({ id }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const items = [
    { title: "Soil Health Report", icon: "🌱" },
    { title: "Farmer Marketplace", icon: "🛒" },
    { title: "Weather Forecast", icon: "☁️" },
    { title: "Rent Tools", icon: "🚜" },
    { title: "Agriculture Info", icon: "ℹ️" },
    { title: "Community", icon: "🤝" },
  ];

  return (
    <section id={id} className="features">
      <p className="features-sub" data-aos="fade-up">Reasons to Choose Us</p>
      <h2 className="features-title" data-aos="fade-up">WHAT WE ARE DOING</h2>
      <div className="features-grid">
        {items.map((item, i) => (
          <div key={i} className="features-card" data-aos="fade-up" data-aos-delay={i * 80}>
            <span className="features-icon">{item.icon}</span>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
      <style>{`
        .features {
          padding: clamp(60px, 10vw, 100px) clamp(20px, 5vw, 48px);
          text-align: center;
          background: #fff;
        }
        .features-sub { color: #888; font-size: 14px; letter-spacing: 1px; margin: 0 0 8px; }
        .features-title { color: #1a1a1a; font-size: clamp(24px, 4vw, 36px); font-weight: 700; margin: 0 0 48px; text-transform: uppercase; }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .features-card {
          background: #fff;
          padding: 36px 28px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid #f0f0f0;
        }
        .features-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
        .features-icon { font-size: 48px; display: block; margin-bottom: 16px; color: #16a34a; }
        .features-card h3 { margin: 0; font-size: 18px; color: #333; font-weight: 600; }
        @media (max-width: 600px) { .features-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

export default Features;

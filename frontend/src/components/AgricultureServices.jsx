import React, { useEffect } from "react";
import AOS from "aos";

const AgricultureServices = ({ id }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    {
      title: "Soil Health Report",
      desc: "Use our AI-powered soil health report to help farmers make informed decisions about their soil health.",
      icon: "🌱",
    },
    {
      title: "Farmer's Marketplace",
      desc: "A marketplace for farmers to sell their products and services without the need of intermediaries.",
      icon: "🛒",
    },
    {
      title: "Local Weather Forecast",
      desc: "Get local weather forecasts to help farmers make informed decisions about their farming practices.",
      icon: "☁️",
    },
    {
      title: "Rent Farm Tools",
      desc: "Rent farm tools or get other farmer's tools on rent so they don't have to buy each and every equipment.",
      icon: "🚜",
    },
    {
      title: "Agriculture Info",
      desc: "Get information on the latest agricultural trends and strategies to help farmers make informed decisions.",
      icon: "ℹ️",
    },
    {
      title: "Community",
      desc: "Join our community of farmers who help each other make informed decisions about their farming practices.",
      icon: "🤝",
    },
  ];

  return (
    <section id={id} className="agri-services">
      <div className="agri-container">
        <div className="agri-header" data-aos="fade-up">
          <p className="agri-sub">Reasons to Choose Us</p>
          <h2 className="agri-title">WHAT WE ARE DOING</h2>
        </div>
        <div className="agri-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="agri-card"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="agri-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .agri-services {
          padding: clamp(60px, 10vw, 100px) clamp(20px, 5vw, 48px);
          background: #fafafa;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .agri-container { max-width: 1140px; margin: 0 auto; }
        .agri-header { text-align: center; margin-bottom: 48px; }
        .agri-sub { font-size: 14px; color: #888; letter-spacing: 1px; margin: 0 0 8px; }
        .agri-title { font-size: clamp(24px, 4vw, 34px); font-weight: 700; color: #1a1a1a; margin: 0; text-transform: uppercase; }
        .agri-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 28px;
        }
        .agri-card {
          background: #fff;
          padding: 36px 28px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid #f0f0f0;
        }
        .agri-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
        .agri-icon { font-size: 48px; margin-bottom: 16px; color: #16a34a; }
        .agri-card h3 { margin: 0 0 12px; font-size: 20px; font-weight: 600; color: #333; }
        .agri-card p { margin: 0; font-size: 15px; color: #666; line-height: 1.6; }
        @media (max-width: 640px) { .agri-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

export default AgricultureServices;

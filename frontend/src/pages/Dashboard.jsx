import { useEffect, useState } from "react";
import AOS from "aos";
import api from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const fetchWeather = (city) => {
    if (!city) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0661d30203b01b344698837a772ee6af`
    )
      .then((res) => res.json())
      .then((weatherData) => setWeather(weatherData))
      .catch(() => setWeather(null));
  };

  useEffect(() => {
    api.get("/user/dashboard").then((res) => {
      setData(res.data);
      const userLocation = res.data.user.location || "Delhi";
      setLocation(userLocation);
      fetchWeather(userLocation);
    });
  }, []);

  if (!data)
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner" />
        <p>Loading...</p>
        <style>{`
          .dashboard-loading { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; color: #16a34a; }
          .dashboard-spinner { width: 48px; height: 48px; border: 4px solid #e2e8f0; border-top-color: #16a34a; border-radius: 50%; animation: spin 1s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );

  return (
    <div className="dashboard">
      <header className="dashboard-header" data-aos="fade-down">
        <h1>Welcome, {data.user.name}</h1>
        <p>Manage your farm tasks and stay updated with weather</p>
      </header>

      <div className="dashboard-stats" data-aos="fade-up">
        <div className="stat-card">
          <span className="stat-icon">📋</span>
          <h3>Total Tasks</h3>
          <p>{data.stats.total}</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <h3>Completed</h3>
          <p>{data.stats.completed}</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⏳</span>
          <h3>Pending</h3>
          <p>{data.stats.pending}</p>
        </div>
      </div>

      <div className="dashboard-actions" data-aos="fade-up">
        <Link to="/tasks" className="dashboard-btn">Manage Tasks</Link>
      </div>

      <section className="dashboard-weather" data-aos="fade-up">
        <h2>🌤 Weather Details</h2>
        <div className="weather-search">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
          <button onClick={() => fetchWeather(location)}>Search</button>
        </div>
        {weather && weather.main ? (
          <div className="weather-grid">
            <div className="weather-item">
              <span className="weather-label">Temperature</span>
              <span className="weather-value">{weather.main.temp}°C</span>
            </div>
            <div className="weather-item">
              <span className="weather-label">Humidity</span>
              <span className="weather-value">{weather.main.humidity}%</span>
            </div>
            <div className="weather-item">
              <span className="weather-label">Feels Like</span>
              <span className="weather-value">{weather.main.feels_like}°C</span>
            </div>
            <div className="weather-item">
              <span className="weather-label">Condition</span>
              <span className="weather-value">{weather.weather?.[0]?.description || "—"}</span>
            </div>
          </div>
        ) : (
          <p className="weather-loading">Enter a city to fetch weather.</p>
        )}
      </section>

      <div className="dashboard-cost" data-aos="fade-up">
        <h3>Total Estimated Cost</h3>
        <p>₹{data.finance.totalEstimatedCost.toLocaleString()}</p>
      </div>

      <style>{`
        .dashboard {
          min-height: 100vh;
          padding: clamp(24px, 5vw, 40px) clamp(20px, 4vw, 32px);
          background: linear-gradient(135deg, #064e3b 0%, #022c22 100%);
          color: #fff;
        }
        .dashboard-header { text-align: center; margin-bottom: 32px; }
        .dashboard-header h1 { font-size: clamp(24px, 5vw, 32px); margin: 0 0 8px; }
        .dashboard-header p { margin: 0; opacity: 0.9; font-size: 15px; }
        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 28px;
        }
        .stat-card {
          background: rgba(255,255,255,0.08);
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          transition: transform 0.3s;
        }
        .stat-card:hover { transform: translateY(-4px); }
        .stat-icon { font-size: 36px; display: block; margin-bottom: 12px; }
        .stat-card h3 { margin: 0 0 8px; font-size: 14px; opacity: 0.9; }
        .stat-card p { margin: 0; font-size: 28px; font-weight: 700; color: #86efac; }
        .dashboard-actions { margin-bottom: 28px; }
        .dashboard-btn {
          display: inline-block;
          padding: 14px 28px;
          background: #16a34a;
          color: #fff;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: background 0.2s;
        }
        .dashboard-btn:hover { background: #15803d; }
        .dashboard-weather {
          background: rgba(255,255,255,0.06);
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .dashboard-weather h2 { margin: 0 0 16px; font-size: 18px; }
        .weather-search { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
        .weather-search input {
          flex: 1;
          min-width: 180px;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          color: #fff;
          outline: none;
        }
        .weather-search input::placeholder { color: rgba(255,255,255,0.5); }
        .weather-search button {
          padding: 12px 20px;
          border-radius: 8px;
          border: none;
          background: #16a34a;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }
        .weather-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
        }
        .weather-item {
          background: rgba(0,0,0,0.2);
          padding: 16px;
          border-radius: 10px;
        }
        .weather-label { display: block; font-size: 12px; opacity: 0.8; margin-bottom: 4px; }
        .weather-value { font-size: 18px; font-weight: 700; color: #86efac; }
        .weather-loading { margin: 0; opacity: 0.8; }
        .dashboard-cost {
          background: rgba(134, 239, 172, 0.15);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(134, 239, 172, 0.2);
        }
        .dashboard-cost h3 { margin: 0 0 8px; font-size: 16px; opacity: 0.9; }
        .dashboard-cost p { margin: 0; font-size: 28px; font-weight: 800; color: #86efac; }
        @media (max-width: 600px) {
          .dashboard-stats { grid-template-columns: 1fr; }
          .weather-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;

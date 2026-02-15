import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Blog from "../components/Blog";

import TotalEstimateCost from "../components/TotalEstimateCost";


function Dashboard() {
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");

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

  if (!data) return <div style={styles.loading}>Loading...</div>;

  return (


    <>
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Welcome, {data.user.name}</h2>

      {/* Stats Section */}
      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <h3>Total Tasks</h3>
          <p>{data.stats.total}</p>
        </div>

        <div style={styles.card}>
          <h3>Completed</h3>
          <p>{data.stats.completed}</p>
        </div>

        <div style={styles.card}>
          <h3>Pending</h3>
          <p>{data.stats.pending}</p>
        </div>
      </div>

      <Link to="/tasks" style={styles.button}>
        Manage Tasks
      </Link>

      {/* Weather Section */}
      <div style={styles.weatherBox}>
        <h3>🌤 Weather Details</h3>

        <div style={styles.weatherInputBox}>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            style={styles.input}
          />
          <button
            style={styles.searchBtn}
            onClick={() => fetchWeather(location)}
          >
            Search
          </button>
        </div>

        {weather && weather.main ? (
          <div style={styles.weatherDetails}>
            <div style={styles.weatherItem}>
              🌡 Temp: {weather.main.temp}°C
            </div>
            <div style={styles.weatherItem}>
              💧 Humidity: {weather.main.humidity}%
            </div>
            <div style={styles.weatherItem}>
              🤒 Feels Like: {weather.main.feels_like}°C
            </div>
            <div style={styles.weatherItem}>
              🌥 {weather.weather[0].description}
            </div>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>


    <TotalEstimateCost amount={data.finance.totalEstimatedCost} />

    
      
    </div>


    <Blog />

    </>

    
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "30px 20px",
    background: "linear-gradient(135deg, #064e3b, #022c22)",
    color: "#ffffff"
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px"
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  card: {
    background: "#065f46",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center"
  },
  button: {
    display: "inline-block",
    padding: "12px 20px",
    backgroundColor: "#facc15",
    color: "#000",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    marginBottom: "30px"
  },
  weatherBox: {
    background: "#134e4a",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px"
  },
  weatherInputBox: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "15px"
  },
  input: {
    flex: "1 1 200px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  },
  searchBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  },
  weatherDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginTop: "15px"
  },
  weatherItem: {
    background: "#065f46",
    padding: "15px",
    borderRadius: "10px"
  },
  blogSection: {
    marginTop: "20px"
  },
  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  blogCard: {
    background: "#065f46",
    padding: "20px",
    borderRadius: "12px"
  },
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default Dashboard;

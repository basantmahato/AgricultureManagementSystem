import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Logo Section */}
        <div style={styles.logoBox}>
          <div style={styles.logoCircle}>🌾</div>
          <h1 style={styles.logoText}>AgroTask</h1>
        </div>

        <h2 style={styles.title}>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          required
          style={styles.input}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          style={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          style={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          required
          style={styles.input}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>

        {/* Login Redirect Link */}
        <div style={styles.redirectBox}>
          <span style={styles.redirectText}>
            Already have an account?
          </span>
          <Link to="/login" style={styles.link}>
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #064e3b, #022c22)",
    padding: "20px"
  },
  form: {
    width: "100%",
    maxWidth: "440px",
    background: "#ffffff",
    padding: "40px 30px",
    borderRadius: "16px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },
  logoBox: {
    textAlign: "center",
    marginBottom: "10px"
  },
  logoCircle: {
    fontSize: "42px",
    marginBottom: "5px"
  },
  logoText: {
    margin: 0,
    color: "#064e3b"
  },
  title: {
    textAlign: "center",
    color: "#065f46",
    marginBottom: "10px"
  },
  input: {
    padding: "12px 14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #86efac",
    outline: "none"
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600"
  },
  redirectBox: {
    marginTop: "10px",
    textAlign: "center",
    fontSize: "14px"
  },
  redirectText: {
    color: "#475569",
    marginRight: "6px"
  },
  link: {
    color: "#16a34a",
    fontWeight: "600",
    textDecoration: "none"
  }
};

export default Register;

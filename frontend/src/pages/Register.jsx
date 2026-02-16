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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <span className="register-logo">🌱</span>
          <h1>agroFarm</h1>
          <h2>Create Account</h2>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="register-error">{error}</div>}
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <style>{`
        .register-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }
        .register-card {
          width: 100%;
          max-width: 440px;
          background: #fff;
          padding: 40px 36px;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
          border: 1px solid #e5e7eb;
        }
        .register-header { text-align: center; margin-bottom: 28px; }
        .register-logo { font-size: 48px; display: block; margin-bottom: 12px; }
        .register-header h1 { font-size: 20px; color: #16a34a; margin: 0 0 8px; font-weight: 700; }
        .register-header h2 { font-size: 22px; color: #1f2937; margin: 0; font-weight: 600; }
        .register-form { display: flex; flex-direction: column; gap: 16px; }
        .register-error { padding: 12px; background: #fee2e2; color: #dc2626; border-radius: 8px; font-size: 14px; }
        .register-form input {
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          font-size: 16px;
          outline: none;
          transition: border-color 0.2s;
        }
        .register-form input:focus { border-color: #16a34a; }
        .register-form button {
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: #16a34a;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .register-form button:hover:not(:disabled) { background: #15803d; }
        .register-form button:disabled { opacity: 0.7; cursor: not-allowed; }
        .register-footer { margin-top: 20px; text-align: center; font-size: 14px; color: #64748b; }
        .register-footer a { color: #16a34a; font-weight: 600; text-decoration: none; }
        .register-footer a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}

export default Register;

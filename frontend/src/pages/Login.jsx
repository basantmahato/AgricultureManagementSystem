import { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      const userRole = res.data.user?.role;
      const from = location.state?.from;
      
      if (userRole === "admin") {
        navigate("/admin", { replace: true });
      } else if (from) {
        navigate(from, { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-logo">🌱</span>
          <h1>agroFarm</h1>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
      <style>{`
        .login-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          background: #fff;
          padding: 40px 36px;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
          border: 1px solid #e5e7eb;
        }
        .login-header { text-align: center; margin-bottom: 28px; }
        .login-logo { font-size: 48px; display: block; margin-bottom: 12px; }
        .login-header h1 { font-size: 20px; color: #16a34a; margin: 0 0 8px; font-weight: 700; }
        .login-header h2 { font-size: 22px; color: #1f2937; margin: 0; font-weight: 600; }
        .login-form { display: flex; flex-direction: column; gap: 16px; }
        .login-error { padding: 12px; background: #fee2e2; color: #dc2626; border-radius: 8px; font-size: 14px; }
        .login-form input {
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          font-size: 16px;
          outline: none;
          transition: border-color 0.2s;
        }
        .login-form input:focus { border-color: #16a34a; }
        .login-form button {
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
        .login-form button:hover:not(:disabled) { background: #15803d; }
        .login-form button:disabled { opacity: 0.7; cursor: not-allowed; }
        .login-footer { margin-top: 20px; text-align: center; font-size: 14px; color: #64748b; }
        .login-footer a { color: #16a34a; font-weight: 600; text-decoration: none; }
        .login-footer a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}

export default Login;

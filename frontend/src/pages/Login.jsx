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
    <div className="page-shell page-shell--center">
      <div className="card">
        <div className="auth-header">
          <span className="auth-logo">🌱</span>
          <h1 className="auth-brand">agroFarm</h1>
          <h2 className="auth-title">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="form-stack">
          {error && <div className="alert-error">{error}</div>}
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/register" className="link-primary">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

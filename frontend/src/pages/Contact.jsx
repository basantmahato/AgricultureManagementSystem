import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Send } from "lucide-react";
import api from "../services/api";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      if (res.data?.message) {
        /* ack shown in UI */
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not send your message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="container contact-page">
        <header className="contact-hero">
          <span className="contact-hero-icon" aria-hidden>
            <Mail size={28} strokeWidth={2} />
          </span>
          <h1>Contact us</h1>
          <p>
            Questions about equipment, soil testing, or your account? Send us a note—we reply within a few business
            days.
          </p>
        </header>

        {success ? (
          <div className="card card--panel contact-card contact-card--success" role="status">
            <h2 className="contact-success-title">Message sent</h2>
            <p className="contact-success-text">
              Thanks—we received your message and will get back to you soon. You can also reach us at{" "}
              <a href="mailto:support@agrofarm.com" className="link-primary">
                support@agrofarm.com
              </a>
              .
            </p>
            <button type="button" className="btn btn-primary contact-send-another" onClick={() => setSuccess(false)}>
              Send another message
            </button>
          </div>
        ) : (
          <form className="card card--panel contact-card form-stack" onSubmit={handleSubmit} noValidate>
            {error && <div className="alert-error">{error}</div>}
            <label className="contact-label">
              <span>Name</span>
              <input
                className="input"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="contact-label">
              <span>Email</span>
              <input
                className="input"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label className="contact-label">
              <span>Subject <span className="contact-optional">(optional)</span></span>
              <input
                className="input"
                name="subject"
                type="text"
                placeholder="e.g. Order question, soil test"
                value={form.subject}
                onChange={handleChange}
              />
            </label>
            <label className="contact-label">
              <span>Message</span>
              <textarea
                className="input contact-textarea"
                name="message"
                rows={6}
                placeholder="How can we help?"
                value={form.message}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="btn btn-primary contact-submit" disabled={loading}>
              {loading ? (
                "Sending…"
              ) : (
                <>
                  <Send size={18} strokeWidth={2} aria-hidden />
                  Send message
                </>
              )}
            </button>
          </form>
        )}

        <p className="contact-back">
          <Link to="/" className="link-primary">
            ← Back to home
          </Link>
        </p>
      </div>

      <style>{`
        .contact-page {
          max-width: 40rem;
          margin: 0 auto;
        }
        .contact-hero {
          text-align: center;
          margin-bottom: clamp(24px, 4vw, 36px);
        }
        .contact-hero-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: var(--radius-xl);
          background: rgba(22, 163, 74, 0.12);
          color: var(--color-primary);
          margin-bottom: 16px;
        }
        .contact-hero h1 {
          font-family: var(--font-heading);
          color: var(--color-accent);
          font-size: clamp(1.5rem, 4vw, 2rem);
          margin: 0 0 10px;
          font-weight: 700;
        }
        .contact-hero p {
          margin: 0;
          color: var(--color-text-muted);
          font-size: 1.0625rem;
          line-height: 1.6;
          font-family: var(--font-body);
        }
        .contact-card {
          border: 1px solid var(--color-border);
        }
        .contact-card--success {
          text-align: center;
        }
        .contact-success-title {
          margin: 0 0 12px;
          font-size: var(--text-h3);
          color: var(--color-accent);
        }
        .contact-success-text {
          margin: 0 0 20px;
          color: var(--color-text-muted);
          line-height: 1.6;
          font-size: 15px;
        }
        .contact-send-another {
          display: inline-flex;
        }
        .contact-label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
        }
        .contact-label span {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text);
        }
        .contact-optional {
          font-weight: 500;
          color: var(--color-text-muted);
        }
        .contact-textarea {
          resize: vertical;
          min-height: 140px;
          line-height: 1.5;
        }
        .contact-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
        }
        .contact-back {
          text-align: center;
          margin: clamp(20px, 4vw, 28px) 0 0;
          font-size: 15px;
        }
      `}</style>
    </div>
  );
}

export default Contact;

import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sprout,
  CheckCircle2,
  FlaskConical,
  Droplets,
  Wind,
  Sparkles,
  Zap,
  Upload,
  Layers,
  Leaf,
  Building2,
  MapPin,
  Phone,
  ClipboardList,
  CircleDot
} from "lucide-react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const SOIL_TYPES = ["Loam", "Clay", "Sandy", "Silt", "Peat", "Chalk", "Other"];
const TESTING_CENTERS = ["Center A - Main Lab", "Center B - North", "Center C - South", "Center D - East", "Center E - West"];

const TEST_OPTIONS = [
  { key: "pH", label: "pH", Icon: Droplets },
  { key: "nitrogen", label: "Nitrogen", Icon: Wind },
  { key: "phosphorus", label: "Phosphorus", Icon: Sparkles },
  { key: "potassium", label: "Potassium", Icon: Zap }
];

function KnowYourSoil() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    soilType: "",
    cropDescription: "",
    testingCenter: "",
    location: "",
    mobile: "",
    pH: false,
    nitrogen: false,
    phosphorus: false,
    potassium: false
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []).slice(0, 5);
    setFiles(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []).filter((f) => f.type.startsWith("image/")).slice(0, 5);
    setFiles((prev) => [...prev, ...dropped].slice(0, 5));
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: "/know-your-soil" } });
      return;
    }
    setLoading(true);
    setSubmitted(false);
    try {
      const fd = new FormData();
      fd.append("soilType", form.soilType);
      fd.append("cropDescription", form.cropDescription);
      fd.append("testingCenter", form.testingCenter);
      fd.append("location", form.location);
      fd.append("mobile", form.mobile);
      fd.append("pH", form.pH);
      fd.append("nitrogen", form.nitrogen);
      fd.append("phosphorus", form.phosphorus);
      fd.append("potassium", form.potassium);
      files.forEach((f) => fd.append("soilPhotos", f));

      await api.post("/soil", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSubmitted(true);
      setForm({
        soilType: "",
        cropDescription: "",
        testingCenter: "",
        location: "",
        mobile: "",
        pH: false,
        nitrogen: false,
        phosphorus: false,
        potassium: false
      });
      setFiles([]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="knowsoil-page">
      <div className="knowsoil-shell">
        <header className="knowsoil-hero">
          <div className="knowsoil-hero-badge" aria-hidden>
            <Sprout size={28} strokeWidth={2} />
          </div>
          <h1 className="knowsoil-hero-title">Soil health testing</h1>
          <p className="knowsoil-hero-lead">
            Book a lab slot, choose analyses, and add photos so we can match recommendations to your field.
          </p>
          <ul className="knowsoil-hero-points">
            <li>
              <FlaskConical size={18} strokeWidth={2} aria-hidden />
              <span>NPK &amp; pH panels</span>
            </li>
            <li>
              <Upload size={18} strokeWidth={2} aria-hidden />
              <span>Up to 5 site photos</span>
            </li>
            <li>
              <Building2 size={18} strokeWidth={2} aria-hidden />
              <span>Pick a testing center</span>
            </li>
          </ul>
        </header>

        <div className="knowsoil-card">
          {submitted && (
            <div className="knowsoil-success" role="status">
              <CheckCircle2 size={22} strokeWidth={2} aria-hidden />
              <span>Booking submitted successfully.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="knowsoil-form">
            <section className="knowsoil-section">
              <div className="knowsoil-section-head">
                <span className="knowsoil-section-icon" aria-hidden>
                  <FlaskConical size={20} strokeWidth={2} />
                </span>
                <h2 className="knowsoil-section-title">Tests to run</h2>
              </div>
              <p className="knowsoil-section-hint">Select any combination your advisor recommended.</p>
              <div className="knowsoil-checkgrid">
                {TEST_OPTIONS.map(({ key, label, Icon }) => (
                  <label key={key} className={`knowsoil-checkbox-card ${form[key] ? "knowsoil-checkbox-card--on" : ""}`}>
                    <input type="checkbox" name={key} checked={form[key]} onChange={handleChange} />
                    <span className="knowsoil-checkbox-card-icon" aria-hidden>
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <span className="knowsoil-checkbox-card-label">{label}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="knowsoil-section">
              <div className="knowsoil-section-head">
                <span className="knowsoil-section-icon" aria-hidden>
                  <Upload size={20} strokeWidth={2} />
                </span>
                <h2 className="knowsoil-section-title">Soil photos</h2>
              </div>
              <div
                className="knowsoil-upload"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  multiple
                  onChange={handleFileChange}
                  hidden
                />
                <div className="knowsoil-upload-icon-wrap" aria-hidden>
                  <Upload size={32} strokeWidth={1.75} />
                </div>
                <p className="knowsoil-upload-title">Drop images here or click to browse</p>
                <p className="knowsoil-upload-hint">PNG, JPG or GIF · up to 5 files</p>
                {files.length > 0 && (
                  <p className="knowsoil-upload-files">
                    <CircleDot size={14} strokeWidth={2.5} className="knowsoil-dot" aria-hidden />
                    {files.length} file{files.length !== 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
            </section>

            <section className="knowsoil-section knowsoil-section--split">
              <div className="knowsoil-field-block">
                <div className="knowsoil-section-head">
                  <span className="knowsoil-section-icon" aria-hidden>
                    <Layers size={20} strokeWidth={2} />
                  </span>
                  <h2 className="knowsoil-section-title">Soil type</h2>
                </div>
                <select name="soilType" value={form.soilType} onChange={handleChange} required className="knowsoil-input">
                  <option value="">Select soil type</option>
                  {SOIL_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="knowsoil-field-block">
                <div className="knowsoil-section-head">
                  <span className="knowsoil-section-icon" aria-hidden>
                    <Building2 size={20} strokeWidth={2} />
                  </span>
                  <h2 className="knowsoil-section-title">Testing center</h2>
                </div>
                <select
                  name="testingCenter"
                  value={form.testingCenter}
                  onChange={handleChange}
                  required
                  className="knowsoil-input"
                >
                  <option value="">Select a center</option>
                  {TESTING_CENTERS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section className="knowsoil-section">
              <div className="knowsoil-section-head">
                <span className="knowsoil-section-icon" aria-hidden>
                  <Leaf size={20} strokeWidth={2} />
                </span>
                <h2 className="knowsoil-section-title">Crops &amp; rotation</h2>
              </div>
              <textarea
                name="cropDescription"
                value={form.cropDescription}
                onChange={handleChange}
                placeholder="E.g. wheat–gram rotation, vegetables under drip…"
                className="knowsoil-textarea"
                rows={4}
              />
            </section>

            <section className="knowsoil-section">
              <div className="knowsoil-section-head">
                <span className="knowsoil-section-icon" aria-hidden>
                  <MapPin size={20} strokeWidth={2} />
                </span>
                <h2 className="knowsoil-section-title">Location &amp; phone</h2>
              </div>
              <div className="knowsoil-input-row">
                <div className="knowsoil-input-affix">
                  <MapPin size={18} strokeWidth={2} aria-hidden />
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Village, district, or GPS pin"
                    required
                    className="knowsoil-input knowsoil-input--with-icon"
                  />
                </div>
                <div className="knowsoil-input-affix">
                  <Phone size={18} strokeWidth={2} aria-hidden />
                  <input
                    name="mobile"
                    type="tel"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    required
                    className="knowsoil-input knowsoil-input--with-icon"
                  />
                </div>
              </div>
            </section>

            {!user && (
              <div className="knowsoil-login-hint">
                <CircleDot size={16} strokeWidth={2.5} className="knowsoil-hint-dot" aria-hidden />
                <span>Sign in to submit a booking—we’ll take you back here after login.</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="knowsoil-submit">
              {loading ? "Submitting…" : "Submit booking"}
            </button>
          </form>
        </div>

        {user && (
          <section className="knowsoil-dash-bridge" aria-labelledby="knowsoil-dash-bridge-title">
            <span className="knowsoil-section-icon knowsoil-section-icon--muted" aria-hidden>
              <ClipboardList size={20} strokeWidth={2} />
            </span>
            <div className="knowsoil-dash-bridge-text">
              <h2 id="knowsoil-dash-bridge-title" className="knowsoil-dash-bridge-title">
                Track your soil bookings
              </h2>
              <p className="knowsoil-dash-bridge-lead">
                Status, test selections, photos, and lab notes are on your farm dashboard.
              </p>
              <Link to="/dashboard?view=soil" className="knowsoil-dash-bridge-btn">
                Open soil bookings
              </Link>
            </div>
          </section>
        )}
      </div>

      <style>{`
        .knowsoil-page {
          min-height: 100vh;
          padding: clamp(28px, 6vw, 56px) var(--container-pad-x, 20px);
          background: linear-gradient(165deg, var(--color-primary-muted) 0%, #ecfdf5 38%, #f8fafc 100%);
        }
        .knowsoil-shell {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 4vw, 32px);
        }
        .knowsoil-hero {
          text-align: center;
          padding: clamp(20px, 4vw, 28px) clamp(16px, 4vw, 24px) 0;
        }
        .knowsoil-hero-badge {
          width: 56px;
          height: 56px;
          margin: 0 auto 16px;
          border-radius: 16px;
          background: linear-gradient(145deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 28px rgba(22, 163, 74, 0.28);
        }
        .knowsoil-hero-title {
          font-family: var(--font-heading);
          color: var(--color-accent);
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
          line-height: 1.2;
        }
        .knowsoil-hero-lead {
          font-family: var(--font-body);
          color: var(--color-text-muted);
          font-size: 1.0625rem;
          line-height: 1.6;
          max-width: 36rem;
          margin: 0 auto 22px;
        }
        .knowsoil-hero-points {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px 20px;
          margin: 0;
          padding: 0;
        }
        .knowsoil-hero-points li {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text);
          box-shadow: var(--shadow-sm);
        }
        .knowsoil-hero-points li svg {
          color: var(--color-primary);
          flex-shrink: 0;
        }
        .knowsoil-card {
          background: var(--color-surface);
          border-radius: var(--radius-2xl);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-lg);
          padding: clamp(24px, 5vw, 36px);
        }
        .knowsoil-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 16px;
          background: var(--color-primary-muted);
          border: 1px solid #bbf7d0;
          color: var(--color-primary-hover);
          border-radius: var(--radius-lg);
          margin-bottom: 28px;
          font-weight: 600;
          font-size: 15px;
          font-family: var(--font-body);
        }
        .knowsoil-success svg {
          flex-shrink: 0;
        }
        .knowsoil-form {
          display: flex;
          flex-direction: column;
          gap: clamp(28px, 5vw, 36px);
        }
        .knowsoil-section-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .knowsoil-section-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: var(--color-primary-muted);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .knowsoil-section-icon--muted {
          background: var(--color-surface-subtle);
          color: var(--color-accent);
        }
        .knowsoil-section-title {
          font-family: var(--font-heading);
          color: var(--color-accent);
          font-size: 1.0625rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .knowsoil-section-hint {
          margin: 0 0 14px;
          font-size: 14px;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
        .knowsoil-section--split {
          display: grid;
          gap: 24px;
        }
        @media (min-width: 560px) {
          .knowsoil-section--split {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }
        .knowsoil-field-block .knowsoil-section-head {
          margin-bottom: 10px;
        }
        .knowsoil-checkgrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (max-width: 520px) {
          .knowsoil-checkgrid {
            grid-template-columns: 1fr;
          }
        }
        .knowsoil-checkbox-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: var(--radius-lg);
          border: 2px solid var(--color-border);
          background: var(--color-surface-subtle);
          cursor: pointer;
          font-family: var(--font-body);
          font-weight: 600;
          color: var(--color-text);
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .knowsoil-checkbox-card:hover {
          border-color: #86efac;
          background: var(--color-primary-muted);
        }
        .knowsoil-checkbox-card--on {
          border-color: var(--color-primary);
          background: var(--color-primary-muted);
          box-shadow: 0 0 0 1px rgba(22, 163, 74, 0.2);
        }
        .knowsoil-checkbox-card input {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
          opacity: 0;
        }
        .knowsoil-checkbox-card:has(input:focus-visible) {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
        .knowsoil-checkbox-card-icon {
          color: var(--color-primary);
          display: flex;
          flex-shrink: 0;
        }
        .knowsoil-checkbox-card-label {
          font-size: 15px;
        }
        .knowsoil-upload {
          border: 2px dashed #86efac;
          border-radius: var(--radius-xl);
          padding: 28px 20px;
          text-align: center;
          background: linear-gradient(180deg, var(--color-primary-muted) 0%, var(--color-surface-subtle) 100%);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .knowsoil-upload:hover,
        .knowsoil-upload:focus-visible {
          outline: none;
          border-color: var(--color-primary);
          background: var(--color-primary-muted);
        }
        .knowsoil-upload-icon-wrap {
          width: 56px;
          height: 56px;
          margin: 0 auto 14px;
          border-radius: 14px;
          background: var(--color-surface);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }
        .knowsoil-upload-title {
          margin: 0 0 8px;
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text);
          font-family: var(--font-body);
        }
        .knowsoil-upload-hint {
          margin: 0;
          font-size: 13px;
          color: var(--color-text-muted);
        }
        .knowsoil-upload-files {
          margin: 14px 0 0;
          font-size: 14px;
          font-weight: 600;
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .knowsoil-dot {
          color: var(--color-primary);
          opacity: 0.85;
        }
        .knowsoil-input,
        .knowsoil-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--color-border-input);
          border-radius: var(--radius-lg);
          font-size: 15px;
          font-family: var(--font-body);
          outline: none;
          background: var(--color-surface-subtle);
          transition: border-color 0.2s, background 0.2s;
        }
        .knowsoil-input:focus,
        .knowsoil-textarea:focus {
          border-color: var(--color-primary);
          background: var(--color-surface);
        }
        .knowsoil-textarea {
          resize: vertical;
          min-height: 112px;
          line-height: 1.55;
        }
        .knowsoil-input-row {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .knowsoil-input-affix {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 4px 4px 4px 14px;
          border: 1px solid var(--color-border-input);
          border-radius: var(--radius-lg);
          background: var(--color-surface-subtle);
          transition: border-color 0.2s, background 0.2s;
        }
        .knowsoil-input-affix:focus-within {
          border-color: var(--color-primary);
          background: var(--color-surface);
        }
        .knowsoil-input-affix svg {
          flex-shrink: 0;
          color: var(--color-primary);
        }
        .knowsoil-input--with-icon {
          border: none;
          background: transparent;
          padding: 12px 12px 12px 0;
          flex: 1;
        }
        .knowsoil-input--with-icon:focus {
          outline: none;
        }
        .knowsoil-submit {
          min-height: 48px;
          padding: 14px 24px;
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: var(--radius-lg);
          font-size: 16px;
          font-weight: 700;
          font-family: var(--font-body);
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .knowsoil-submit:hover:not(:disabled) {
          background: var(--color-primary-hover);
          transform: translateY(-1px);
        }
        .knowsoil-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .knowsoil-login-hint {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          color: #b45309;
          background: #fffbeb;
          border: 1px solid #fde68a;
          padding: 14px 16px;
          border-radius: var(--radius-lg);
          font-family: var(--font-body);
        }
        .knowsoil-hint-dot {
          color: #d97706;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .knowsoil-dash-bridge {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background: var(--color-surface);
          border-radius: var(--radius-2xl);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          padding: clamp(20px, 4vw, 28px);
        }
        .knowsoil-dash-bridge .knowsoil-section-icon--muted {
          margin-top: 4px;
        }
        .knowsoil-dash-bridge-text { flex: 1; min-width: 0; }
        .knowsoil-dash-bridge-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-accent);
          margin: 0 0 8px;
        }
        .knowsoil-dash-bridge-lead {
          margin: 0 0 16px;
          font-size: 14px;
          line-height: 1.5;
          color: var(--color-text-muted);
          font-family: var(--font-body);
        }
        .knowsoil-dash-bridge-btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 20px;
          border-radius: var(--radius-lg);
          background: var(--color-primary);
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          font-family: var(--font-body);
        }
        .knowsoil-dash-bridge-btn:hover {
          filter: brightness(1.06);
        }
      `}</style>
    </div>
  );
}

export default KnowYourSoil;

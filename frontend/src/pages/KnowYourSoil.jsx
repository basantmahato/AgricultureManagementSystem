import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const SOIL_TYPES = ["Loam", "Clay", "Sandy", "Silt", "Peat", "Chalk", "Other"];
const TESTING_CENTERS = ["Center A - Main Lab", "Center B - North", "Center C - South", "Center D - East", "Center E - West"];

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
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (user) {
      api.get("/soil").then((res) => setBookings(res.data)).catch(() => {});
    } else {
      setBookings([]);
    }
  }, [submitted, user]);

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
      if (user) api.get("/soil").then((res) => setBookings(res.data));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (s) => s === "completed" ? "completed" : s === "in-progress" ? "inprogress" : "pending";

  return (
    <div className="knowsoil-page">
      <div className="knowsoil-container">
        <header className="knowsoil-header" data-aos="fade-down">
          <span className="knowsoil-icon">🌱</span>
          <h1>Book a Soil Health Test</h1>
          <p>Submit your soil details for testing</p>
        </header>

        {submitted && (
          <div className="knowsoil-success" data-aos="fade-up">
            ✓ Booking submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="knowsoil-form">
          <section className="knowsoil-section" data-aos="fade-up">
            <h2 className="knowsoil-section-title">Select Soil Tests</h2>
            <div className="knowsoil-checkgrid">
              {["pH", "nitrogen", "phosphorus", "potassium"].map((k) => (
                <label key={k} className="knowsoil-checkbox-wrap">
                  <input type="checkbox" name={k} checked={form[k]} onChange={handleChange} />
                  <span>{k.charAt(0).toUpperCase() + k.slice(1)}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="knowsoil-section" data-aos="fade-up">
            <h2 className="knowsoil-section-title">Upload Soil Photos</h2>
            <div
              className="knowsoil-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileRef.current?.click()}
            >
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/jpg,image/gif" multiple onChange={handleFileChange} hidden />
              <span className="knowsoil-upload-icon">↑</span>
              <p>Click to upload or drag and drop</p>
              <p className="knowsoil-upload-hint">PNG, JPG or GIF (MAX. 800x400px)</p>
              {files.length > 0 && <p className="knowsoil-upload-files">{files.length} file(s) selected</p>}
            </div>
          </section>

          <section className="knowsoil-section" data-aos="fade-up">
            <h2 className="knowsoil-section-title">Soil Information</h2>
            <select name="soilType" value={form.soilType} onChange={handleChange} required className="knowsoil-input">
              <option value="">Select soil type</option>
              {SOIL_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </section>

          <section className="knowsoil-section" data-aos="fade-up">
            <h2 className="knowsoil-section-title">Crop Information</h2>
            <textarea
              name="cropDescription"
              value={form.cropDescription}
              onChange={handleChange}
              placeholder="Describe the crops you are growing"
              className="knowsoil-textarea"
              rows="4"
            />
          </section>

          <section className="knowsoil-section" data-aos="fade-up">
            <h2 className="knowsoil-section-title">Select Nearest Soil Testing Center</h2>
            <select name="testingCenter" value={form.testingCenter} onChange={handleChange} required className="knowsoil-input">
              <option value="">Select a center</option>
              {TESTING_CENTERS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </section>

          <section className="knowsoil-section" data-aos="fade-up">
            <h2 className="knowsoil-section-title">Location & Contact</h2>
            <div className="knowsoil-input-wrap">
              <span className="knowsoil-input-icon">📍</span>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
                className="knowsoil-input"
              />
            </div>
            <div className="knowsoil-input-wrap">
              <span className="knowsoil-input-icon">📞</span>
              <input
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Your mobile number"
                required
                className="knowsoil-input"
              />
            </div>
          </section>

          {!user && (
            <p className="knowsoil-login-hint">You need to log in to submit your booking.</p>
          )}

          <button type="submit" disabled={loading} className="knowsoil-submit">
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>

        {bookings.length > 0 && (
          <section className="knowsoil-status" data-aos="fade-up">
            <h2>My Soil Bookings</h2>
            <div className="knowsoil-status-list">
              {bookings.map((b) => (
                <div key={b._id} className="knowsoil-status-card">
                  <div className="knowsoil-status-row">
                    <strong>Soil:</strong> {b.soilType} | <strong>Center:</strong> {b.testingCenter}
                  </div>
                  <div className="knowsoil-status-row">
                    <strong>Location:</strong> {b.location} | <strong>Mobile:</strong> {b.mobile}
                  </div>
                  <div className="knowsoil-status-row">
                    <span className={`knowsoil-status-badge ${getStatusClass(b.status)}`}>{b.status}</span>
                    <span className="knowsoil-status-date">{new Date(b.createdAt).toLocaleDateString()}</span>
                  </div>
                  {b.adminNotes && <p className="knowsoil-admin-notes">Admin note: {b.adminNotes}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        .knowsoil-page {
          min-height: 100vh;
          padding: clamp(24px, 5vw, 48px) clamp(20px, 4vw, 32px);
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }
        .knowsoil-container {
          max-width: 640px;
          margin: 0 auto;
          background: #fff;
          padding: clamp(28px, 6vw, 48px);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
          border: 1px solid #e5e7eb;
        }
        .knowsoil-header { text-align: center; margin-bottom: 32px; }
        .knowsoil-icon { font-size: 48px; display: block; margin-bottom: 12px; }
        .knowsoil-header h1 { color: #065f46; font-size: clamp(22px, 4vw, 28px); margin: 0 0 8px; }
        .knowsoil-header p { color: #64748b; margin: 0; font-size: 15px; }
        .knowsoil-success {
          padding: 14px;
          background: #dcfce7;
          color: #16a34a;
          border-radius: 10px;
          margin-bottom: 24px;
          font-weight: 600;
          text-align: center;
        }
        .knowsoil-form { display: flex; flex-direction: column; gap: 28px; }
        .knowsoil-section-title {
          color: #065f46;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 14px;
          padding-bottom: 8px;
          border-bottom: 2px solid #16a34a;
        }
        .knowsoil-checkgrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .knowsoil-checkbox-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 500;
          color: #065f46;
        }
        .knowsoil-checkbox-wrap input { width: 18px; height: 18px; accent-color: #16a34a; }
        .knowsoil-upload {
          border: 2px dashed #86efac;
          border-radius: 12px;
          padding: 32px;
          text-align: center;
          background: #f0fdf4;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .knowsoil-upload:hover { border-color: #16a34a; background: #dcfce7; }
        .knowsoil-upload-icon { font-size: 36px; color: #16a34a; display: block; margin-bottom: 12px; }
        .knowsoil-upload p { margin: 0 0 6px; color: #334155; }
        .knowsoil-upload-hint { font-size: 13px; color: #64748b; }
        .knowsoil-upload-files { color: #16a34a; font-weight: 600; }
        .knowsoil-input, .knowsoil-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 15px;
          outline: none;
          background: #f8fafc;
          transition: border-color 0.2s;
        }
        .knowsoil-input:focus, .knowsoil-textarea:focus {
          border-color: #16a34a;
          background: #fff;
        }
        .knowsoil-textarea { resize: vertical; min-height: 100px; }
        .knowsoil-input-wrap {
          position: relative;
          margin-bottom: 14px;
        }
        .knowsoil-input-wrap:last-of-type { margin-bottom: 0; }
        .knowsoil-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 18px; color: #16a34a; }
        .knowsoil-input-wrap .knowsoil-input { padding-left: 44px; }
        .knowsoil-submit {
          padding: 16px;
          background: #16a34a;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .knowsoil-submit:hover:not(:disabled) { background: #15803d; }
        .knowsoil-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .knowsoil-login-hint { margin: 0 0 8px; font-size: 14px; color: #b45309; background: #fef3c7; padding: 12px; border-radius: 8px; }
        .knowsoil-status { margin-top: 40px; padding-top: 32px; border-top: 1px solid #e5e7eb; }
        .knowsoil-status h2 { color: #065f46; font-size: 20px; margin: 0 0 16px; }
        .knowsoil-status-list { display: flex; flex-direction: column; gap: 16px; }
        .knowsoil-status-card {
          padding: 16px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }
        .knowsoil-status-row { margin-bottom: 8px; font-size: 14px; color: #334155; }
        .knowsoil-status-row:last-of-type { margin-bottom: 0; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .knowsoil-status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .knowsoil-status-badge.pending { background: #fef3c7; color: #b45309; }
        .knowsoil-status-badge.inprogress { background: #dbeafe; color: #2563eb; }
        .knowsoil-status-badge.completed { background: #dcfce7; color: #16a34a; }
        .knowsoil-status-date { font-size: 13px; color: #64748b; }
        .knowsoil-admin-notes { margin: 10px 0 0; font-size: 13px; color: #475569; background: #fff; padding: 10px; border-radius: 8px; }
        @media (max-width: 500px) { .knowsoil-checkgrid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

export default KnowYourSoil;

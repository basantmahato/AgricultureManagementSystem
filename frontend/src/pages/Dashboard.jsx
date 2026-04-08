import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  LayoutDashboard,
  CloudSun,
  ListTodo,
  CheckCircle,
  Clock,
  IndianRupee,
  ShoppingCart,
  Package,
  Sprout
} from "lucide-react";
import api from "../services/api";
import DashboardShell from "../components/DashboardShell";

const SECTION_COPY = {
  overview: {
    title: "Overview",
    subtitle: "Your tasks, costs, and quick actions"
  },
  weather: {
    title: "Weather",
    subtitle: "Forecast and conditions for your farm"
  },
  orders: {
    title: "My orders",
    subtitle: "Equipment purchases and delivery status"
  },
  soil: {
    title: "Soil test bookings",
    subtitle: "Soil health requests, status, and lab updates"
  }
};

const STATUS_LABEL = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered"
};

function formatOrderStatus(status) {
  return STATUS_LABEL[status] || status || "—";
}

function formatDateTime(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  } catch {
    return "—";
  }
}

function lineEquipmentId(line) {
  if (!line?.equipment) return null;
  if (typeof line.equipment === "string") return line.equipment;
  return line.equipment._id ?? null;
}

const SOIL_STATUS_LABEL = {
  pending: "Pending",
  "in-progress": "In progress",
  completed: "Completed"
};

function formatSoilStatus(status) {
  return SOIL_STATUS_LABEL[status] || status || "—";
}

function formatSoilTests(tests) {
  if (!tests || typeof tests !== "object") return "—";
  const parts = [];
  if (tests.pH) parts.push("pH");
  if (tests.nitrogen) parts.push("Nitrogen (N)");
  if (tests.phosphorus) parts.push("Phosphorus (P)");
  if (tests.potassium) parts.push("Potassium (K)");
  return parts.length ? parts.join(" · ") : "None selected";
}

function soilPhotoSrc(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [activeSection, setActiveSection] = useState(() => {
    const v = searchParams.get("view");
    if (v === "weather") return "weather";
    if (v === "orders") return "orders";
    if (v === "soil") return "soil";
    return "overview";
  });

  const [orders, setOrders] = useState([]);
  const [soilBookings, setSoilBookings] = useState([]);

  useEffect(() => {
    const v = searchParams.get("view");
    setActiveSection(
      v === "weather" ? "weather" : v === "orders" ? "orders" : v === "soil" ? "soil" : "overview"
    );
  }, [searchParams]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === "weather") {
      setSearchParams({ view: "weather" }, { replace: true });
    } else if (section === "orders") {
      setSearchParams({ view: "orders" }, { replace: true });
    } else if (section === "soil") {
      setSearchParams({ view: "soil" }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

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

  useEffect(() => {
    api
      .get("/orders/my")
      .then((res) => setOrders(res.data || []))
      .catch(() => setOrders([]));
  }, []);

  useEffect(() => {
    if (activeSection !== "orders") return;
    api
      .get("/orders/my")
      .then((res) => setOrders(res.data || []))
      .catch(() => setOrders([]));
  }, [activeSection]);

  useEffect(() => {
    api
      .get("/soil")
      .then((res) => setSoilBookings(res.data || []))
      .catch(() => setSoilBookings([]));
  }, []);

  useEffect(() => {
    if (activeSection !== "soil") return;
    api
      .get("/soil")
      .then((res) => setSoilBookings(res.data || []))
      .catch(() => setSoilBookings([]));
  }, [activeSection]);

  const navItems = useMemo(
    () => [
      { section: "overview", label: "Overview", icon: LayoutDashboard },
      { section: "weather", label: "Weather", icon: CloudSun },
      { section: "soil", label: "Soil bookings", icon: Sprout, badge: soilBookings.length },
      { section: "orders", label: "My orders", icon: ShoppingCart, badge: orders.length },
      {
        to: "/tasks",
        label: "Manage tasks",
        icon: ListTodo,
        end: false,
        navMatch: "tasks"
      }
    ],
    [orders.length, soilBookings.length]
  );

  const copy = SECTION_COPY[activeSection] ?? SECTION_COPY.overview;

  if (!data) {
    return (
      <div className="ui-loading ui-loading--page">
        <div className="ui-spinner" aria-hidden />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const userName = data.user.name;

  return (
    <DashboardShell
      variant="user"
      sidebarTitle={`Hi, ${userName}`}
      sidebarSubtitle={data.user.location || "Your farm dashboard"}
      pageTitle={copy.title}
      pageSubtitle={copy.subtitle}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      items={navItems}
      headerActions={
        <Link to="/tasks" className="user-dash-header-link">
          Open tasks
        </Link>
      }
    >
      <div className="user-dash">
        {activeSection === "overview" && (
          <>
            <div className="user-dash-stats">
              <div className="user-stat-card">
                <span className="user-stat-icon" aria-hidden>
                  <ListTodo size={26} strokeWidth={2} />
                </span>
                <h3>Total Tasks</h3>
                <p>{data.stats.total}</p>
              </div>
              <div className="user-stat-card">
                <span className="user-stat-icon" aria-hidden>
                  <CheckCircle size={26} strokeWidth={2} />
                </span>
                <h3>Completed</h3>
                <p>{data.stats.completed}</p>
              </div>
              <div className="user-stat-card">
                <span className="user-stat-icon" aria-hidden>
                  <Clock size={26} strokeWidth={2} />
                </span>
                <h3>Pending</h3>
                <p>{data.stats.pending}</p>
              </div>
            </div>

            <div className="user-dash-actions">
              <Link to="/tasks" className="user-dash-primary-btn">
                Manage tasks
              </Link>
            </div>

            <div className="user-dash-cost">
              <span className="user-dash-cost-icon" aria-hidden>
                <IndianRupee size={22} strokeWidth={2} />
              </span>
              <div>
                <h3>Total estimated cost</h3>
                <p>₹{data.finance.totalEstimatedCost.toLocaleString()}</p>
              </div>
            </div>
          </>
        )}

        {activeSection === "orders" && (
          <section className="user-dash-orders" aria-label="Your equipment orders">
            {orders.length === 0 ? (
              <div className="user-dash-orders-empty">
                <span className="user-dash-orders-empty-icon" aria-hidden>
                  <Package size={40} strokeWidth={1.5} />
                </span>
                <h3>No orders yet</h3>
                <p>When you buy equipment from the store, your orders and status will show up here.</p>
                <Link to="/store" className="user-dash-primary-btn user-dash-orders-store-link">
                  Browse equipment
                </Link>
              </div>
            ) : (
              <ul className="user-orders-list">
                {orders.map((order) => {
                    const shipAddr = order.shippingAddress?.trim();
                    const payMethod = order.paymentMethod?.trim() || "COD";
                    return (
                      <li key={order._id} className="user-order-card">
                        <div className="user-order-card-head">
                          <div className="user-order-head-text">
                            <h3 className="user-order-heading">Order</h3>
                            <p className="user-order-ref-wrap">
                              <span className="user-order-ref-label">Reference ID</span>
                              <code className="user-order-ref-id">{String(order._id)}</code>
                            </p>
                            <dl className="user-order-summary-dl">
                              <div>
                                <dt>Order status</dt>
                                <dd>
                                  <span
                                    className={`user-order-status user-order-status--${order.status || "pending"}`}
                                  >
                                    {formatOrderStatus(order.status)}
                                  </span>
                                </dd>
                              </div>
                              <div>
                                <dt>Placed on</dt>
                                <dd>{formatDateTime(order.createdAt)}</dd>
                              </div>
                              <div>
                                <dt>Last updated</dt>
                                <dd>{formatDateTime(order.updatedAt)}</dd>
                              </div>
                              <div>
                                <dt>Payment method</dt>
                                <dd>{payMethod}</dd>
                              </div>
                            </dl>
                          </div>
                        </div>

                        <section className="user-order-section" aria-label="Customer contact">
                          <h4 className="user-order-section-title">{"Customer & contact"}</h4>
                          <dl className="user-order-detail-dl">
                            <div>
                              <dt>Name</dt>
                              <dd>{order.customerName?.trim() || "—"}</dd>
                            </div>
                            <div>
                              <dt>Email</dt>
                              <dd>
                                {order.customerEmail?.trim() ? (
                                  <a href={`mailto:${order.customerEmail.trim()}`} className="user-order-mailto">
                                    {order.customerEmail.trim()}
                                  </a>
                                ) : (
                                  "—"
                                )}
                              </dd>
                            </div>
                            <div>
                              <dt>Mobile</dt>
                              <dd>{order.mobile?.trim() || "—"}</dd>
                            </div>
                          </dl>
                        </section>

                        <section className="user-order-section" aria-label="Delivery address">
                          <h4 className="user-order-section-title">Shipping address</h4>
                          <p className="user-order-address">{shipAddr || "—"}</p>
                        </section>

                        <section className="user-order-section" aria-label="Line items">
                          <h4 className="user-order-section-title">Items ordered</h4>
                          <ul className="user-order-line-items">
                            {(order.items || []).map((line, i) => {
                                const eqId = lineEquipmentId(line);
                                const img = line.equipment && typeof line.equipment === "object" ? line.equipment.image : null;
                                const qty = line.quantity ?? 0;
                                const unit = line.price ?? 0;
                                const sub = unit * qty;
                                return (
                                  <li key={i} className="user-order-line-row">
                                    <div className="user-order-line-media">
                                      {img ? (
                                        <img src={img} alt="" width={56} height={56} decoding="async" loading="lazy" />
                                      ) : (
                                        <span className="user-order-line-placeholder" aria-hidden>
                                          <Package size={22} strokeWidth={1.5} />
                                        </span>
                                      )}
                                    </div>
                                    <div className="user-order-line-body">
                                      <span className="user-order-line-title">{line.name ?? "Item"}</span>
                                      {eqId ? (
                                        <span className="user-order-line-eqid">
                                          Equipment ID: <code>{String(eqId)}</code>
                                        </span>
                                      ) : null}
                                      <span className="user-order-line-prices">
                                        Unit ₹{unit.toLocaleString()} × {qty} = ₹{sub.toLocaleString()}
                                      </span>
                                    </div>
                                  </li>
                                );
                              })}
                          </ul>
                        </section>

                        <div className="user-order-footer">
                          <span className="user-order-total-label">
                            Order total <span className="user-order-pay-hint">({payMethod})</span>
                          </span>
                          <strong className="user-order-total">₹{(order.totalAmount ?? 0).toLocaleString()}</strong>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </section>
        )}

        {activeSection === "soil" && (
          <section className="user-dash-soil" aria-label="Your soil test bookings">
            {soilBookings.length === 0 ? (
              <div className="user-dash-soil-empty">
                <span className="user-dash-soil-empty-icon" aria-hidden>
                  <Sprout size={40} strokeWidth={1.5} />
                </span>
                <h3>No soil bookings yet</h3>
                <p>Submit a soil health test request from Know your soil—details and status will appear here.</p>
                <Link to="/know-your-soil" className="user-dash-primary-btn user-dash-soil-cta-link">
                  Book a soil test
                </Link>
              </div>
            ) : (
              <ul className="user-soil-list">
                {soilBookings.map((b) => {
                    const statusKey = b.status || "pending";
                    const photos = Array.isArray(b.soilPhotos) ? b.soilPhotos : [];
                    return (
                      <li key={b._id} className="user-soil-card">
                        <div className="user-soil-card-head">
                          <h3 className="user-soil-heading">Soil test booking</h3>
                          <p className="user-order-ref-wrap user-soil-ref">
                            <span className="user-order-ref-label">Reference ID</span>
                            <code className="user-order-ref-id">{String(b._id)}</code>
                          </p>
                          <dl className="user-order-summary-dl">
                            <div>
                              <dt>Status</dt>
                              <dd>
                                <span className={`user-soil-status user-soil-status--${statusKey}`}>
                                  {formatSoilStatus(b.status)}
                                </span>
                              </dd>
                            </div>
                            <div>
                              <dt>Submitted</dt>
                              <dd>{formatDateTime(b.createdAt)}</dd>
                            </div>
                            <div>
                              <dt>Last updated</dt>
                              <dd>{formatDateTime(b.updatedAt)}</dd>
                            </div>
                          </dl>
                        </div>

                        <section className="user-order-section" aria-label="Booking details">
                          <h4 className="user-order-section-title">{"Sample & site"}</h4>
                          <dl className="user-order-detail-dl">
                            <div>
                              <dt>Soil type</dt>
                              <dd>{b.soilType || "—"}</dd>
                            </div>
                            <div>
                              <dt>Testing center</dt>
                              <dd>{b.testingCenter || "—"}</dd>
                            </div>
                            <div>
                              <dt>Location</dt>
                              <dd className="user-soil-pre">{b.location?.trim() || "—"}</dd>
                            </div>
                            <div>
                              <dt>Mobile</dt>
                              <dd>{b.mobile?.trim() || "—"}</dd>
                            </div>
                          </dl>
                        </section>

                        <section className="user-order-section" aria-label="Crops">
                          <h4 className="user-order-section-title">{"Crops & rotation"}</h4>
                          <p className="user-order-address user-soil-crops">
                            {b.cropDescription?.trim() || "—"}
                          </p>
                        </section>

                        <section className="user-order-section" aria-label="Tests requested">
                          <h4 className="user-order-section-title">Tests requested</h4>
                          <p className="user-soil-tests-line">{formatSoilTests(b.soilTests)}</p>
                        </section>

                        {photos.length > 0 ? (
                          <section className="user-order-section user-soil-photos-section" aria-label="Photos you uploaded">
                            <h4 className="user-order-section-title">Photos</h4>
                            <ul className="user-soil-photo-grid">
                              {photos.map((src, i) => (
                                <li key={i}>
                                  <a
                                    href={soilPhotoSrc(src)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="user-soil-photo-link"
                                  >
                                    <img
                                      src={soilPhotoSrc(src)}
                                      alt={`Soil sample ${i + 1}`}
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </section>
                        ) : null}

                        {b.adminNotes?.trim() ? (
                          <section className="user-soil-admin-notes" aria-label="Lab notes">
                            <h4 className="user-order-section-title">Lab note</h4>
                            <p>{b.adminNotes.trim()}</p>
                          </section>
                        ) : null}
                      </li>
                    );
                  })}
              </ul>
            )}
          </section>
        )}

        {activeSection === "weather" && (
          <section className="user-dash-weather">
            <div className="user-weather-search">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
              <button type="button" onClick={() => fetchWeather(location)}>
                Search
              </button>
            </div>
            {weather && weather.main ? (
              <div className="user-weather-grid">
                <div className="user-weather-item">
                  <span className="user-weather-label">Temperature</span>
                  <span className="user-weather-value">{weather.main.temp}°C</span>
                </div>
                <div className="user-weather-item">
                  <span className="user-weather-label">Humidity</span>
                  <span className="user-weather-value">{weather.main.humidity}%</span>
                </div>
                <div className="user-weather-item">
                  <span className="user-weather-label">Feels like</span>
                  <span className="user-weather-value">{weather.main.feels_like}°C</span>
                </div>
                <div className="user-weather-item">
                  <span className="user-weather-label">Condition</span>
                  <span className="user-weather-value">
                    {weather.weather?.[0]?.description || "—"}
                  </span>
                </div>
              </div>
            ) : (
              <p className="user-weather-placeholder">Enter a city to fetch weather.</p>
            )}
          </section>
        )}
      </div>

      <style>{`
        .user-dash { width: 100%; }
        .user-dash-header-link {
          display: inline-flex;
          align-items: center;
          padding: 10px 18px;
          border-radius: 10px;
          background: var(--color-primary);
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          font-family: var(--font-body);
        }
        .user-dash-header-link:hover { filter: brightness(1.05); }
        .user-dash-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        .user-stat-card {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid var(--color-border, #e2e8f0);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .user-stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          color: #16a34a;
        }
        .user-stat-card h3 { margin: 0 0 8px; font-size: 14px; color: #64748b; font-weight: 600; font-family: var(--font-body); }
        .user-stat-card p { margin: 0; font-size: 26px; font-weight: 700; color: #166534; font-family: var(--font-heading); }
        .user-dash-actions { margin-bottom: 24px; }
        .user-dash-primary-btn {
          display: inline-flex;
          padding: 14px 28px;
          background: #16a34a;
          color: #fff;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          font-family: var(--font-body);
        }
        .user-dash-primary-btn:hover { background: #15803d; }
        .user-dash-cost {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(22, 163, 74, 0.2);
        }
        .user-dash-cost-icon {
          display: flex;
          color: #166534;
          flex-shrink: 0;
          margin-top: 4px;
        }
        .user-dash-cost h3 { margin: 0 0 6px; font-size: 15px; color: #14532d; font-weight: 600; font-family: var(--font-body); }
        .user-dash-cost p { margin: 0; font-size: 28px; font-weight: 800; color: #15803d; font-family: var(--font-heading); }
        .user-dash-weather {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid var(--color-border, #e2e8f0);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .user-weather-search { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .user-weather-search input {
          flex: 1;
          min-width: 180px;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-family: var(--font-body);
          outline: none;
        }
        .user-weather-search button {
          padding: 12px 20px;
          border-radius: 8px;
          border: none;
          background: #16a34a;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-body);
        }
        .user-weather-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
        }
        .user-weather-item {
          background: #f8fafc;
          padding: 16px;
          border-radius: 10px;
          border: 1px solid #f1f5f9;
        }
        .user-weather-label { display: block; font-size: 12px; color: #64748b; margin-bottom: 4px; }
        .user-weather-value { font-size: 18px; font-weight: 700; color: #166534; font-family: var(--font-heading); }
        .user-weather-placeholder { margin: 0; color: #64748b; }
        .user-dash-orders-empty {
          text-align: center;
          padding: 40px 24px;
          background: #fff;
          border-radius: 12px;
          border: 1px solid var(--color-border, #e2e8f0);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .user-dash-orders-empty-icon {
          display: flex;
          justify-content: center;
          color: #94a3b8;
          margin-bottom: 16px;
        }
        .user-dash-orders-empty h3 { margin: 0 0 8px; font-size: 18px; color: #166534; font-family: var(--font-heading); }
        .user-dash-orders-empty p { margin: 0 0 20px; color: #64748b; font-size: 15px; line-height: 1.5; max-width: 360px; margin-left: auto; margin-right: auto; }
        .user-dash-orders-store-link { display: inline-flex; }
        .user-orders-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .user-order-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid var(--color-border, #e2e8f0);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          padding: 22px;
        }
        .user-order-card-head {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .user-order-head-text { min-width: 0; }
        .user-order-heading {
          margin: 0 0 12px;
          font-size: 15px;
          font-weight: 700;
          color: #14532d;
          font-family: var(--font-heading);
        }
        .user-order-ref-wrap { margin: 0 0 16px; }
        .user-order-ref-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }
        .user-order-ref-id {
          display: block;
          font-size: 12px;
          word-break: break-all;
          padding: 10px 12px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          font-family: ui-monospace, monospace;
        }
        .user-order-summary-dl {
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 14px 20px;
        }
        .user-order-summary-dl > div { margin: 0; }
        .user-order-summary-dl dt {
          margin: 0 0 4px;
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .user-order-summary-dl dd { margin: 0; font-size: 14px; color: #0f172a; line-height: 1.4; }
        .user-order-status {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          text-transform: capitalize;
          font-family: var(--font-body);
        }
        .user-order-status--pending { background: #fef3c7; color: #b45309; }
        .user-order-status--confirmed { background: #dbeafe; color: #1d4ed8; }
        .user-order-status--shipped { background: #e0e7ff; color: #4338ca; }
        .user-order-status--delivered { background: #d1fae5; color: #047857; }
        .user-order-section {
          margin-bottom: 20px;
          padding-bottom: 18px;
          border-bottom: 1px solid #f1f5f9;
        }
        .user-order-section:last-of-type { border-bottom: none; margin-bottom: 16px; padding-bottom: 0; }
        .user-order-section-title {
          margin: 0 0 12px;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-family: var(--font-body);
        }
        .user-order-detail-dl {
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px 24px;
        }
        .user-order-detail-dl > div { margin: 0; }
        .user-order-detail-dl dt {
          margin: 0 0 4px;
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
        }
        .user-order-detail-dl dd { margin: 0; font-size: 14px; color: #0f172a; word-break: break-word; }
        .user-order-mailto { color: #1d4ed8; text-decoration: none; }
        .user-order-mailto:hover { text-decoration: underline; }
        .user-order-address {
          margin: 0;
          font-size: 14px;
          color: #334155;
          line-height: 1.55;
          white-space: pre-wrap;
        }
        .user-order-line-items {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .user-order-line-row {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 12px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid #f1f5f9;
        }
        .user-order-line-media {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 8px;
          overflow: hidden;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-order-line-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .user-order-line-placeholder { color: #94a3b8; display: flex; }
        .user-order-line-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .user-order-line-title { font-weight: 600; font-size: 15px; color: #0f172a; }
        .user-order-line-eqid { font-size: 12px; color: #64748b; }
        .user-order-line-eqid code {
          font-size: 11px;
          word-break: break-all;
          background: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
        }
        .user-order-line-prices { font-size: 13px; color: #475569; }
        .user-order-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 16px;
          margin-top: 4px;
          border-top: 2px solid #ecfdf5;
        }
        .user-order-total-label { font-size: 14px; color: #64748b; }
        .user-order-pay-hint { font-weight: 600; color: #94a3b8; }
        .user-order-total { font-size: 20px; color: #166534; font-family: var(--font-heading); }
        .user-dash-soil-empty {
          text-align: center;
          padding: 40px 24px;
          background: #fff;
          border-radius: 12px;
          border: 1px solid var(--color-border, #e2e8f0);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .user-dash-soil-empty-icon {
          display: flex;
          justify-content: center;
          color: #86efac;
          margin-bottom: 16px;
        }
        .user-dash-soil-empty h3 { margin: 0 0 8px; font-size: 18px; color: #166534; font-family: var(--font-heading); }
        .user-dash-soil-empty p { margin: 0 0 20px; color: #64748b; font-size: 15px; line-height: 1.5; max-width: 400px; margin-left: auto; margin-right: auto; }
        .user-dash-soil-cta-link { display: inline-flex; }
        .user-soil-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .user-soil-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid var(--color-border, #e2e8f0);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          padding: 22px;
        }
        .user-soil-card-head {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .user-soil-heading {
          margin: 0 0 12px;
          font-size: 15px;
          font-weight: 700;
          color: #14532d;
          font-family: var(--font-heading);
        }
        .user-soil-ref { margin-bottom: 16px; }
        .user-soil-status {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          font-family: var(--font-body);
        }
        .user-soil-status--pending { background: #fef3c7; color: #b45309; }
        .user-soil-status--in-progress { background: #dbeafe; color: #1d4ed8; }
        .user-soil-status--completed { background: #d1fae5; color: #047857; }
        .user-soil-pre { white-space: pre-wrap; }
        .user-soil-crops { min-height: 1.25em; }
        .user-soil-tests-line { margin: 0; font-size: 14px; color: #334155; line-height: 1.5; }
        .user-soil-photos-section { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .user-soil-photo-grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 10px;
        }
        .user-soil-photo-link {
          display: block;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          aspect-ratio: 1;
          background: #f8fafc;
        }
        .user-soil-photo-link img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          vertical-align: middle;
        }
        .user-soil-admin-notes {
          margin-top: 16px;
          padding: 16px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 10px;
        }
        .user-soil-admin-notes h4 { margin-top: 0; }
        .user-soil-admin-notes p { margin: 0; font-size: 14px; color: #78350f; line-height: 1.5; white-space: pre-wrap; }
        @media (max-width: 600px) {
          .user-dash-stats { grid-template-columns: 1fr; }
          .user-weather-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </DashboardShell>
  );
}

export default Dashboard;

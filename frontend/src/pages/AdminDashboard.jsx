import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Sprout,
  ShoppingCart,
  CloudSun,
  UserRound,
  ListTodo,
  CheckCircle,
  Clock,
  Inbox
} from "lucide-react";
import api from "../services/api";
import DashboardShell from "../components/DashboardShell";

const SECTION_COPY = {
  overview: { title: "Overview", subtitle: "Summary of users, tasks, bookings, and orders" },
  users: { title: "Users", subtitle: "Registered accounts and roles" },
  tasks: { title: "Tasks", subtitle: "All farm tasks across accounts" },
  soil: { title: "Soil bookings", subtitle: "Soil health test requests" },
  orders: { title: "Equipment orders", subtitle: "Order lines, totals, and fulfillment status" },
  leads: { title: "Contact leads", subtitle: "Public contact form submissions" },
  weather: { title: "Weather", subtitle: "Conditions by city" }
};

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [soilBookings, setSoilBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("Delhi");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const fetchWeather = (city) => {
    if (!city) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0661d30203b01b344698837a772ee6af`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch(() => setWeather(null));
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, usersRes, tasksRes, soilRes, ordersRes, contactsRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/users"),
          api.get("/admin/tasks"),
          api.get("/admin/soil"),
          api.get("/admin/orders").catch(() => ({ data: [] })),
          api.get("/admin/contacts").catch(() => ({ data: [] }))
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setTasks(tasksRes.data);
        setSoilBookings(soilRes.data);
        setOrders(ordersRes.data);
        setContacts(contactsRes.data || []);
        fetchWeather(location);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const navItems = useMemo(
    () => [
      { section: "overview", label: "Overview", icon: LayoutDashboard },
      { section: "users", label: "Users", icon: Users, badge: users.length },
      { section: "tasks", label: "Tasks", icon: ClipboardList, badge: tasks.length },
      { section: "soil", label: "Soil bookings", icon: Sprout, badge: soilBookings.length },
      { section: "orders", label: "Orders", icon: ShoppingCart, badge: orders.length },
      { section: "leads", label: "Leads", icon: Inbox, badge: contacts.length },
      { section: "weather", label: "Weather", icon: CloudSun }
    ],
    [users.length, tasks.length, soilBookings.length, orders.length, contacts.length]
  );

  const copy = SECTION_COPY[activeTab] ?? SECTION_COPY.overview;

  if (loading) {
    return (
      <div className="ui-loading ui-loading--page">
        <div className="ui-spinner" aria-hidden />
        <p>Loading admin data...</p>
      </div>
    );
  }

  return (
    <DashboardShell
      variant="admin"
      sidebarTitle="Admin"
      sidebarSubtitle="Manage users, tasks, bookings, orders, and leads"
      pageTitle={copy.title}
      pageSubtitle={copy.subtitle}
      activeSection={activeTab}
      onSectionChange={setActiveTab}
      items={navItems}
    >
      <div className="admin-dash">
        {activeTab === "overview" && stats && (
          <section className="admin-overview">
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <span className="admin-stat-icon" aria-hidden>
                  <UserRound size={28} strokeWidth={2} />
                </span>
                <h3>Total Users</h3>
                <p>{stats.users}</p>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-icon" aria-hidden>
                  <ListTodo size={28} strokeWidth={2} />
                </span>
                <h3>Total Tasks</h3>
                <p>{stats.totalTasks}</p>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-icon" aria-hidden>
                  <CheckCircle size={28} strokeWidth={2} />
                </span>
                <h3>Completed</h3>
                <p>{stats.completedTasks}</p>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-icon" aria-hidden>
                  <Clock size={28} strokeWidth={2} />
                </span>
                <h3>Pending</h3>
                <p>{stats.pendingTasks}</p>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-icon" aria-hidden>
                  <Sprout size={28} strokeWidth={2} />
                </span>
                <h3>Soil Bookings</h3>
                <p>{stats.totalSoilBookings ?? 0}</p>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-icon" aria-hidden>
                  <ShoppingCart size={28} strokeWidth={2} />
                </span>
                <h3>Equipment Orders</h3>
                <p>{stats.totalOrders ?? 0}</p>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-icon" aria-hidden>
                  <Inbox size={28} strokeWidth={2} />
                </span>
                <h3>Contact leads</h3>
                <p>{stats.totalContactInquiries ?? 0}</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "orders" && (
          <section className="admin-section admin-orders">
            <h2>Equipment Orders</h2>
            <p className="admin-orders-hint">View which equipment each order contains</p>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Equipment Items</th>
                    <th>Total</th>
                    <th>Address</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td>
                        {o.customerName || (o.user && o.user.name) || "—"}
                        {(o.customerEmail || (o.user && o.user.email)) && (
                          <>
                            <br />
                            <small>{o.customerEmail || (o.user && o.user.email)}</small>
                          </>
                        )}
                      </td>
                      <td>
                        <div className="admin-order-items">
                          {o.items?.map((item, i) => (
                            <div key={i} className="admin-order-item">
                              <strong>{item.name}</strong> × {item.quantity} @ ₹
                              {item.price?.toLocaleString()}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>₹{o.totalAmount?.toLocaleString()}</td>
                      <td>{o.shippingAddress}</td>
                      <td>{o.mobile}</td>
                      <td>
                        <select
                          className="admin-status-select"
                          value={o.status}
                          onChange={async (e) => {
                            const status = e.target.value;
                            try {
                              const res = await api.put(`/admin/orders/${o._id}/status`, { status });
                              setOrders((prev) => prev.map((x) => (x._id === o._id ? res.data : x)));
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "soil" && (
          <section className="admin-section admin-soil">
            <h2>Soil Health Test Bookings</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Soil Type</th>
                    <th>Center</th>
                    <th>Location</th>
                    <th>Mobile</th>
                    <th>Tests</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {soilBookings.map((b) => (
                    <tr key={b._id}>
                      <td>
                        {b.user?.name || "—"}
                        <br />
                        <small>{b.user?.email}</small>
                      </td>
                      <td>{b.soilType}</td>
                      <td>{b.testingCenter}</td>
                      <td>{b.location}</td>
                      <td>{b.mobile}</td>
                      <td>
                        {b.soilTests &&
                          [
                            b.soilTests.pH && "pH",
                            b.soilTests.nitrogen && "N",
                            b.soilTests.phosphorus && "P",
                            b.soilTests.potassium && "K"
                          ]
                            .filter(Boolean)
                            .join(", ") || "—"}
                      </td>
                      <td>
                        <span className={`badge badge-${b.status}`}>{b.status}</span>
                      </td>
                      <td>
                        <select
                          className="admin-status-select"
                          value={b.status}
                          onChange={async (e) => {
                            const status = e.target.value;
                            try {
                              const res = await api.put(`/admin/soil/${b._id}/status`, { status });
                              setSoilBookings((prev) => prev.map((x) => (x._id === b._id ? res.data : x)));
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "users" && (
          <section className="admin-section admin-users">
            <h2>Registered Users</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Role</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.location || "—"}</td>
                      <td>
                        <span className={`badge badge-${u.role}`}>{u.role}</span>
                      </td>
                      <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "leads" && (
          <section className="admin-section admin-leads">
            <h2>Contact form leads</h2>
            <p className="admin-orders-hint">Submissions from the public Contact us page (newest first).</p>
            {contacts.length === 0 ? (
              <p className="admin-leads-empty">No contact submissions yet.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Submitted</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c._id}>
                        <td>
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleString(undefined, {
                                dateStyle: "medium",
                                timeStyle: "short"
                              })
                            : "—"}
                        </td>
                        <td>{c.name}</td>
                        <td>
                          <a href={`mailto:${c.email}`} className="admin-lead-mail">
                            {c.email}
                          </a>
                        </td>
                        <td>{c.subject?.trim() || "—"}</td>
                        <td>
                          <div className="admin-lead-message">{c.message}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === "tasks" && (
          <section className="admin-section admin-tasks">
            <h2>All Tasks</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>User</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t) => (
                    <tr key={t._id}>
                      <td>{t.title}</td>
                      <td>
                        {t.user?.name || "—"} ({t.user?.email})
                      </td>
                      <td>{t.taskType}</td>
                      <td>
                        <span className={`badge badge-${t.status}`}>{t.status}</span>
                      </td>
                      <td>
                        <span className={`badge badge-priority-${t.priority?.toLowerCase()}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "weather" && (
          <section className="admin-section admin-weather">
            <h2>Weather</h2>
            <div className="admin-weather-search">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City name"
              />
              <button type="button" onClick={() => fetchWeather(location)}>
                Search
              </button>
            </div>
            {weather && weather.main ? (
              <div className="admin-weather-cards">
                <div className="admin-weather-card">
                  <span className="weather-label">Temperature</span>
                  <span className="weather-value">{weather.main.temp}°C</span>
                </div>
                <div className="admin-weather-card">
                  <span className="weather-label">Feels Like</span>
                  <span className="weather-value">{weather.main.feels_like}°C</span>
                </div>
                <div className="admin-weather-card">
                  <span className="weather-label">Humidity</span>
                  <span className="weather-value">{weather.main.humidity}%</span>
                </div>
                <div className="admin-weather-card">
                  <span className="weather-label">Condition</span>
                  <span className="weather-value">{weather.weather?.[0]?.description || "—"}</span>
                </div>
              </div>
            ) : (
              <p className="admin-weather-error">Enter a city to fetch weather.</p>
            )}
          </section>
        )}
      </div>

      <style>{`
        .admin-dash { width: 100%; }
        .admin-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
        .admin-stat-card { background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); text-align: center; border: 1px solid var(--color-border, #f1f5f9); }
        .admin-stat-icon { display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; color: #16a34a; }
        .admin-stat-card h3 { margin: 0 0 8px; font-size: 14px; color: #64748b; font-family: var(--font-body); font-weight: 600; }
        .admin-stat-card p { margin: 0; font-size: 24px; font-weight: 700; color: #16a34a; font-family: var(--font-heading); }
        .admin-section h2 { color: #065f46; margin-bottom: 16px; font-size: 1.15rem; font-family: var(--font-heading); }
        .admin-table-wrap { overflow-x: auto; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); background: #fff; border: 1px solid var(--color-border, #f1f5f9); }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th, .admin-table td { padding: 14px 16px; text-align: left; border-bottom: 1px solid #f1f5f9; }
        .admin-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 13px; font-family: var(--font-body); }
        .admin-table td { color: #334155; font-size: 14px; }
        .badge { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge-admin { background: #dbeafe; color: #1d4ed8; }
        .badge-user { background: #dcfce7; color: #16a34a; }
        .badge-pending { background: #fef3c7; color: #b45309; }
        .badge-in-progress { background: #dbeafe; color: #2563eb; }
        .badge-completed { background: #dcfce7; color: #16a34a; }
        .badge-priority-high { background: #fee2e2; color: #dc2626; }
        .badge-priority-medium { background: #fef3c7; color: #b45309; }
        .badge-priority-low { background: #dcfce7; color: #16a34a; }
        .admin-weather-search { display: flex; gap: 10px; margin-bottom: 20px; max-width: 400px; flex-wrap: wrap; }
        .admin-weather-search input { flex: 1; min-width: 160px; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0; outline: none; font-family: var(--font-body); }
        .admin-weather-search button { padding: 12px 20px; border-radius: 8px; border: none; background: #16a34a; color: #fff; font-weight: 600; cursor: pointer; font-family: var(--font-body); }
        .admin-weather-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }
        .admin-weather-card { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid var(--color-border, #f1f5f9); }
        .weather-label { display: block; font-size: 12px; color: #64748b; margin-bottom: 4px; }
        .weather-value { font-size: 18px; font-weight: 700; color: #16a34a; font-family: var(--font-heading); }
        .admin-weather-error { color: #64748b; }
        .admin-status-select { padding: 6px 10px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 13px; background: #fff; cursor: pointer; font-family: var(--font-body); }
        .admin-orders-hint { color: #64748b; font-size: 14px; margin: -8px 0 12px; }
        .admin-order-items { display: flex; flex-direction: column; gap: 4px; }
        .admin-order-item { font-size: 13px; }
        .admin-leads-empty { color: #64748b; margin: 0; }
        .admin-lead-mail { color: #16a34a; font-weight: 600; text-decoration: none; }
        .admin-lead-mail:hover { text-decoration: underline; }
        .admin-lead-message {
          max-width: 360px;
          max-height: 140px;
          overflow: auto;
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
          color: #334155;
        }
        @media (max-width: 768px) { .admin-table th, .admin-table td { padding: 10px 12px; font-size: 13px; } .admin-table-wrap { overflow-x: scroll; } }
      `}</style>
    </DashboardShell>
  );
}

export default AdminDashboard;

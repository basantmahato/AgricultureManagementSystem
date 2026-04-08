import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, CloudSun, ListTodo, ClipboardList, ShoppingCart, Sprout } from "lucide-react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import DashboardShell from "../components/DashboardShell";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    api
      .get("/tasks")
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const navItems = useMemo(
    () => [
      {
        to: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
        end: true,
        navMatch: "dashboard-home"
      },
      {
        to: { pathname: "/dashboard", search: "?view=weather" },
        label: "Weather",
        icon: CloudSun,
        navMatch: "dashboard-weather"
      },
      {
        to: { pathname: "/dashboard", search: "?view=soil" },
        label: "Soil bookings",
        icon: Sprout,
        navMatch: "dashboard-soil"
      },
      {
        to: { pathname: "/dashboard", search: "?view=orders" },
        label: "My orders",
        icon: ShoppingCart,
        navMatch: "dashboard-orders"
      },
      {
        to: "/tasks",
        label: "Manage tasks",
        icon: ListTodo,
        end: false,
        navMatch: "tasks"
      }
    ],
    []
  );

  if (!user) {
    return (
      <div className="ui-loading ui-loading--page">
        <div className="ui-spinner" aria-hidden />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <DashboardShell
      variant="user"
      sidebarTitle={`Hi, ${user.name}`}
      sidebarSubtitle={user.location || "Your farm dashboard"}
      pageTitle="Farm tasks"
      pageSubtitle="Add and manage your farm activities"
      activeSection=""
      onSectionChange={() => {}}
      items={navItems}
      headerActions={
        <Link to="/dashboard" className="tasks-dash-header-link">
          Back to overview
        </Link>
      }
    >
      <div className="tasks-dash">
        <TaskForm refresh={fetchTasks} />

        {loading ? (
          <div className="ui-loading ui-loading--inline">
            <div className="ui-spinner" aria-hidden />
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="tasks-empty">
            <span className="tasks-empty-icon" aria-hidden>
              <ClipboardList size={48} strokeWidth={1.5} />
            </span>
            <h3>No tasks yet</h3>
            <p>Add your first farm activity using the form above.</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <div key={task._id}>
                <TaskCard task={task} refresh={fetchTasks} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .tasks-dash { width: 100%; }
        .tasks-dash-header-link {
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
        .tasks-dash-header-link:hover { filter: brightness(1.05); }
        .tasks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }
        .tasks-empty {
          text-align: center;
          padding: 48px 24px;
          background: #fff;
          border-radius: 12px;
          border: 1px dashed var(--color-border, #e2e8f0);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .tasks-empty-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
          color: #94a3b8;
        }
        .tasks-empty h3 {
          margin: 0 0 8px;
          color: #166534;
          font-family: var(--font-heading);
          font-size: 1.1rem;
        }
        .tasks-empty p { margin: 0; color: #64748b; font-size: 15px; font-family: var(--font-body); }
        @media (max-width: 640px) { .tasks-grid { grid-template-columns: 1fr; } }
      `}</style>
    </DashboardShell>
  );
}

export default Tasks;

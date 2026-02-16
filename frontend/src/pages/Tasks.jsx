import { useEffect, useState } from "react";
import AOS from "aos";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const fetchTasks = () => {
    api.get("/tasks").then((res) => {
      setTasks(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        <header className="tasks-header" data-aos="fade-down">
          <h1>🌾 Farm Tasks</h1>
          <p>Add and manage your farm activities</p>
        </header>

        <TaskForm refresh={fetchTasks} />

        {loading ? (
          <div className="tasks-loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="tasks-empty" data-aos="fade-up">
            <span className="empty-icon">📋</span>
            <h3>No tasks yet</h3>
            <p>Add your first farm activity using the form above.</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task, i) => (
              <div key={task._id} data-aos="fade-up" data-aos-delay={i * 60}>
                <TaskCard task={task} refresh={fetchTasks} />
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .tasks-page {
          min-height: 100vh;
          padding: clamp(24px, 5vw, 40px) clamp(20px, 4vw, 32px);
          background: linear-gradient(135deg, #064e3b 0%, #022c22 100%);
        }
        .tasks-container {
          max-width: 1100px;
          margin: 0 auto;
          background: #fff;
          padding: clamp(24px, 5vw, 40px);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        .tasks-header { margin-bottom: 28px; }
        .tasks-header h1 { color: #065f46; font-size: clamp(22px, 4vw, 28px); margin: 0 0 8px; }
        .tasks-header p { color: #64748b; margin: 0; font-size: 15px; }
        .tasks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }
        .tasks-loading { text-align: center; padding: 48px; color: #16a34a; }
        .tasks-empty {
          text-align: center;
          padding: 48px 24px;
          background: #f8fafc;
          border-radius: 12px;
          border: 2px dashed #e2e8f0;
        }
        .empty-icon { font-size: 48px; display: block; margin-bottom: 16px; opacity: 0.5; }
        .tasks-empty h3 { margin: 0 0 8px; color: #334155; }
        .tasks-empty p { margin: 0; color: #64748b; font-size: 15px; }
        @media (max-width: 640px) { .tasks-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

export default Tasks;

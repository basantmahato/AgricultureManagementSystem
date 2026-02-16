import api from "../services/api";

function TaskCard({ task, refresh }) {
  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      refresh();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  const toggleStatus = async () => {
    try {
      const newStatus =
        task.status === "pending"
          ? "in-progress"
          : task.status === "in-progress"
          ? "completed"
          : "pending";
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      refresh();
    } catch (err) {
      console.error("Status update failed:", err.response?.data || err.message);
    }
  };

  const isOverdue =
    task.dueDate &&
    task.status !== "completed" &&
    new Date(task.dueDate) < new Date();

  const priorityClass = task.priority ? `priority-${task.priority.toLowerCase()}` : "";
  const statusClass = task.status ? `status-${task.status.replace("-", "")}` : "";

  return (
    <div className="taskcard">
      <div className="taskcard-header">
        <h3 className="taskcard-title">{task.title}</h3>
        <div className="taskcard-badges">
          <span className={`taskcard-badge ${priorityClass}`}>{task.priority}</span>
          <span className={`taskcard-badge ${statusClass}`}>{task.status}</span>
        </div>
      </div>

      {isOverdue && (
        <div className="taskcard-overdue">⚠ This task is overdue</div>
      )}

      <div className="taskcard-grid">
        <Info label="Type" value={task.taskType} />
        <Info label="Crop" value={task.cropName || "N/A"} />
        <Info label="Field" value={task.fieldLocation || "N/A"} />
        <Info label="Estimated Cost" value={task.estimatedCost ? `₹${task.estimatedCost}` : "N/A"} />
        <Info label="Due Date" value={task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"} />
      </div>

      {task.description && <p className="taskcard-desc">{task.description}</p>}
      {task.weatherSensitive && <div className="taskcard-weather">🌦 Weather Sensitive</div>}

      <div className="taskcard-actions">
        <button className="taskcard-btn taskcard-btn-update" onClick={toggleStatus}>Change Status</button>
        <button className="taskcard-btn taskcard-btn-delete" onClick={deleteTask}>Delete</button>
      </div>

      <style>{`
        .taskcard {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          gap: 16px;
          border: 1px solid #f0f0f0;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .taskcard:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.08); }
        .taskcard-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        .taskcard-title { margin: 0; font-size: 17px; color: #065f46; font-weight: 600; }
        .taskcard-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        .taskcard-badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          text-transform: capitalize;
        }
        .taskcard-badge.priority-high { background: #dc2626; }
        .taskcard-badge.priority-medium { background: #f59e0b; }
        .taskcard-badge.priority-low { background: #16a34a; }
        .taskcard-badge.status-pending { background: #facc15; color: #1f2937; }
        .taskcard-badge.status-inprogress { background: #3b82f6; }
        .taskcard-badge.status-completed { background: #16a34a; }
        .taskcard-overdue { background: #fee2e2; color: #b91c1c; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; }
        .taskcard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
        }
        .taskcard .taskcard-info { background: #f0fdf4; padding: 12px; border-radius: 8px; }
        .taskcard .taskcard-info-label { font-size: 12px; color: #64748b; display: block; margin-bottom: 4px; }
        .taskcard .taskcard-info-value { font-weight: 600; color: #065f46; }
        .taskcard-desc { background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 14px; margin: 0; color: #334155; line-height: 1.5; }
        .taskcard-weather { font-size: 13px; color: #2563eb; font-weight: 600; }
        .taskcard-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .taskcard-btn {
          flex: 1;
          min-width: 120px;
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .taskcard-btn:hover { opacity: 0.9; }
        .taskcard-btn-update { background: #16a34a; color: #fff; }
        .taskcard-btn-delete { background: #dc2626; color: #fff; }
      `}</style>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="taskcard-info">
      <span className="taskcard-info-label">{label}</span>
      <span className="taskcard-info-value">{value}</span>
    </div>
  );
}

export default TaskCard;

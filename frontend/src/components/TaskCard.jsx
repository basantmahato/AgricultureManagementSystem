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

  const priorityColors = {
    High: "#dc2626",
    Medium: "#f59e0b",
    Low: "#16a34a"
  };

  const statusColors = {
    pending: "#facc15",
    "in-progress": "#3b82f6",
    completed: "#16a34a"
  };

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>{task.title}</h3>

        <div style={styles.badgeGroup}>
          <span
            style={{
              ...styles.badge,
              backgroundColor:
                priorityColors[task.priority] || "#64748b"
            }}
          >
            {task.priority}
          </span>

          <span
            style={{
              ...styles.badge,
              backgroundColor:
                statusColors[task.status] || "#64748b"
            }}
          >
            {task.status}
          </span>
        </div>
      </div>

      {/* Overdue Warning */}
      {isOverdue && (
        <div style={styles.overdue}>
          ⚠ This task is overdue
        </div>
      )}

      {/* Info Grid */}
      <div style={styles.grid}>
        <Info label="Type" value={task.taskType} />
        <Info label="Crop" value={task.cropName || "N/A"} />
        <Info label="Field" value={task.fieldLocation || "N/A"} />
        <Info
          label="Estimated Cost"
          value={
            task.estimatedCost ? `₹${task.estimatedCost}` : "N/A"
          }
        />
        <Info
          label="Due Date"
          value={
            task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "N/A"
          }
        />
      </div>

      {task.description && (
        <p style={styles.description}>{task.description}</p>
      )}

      {task.weatherSensitive && (
        <div style={styles.weatherTag}>
          🌦 Weather Sensitive
        </div>
      )}

      {/* Actions */}
      <div style={styles.actions}>
        <button
          style={styles.toggleBtn}
          onClick={toggleStatus}
        >
          Change Status
        </button>

        <button
          style={styles.deleteBtn}
          onClick={deleteTask}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.infoBox}>
      <span style={styles.infoLabel}>{label}</span>
      <span style={styles.infoValue}>{value}</span>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px"
  },
  title: {
    margin: 0,
    fontSize: "18px",
    color: "#065f46"
  },
  badgeGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  badge: {
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize"
  },
  overdue: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600"
  },
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px"
  },
  infoBox: {
    background: "#f0fdf4",
    padding: "10px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column"
  },
  infoLabel: {
    fontSize: "12px",
    color: "#475569"
  },
  infoValue: {
    fontWeight: "600",
    color: "#065f46"
  },
  description: {
    background: "#f8fafc",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px"
  },
  weatherTag: {
    fontSize: "13px",
    color: "#2563eb",
    fontWeight: "600"
  },
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  toggleBtn: {
    flex: "1",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600"
  },
  deleteBtn: {
    flex: "1",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#dc2626",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600"
  }
};

export default TaskCard;

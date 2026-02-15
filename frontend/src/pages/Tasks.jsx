import { useEffect, useState } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    api.get("/tasks").then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>🌾 Farm Tasks</h2>

        <TaskForm refresh={fetchTasks} />

        {tasks.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No tasks yet.</p>
            <span>Add your first farm activity above.</span>
          </div>
        ) : (
          <div style={styles.grid}>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                refresh={fetchTasks}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #064e3b, #022c22)",
    padding: "30px 20px"
  },
  container: {
    maxWidth: "1000px",
    // margin: "0 auto",
    background: "#f8fafc",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
  },
  heading: {
    marginBottom: "25px",
    color: "#064e3b",
    fontSize: "26px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    background: "#e2e8f0",
    borderRadius: "12px",
    color: "#334155"
  }
};

export default Tasks;

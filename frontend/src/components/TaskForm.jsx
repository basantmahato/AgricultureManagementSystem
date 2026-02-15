import { useState } from "react";
import api from "../services/api";

function TaskForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    taskType: "Other",
    priority: "Medium",
    cropName: "",
    fieldLocation: "",
    estimatedCost: "",
    dueDate: "",
    weatherSensitive: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", form);
    refresh();

    setForm({
      title: "",
      description: "",
      taskType: "Other",
      priority: "Medium",
      cropName: "",
      fieldLocation: "",
      estimatedCost: "",
      dueDate: "",
      weatherSensitive: false
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.heading}>🌾 Add Farm Task</h3>

      <div style={styles.grid}>
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="cropName"
          placeholder="Crop Name"
          value={form.cropName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="fieldLocation"
          placeholder="Field Location"
          value={form.fieldLocation}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="number"
          name="estimatedCost"
          placeholder="Estimated Cost"
          value={form.estimatedCost}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="taskType"
          value={form.taskType}
          onChange={handleChange}
          style={styles.input}
        >
          <option>Irrigation</option>
          <option>Fertilizer</option>
          <option>Harvest</option>
          <option>Pesticide</option>
          <option>Other</option>
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          style={styles.input}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <textarea
        name="description"
        placeholder="Task Description"
        value={form.description}
        onChange={handleChange}
        style={styles.textarea}
      />

      <div style={styles.checkboxRow}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="weatherSensitive"
            checked={form.weatherSensitive}
            onChange={handleChange}
          />
          Weather Sensitive Task
        </label>
      </div>

      <button type="submit" style={styles.button}>
        Add Task
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    marginBottom: "30px"
  },
  heading: {
    marginBottom: "20px",
    color: "#065f46"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginBottom: "15px"
  },
  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #86efac",
    fontSize: "14px",
    outline: "none",
    width: "100%"
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #86efac",
    fontSize: "14px",
    outline: "none",
    marginBottom: "15px"
  },
  checkboxRow: {
    marginBottom: "20px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#065f46"
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer"
  }
};

export default TaskForm;

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
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
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
    <form onSubmit={handleSubmit} className="taskform">
      <h3 className="taskform-heading">🌾 Add Farm Task</h3>

      <div className="taskform-grid">
        <input name="title" placeholder="Task Title" value={form.title} onChange={handleChange} required />
        <input name="cropName" placeholder="Crop Name" value={form.cropName} onChange={handleChange} />
        <input name="fieldLocation" placeholder="Field Location" value={form.fieldLocation} onChange={handleChange} />
        <input type="number" name="estimatedCost" placeholder="Estimated Cost" value={form.estimatedCost} onChange={handleChange} />
        <select name="taskType" value={form.taskType} onChange={handleChange}>
          <option>Irrigation</option>
          <option>Fertilizer</option>
          <option>Harvest</option>
          <option>Pesticide</option>
          <option>Other</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
      </div>

      <textarea name="description" placeholder="Task Description" value={form.description} onChange={handleChange} />

      <label className="taskform-checkbox">
        <input type="checkbox" name="weatherSensitive" checked={form.weatherSensitive} onChange={handleChange} />
        Weather Sensitive Task
      </label>

      <button type="submit" className="taskform-btn">Add Task</button>

      <style>{`
        .taskform {
          background: #f8fafc;
          padding: 28px;
          border-radius: 12px;
          margin-bottom: 28px;
          border: 1px solid #e2e8f0;
        }
        .taskform-heading { margin: 0 0 20px; color: #065f46; font-size: 18px; }
        .taskform-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
          margin-bottom: 14px;
        }
        .taskform input, .taskform select, .taskform textarea {
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          outline: none;
          width: 100%;
          transition: border-color 0.2s;
        }
        .taskform input:focus, .taskform select:focus, .taskform textarea:focus {
          border-color: #16a34a;
        }
        .taskform textarea { min-height: 100px; margin-bottom: 14px; resize: vertical; }
        .taskform-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #065f46;
          margin-bottom: 20px;
          cursor: pointer;
        }
        .taskform-checkbox input { width: auto; }
        .taskform-btn {
          width: 100%;
          padding: 14px;
          border-radius: 8px;
          border: none;
          background: #16a34a;
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .taskform-btn:hover { background: #15803d; }
        @media (max-width: 600px) { .taskform-grid { grid-template-columns: 1fr; } }
      `}</style>
    </form>
  );
}

export default TaskForm;

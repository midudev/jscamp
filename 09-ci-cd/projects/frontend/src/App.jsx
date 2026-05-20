import { useMemo, useState } from "react";
import "./App.css";
import { createTask, getTaskStats, initialTasks, toggleTask } from "./tasks";

const priorityLabels = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

export function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    setTasks((currentTasks) => [createTask({ title, priority }), ...currentTasks]);
    setTitle("");
    setPriority("medium");
  }

  function handleToggle(taskId) {
    setTasks((currentTasks) => toggleTask(currentTasks, taskId));
  }

  return (
    <main className="shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Demo sencilla con frontend y API</p>
        <h1 id="page-title">
          Plan <em>del día</em>
        </h1>
        <p className="hero-copy">
          Una aplicación pequeña para organizar tareas. Fácil de probar en local,
          romper en directo y validar con GitHub Actions.
        </p>
      </section>

      <section className="stats" aria-label="Resumen de tareas">
        <article>
          <span>Pendientes</span>
          <strong>{stats.pending}</strong>
        </article>
        <article>
          <span>Completadas</span>
          <strong>{stats.completed}</strong>
        </article>
        <article>
          <span>Progreso</span>
          <strong>{stats.progress}%</strong>
        </article>
      </section>

      <section className="board" aria-label="Gestor de tareas">
        <form className="task-form" onSubmit={handleSubmit}>
          <label htmlFor="task-title">Nueva tarea</label>
          <div className="form-row">
            <input
              id="task-title"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ej: preparar la demo del backend"
              type="text"
              value={title}
            />
            <select
              aria-label="Prioridad"
              onChange={(event) => setPriority(event.target.value)}
              value={priority}
            >
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
            <button type="submit">Añadir</button>
          </div>
        </form>

        <div className="task-list">
          {tasks.map((task) => (
            <article className={task.completed ? "task task-done" : "task"} key={task.id}>
              <label>
                <input
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                  type="checkbox"
                />
                <span>{task.title}</span>
              </label>
              <small>{priorityLabels[task.priority]}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="api-note" aria-label="Conexión con backend">
        <h2>También hay una API</h2>
        <p>
          El backend expone estas tareas por HTTP. Desde CI podemos testear la
          interfaz, la API y hacer un smoke test real levantando el servidor.
        </p>
        <code>GET /api/tasks</code>
      </section>
    </main>
  );
}

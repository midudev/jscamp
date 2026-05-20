import express from "express";
import { getTaskStats, normalizeTaskInput, seedTasks } from "./tasks.js";

export function createApp({ initialTasks = seedTasks } = {}) {
  const app = express();
  const tasks = structuredClone(initialTasks);

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      name: "Task API",
      description: "API sencilla para crear, listar y completar tareas.",
      endpoints: [
        {
          method: "GET",
          path: "/health",
          description: "Comprueba si la API está viva.",
        },
        {
          method: "GET",
          path: "/api/tasks",
          description: "Lista las tareas.",
        },
        {
          method: "GET",
          path: "/api/tasks/:id",
          description: "Devuelve una tarea por id.",
        },
        {
          method: "POST",
          path: "/api/tasks",
          description: "Crea una nueva tarea.",
          exampleBody: {
            title: "Comprar café",
            priority: "high",
          },
        },
        {
          method: "PATCH",
          path: "/api/tasks/:id",
          description: "Actualiza el estado o el título de una tarea.",
        },
        {
          method: "GET",
          path: "/api/stats",
          description: "Devuelve métricas básicas de tareas.",
        },
        {
          method: "DELETE",
          path: "/api/tasks/:id",
          description: "Elimina una tarea.",
        },
      ],
    });
  });

  app.get("/health", (req, res) => {
    res.json({
      ok: true,
      service: "task-api",
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/api/tasks", (req, res) => {
    res.json({ tasks });
  });

  app.get("/api/tasks/:id", (req, res) => {
    const task = tasks.find((item) => item.id === req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json({ task });
  });

  app.post("/api/tasks", (req, res) => {
    const result = normalizeTaskInput(req.body);

    if (!result.ok) {
      return res.status(400).json({ error: result.error });
    }

    tasks.push(result.task);

    return res.status(201).json({ task: result.task });
  });

  app.patch("/api/tasks/:id", (req, res) => {
    const task = tasks.find((item) => item.id === req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (typeof req.body.title === "string" && req.body.title.trim()) {
      task.title = req.body.title.trim();
    }

    if (typeof req.body.completed === "boolean") {
      task.completed = req.body.completed;
    }

    return res.json({ task });
  });

  app.get("/api/stats", (req, res) => {
    res.json({ stats: getTaskStats(tasks) });
  });

  app.delete("/api/tasks/:id", (req, res) => {
    const taskIndex = tasks.findIndex((item) => item.id === req.params.id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);

    return res.status(204).send();
  });

  return app;
}

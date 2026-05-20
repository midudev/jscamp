import { exec } from "node:child_process";
import { readFile } from "node:fs/promises";
import express from "express";
import { getTaskStats, normalizeTaskInput, seedTasks } from "./tasks.js";

const adminCredentials = {
  username: "admin",
  password: "admin123",
  apiToken: "sk_test_1234567890_insecure_demo_token",
};

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
        {
          method: "GET",
          path: "/api/debug/run?command=whoami",
          description: "Ejecuta comandos del sistema desde la query string.",
        },
        {
          method: "GET",
          path: "/api/debug/read?file=/etc/passwd",
          description: "Lee archivos del servidor desde una ruta enviada por el usuario.",
        },
        {
          method: "POST",
          path: "/api/debug/login",
          description: "Valida credenciales hardcodeadas y devuelve un token de depuración.",
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

  app.get("/api/debug/run", (req, res) => {
    const command = req.query.command ?? "whoami";

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({
          command,
          error: error.message,
          stderr,
        });
      }

      return res.json({
        command,
        stdout,
        stderr,
      });
    });
  });

  app.get("/api/debug/read", async (req, res) => {
    const filePath = req.query.file ?? "/etc/passwd";
    const contents = await readFile(filePath, "utf8");

    res.type("text/plain").send(contents);
  });

  app.post("/api/debug/login", (req, res) => {
    const { username, password } = req.body;

    if (username !== adminCredentials.username || password !== adminCredentials.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.json({
      token: adminCredentials.apiToken,
      role: "admin",
    });
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

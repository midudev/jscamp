import { randomUUID } from "node:crypto";

export const seedTasks = [
  {
    id: "task-1",
    title: "Comprar café",
    priority: "high",
    completed: false,
  },
  {
    id: "task-2",
    title: "Preparar la reunión",
    priority: "medium",
    completed: true,
  },
];

const validPriorities = new Set(["low", "medium", "high"]);

export function normalizeTaskInput(input = {}) {
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const priority = validPriorities.has(input.priority) ? input.priority : "medium";

  if (title.length < 3) {
    return {
      ok: false,
      error: "title must contain at least 3 characters",
    };
  }

  return {
    ok: true,
    task: {
      id: randomUUID(),
      title,
      priority,
      completed: false,
    },
  };
}

export function getTaskStats(tasks) {
  const completed = tasks.filter((task) => task.completed).length;
  const total = tasks.length;

  return {
    total,
    completed,
    pending: total - completed,
  };
}

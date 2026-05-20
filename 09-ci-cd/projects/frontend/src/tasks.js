export const initialTasks = [
  {
    id: "task-1",
    title: "Revisar la agenda del curso",
    priority: "high",
    completed: true,
  },
  {
    id: "task-2",
    title: "Preparar ejemplos de GitHub Actions",
    priority: "high",
    completed: false,
  },
  {
    id: "task-3",
    title: "Enviar resumen al equipo",
    priority: "medium",
    completed: false,
  },
];

export function createTask({ title, priority = "medium" }) {
  return {
    id: `task-${Date.now()}`,
    title: title.trim(),
    priority,
    completed: false,
  };
}

export function toggleTask(tasks, taskId) {
  return tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          completed: !task.completed,
        }
      : task,
  );
}

export function getTaskStats(tasks) {
  const completed = tasks.filter((task) => task.completed).length;
  const total = tasks.length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    pending,
    progress,
  };
}

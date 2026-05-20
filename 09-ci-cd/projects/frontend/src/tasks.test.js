import { describe, expect, it, vi } from "vitest";
import { createTask, getTaskStats, toggleTask } from "./tasks";

describe("task helpers", () => {
  it("calculates task progress", () => {
    const stats = getTaskStats([
      { completed: true },
      { completed: false },
      { completed: false },
    ]);

    expect(stats).toEqual({
      total: 3,
      completed: 1,
      pending: 2,
      progress: 33,
    });
  });

  it("toggles a task without mutating the list", () => {
    const tasks = [{ id: "task-1", title: "Comprar pan", completed: false }];
    const updatedTasks = toggleTask(tasks, "task-1");

    expect(updatedTasks[0].completed).toBe(true);
    expect(tasks[0].completed).toBe(false);
  });

  it("creates a normalized task", () => {
    vi.spyOn(Date, "now").mockReturnValue(123);

    expect(createTask({ title: "  Llamar al equipo  ", priority: "high" })).toEqual({
      id: "task-123",
      title: "Llamar al equipo",
      priority: "high",
      completed: false,
    });

    vi.restoreAllMocks();
  });
});

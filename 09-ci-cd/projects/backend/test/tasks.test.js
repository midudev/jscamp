import { describe, expect, it } from "vitest";
import { getTaskStats, normalizeTaskInput } from "../src/tasks.js";

describe("task helpers", () => {
  it("normalizes valid task input", () => {
    const result = normalizeTaskInput({ title: "  Comprar fruta  ", priority: "high" });

    expect(result.ok).toBe(true);
    expect(result.task).toMatchObject({
      title: "Comprar fruta",
      priority: "high",
      completed: false,
    });
    expect(result.task.id).toEqual(expect.any(String));
  });

  it("rejects short titles", () => {
    expect(normalizeTaskInput({ title: "ok" })).toEqual({
      ok: false,
      error: "title must contain at least 3 characters",
    });
  });

  it("calculates task stats", () => {
    expect(getTaskStats([{ completed: true }, { completed: false }])).toEqual({
      total: 2,
      completed: 1,
      pending: 1,
    });
  });
});

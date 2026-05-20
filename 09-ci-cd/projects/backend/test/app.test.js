import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

const app = createApp();

describe("Task API", () => {
  it("documents available endpoints from the root route", async () => {
    const response = await request(app).get("/").expect(200);

    expect(response.body).toMatchObject({
      name: "Task API",
      description: expect.any(String),
    });
    expect(response.body.endpoints).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ method: "GET", path: "/health" }),
        expect.objectContaining({ method: "GET", path: "/api/tasks" }),
        expect.objectContaining({ method: "POST", path: "/api/tasks" }),
      ]),
    );
  });

  it("returns health information", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body).toMatchObject({
      ok: true,
      service: "task-api",
    });
    expect(response.body.timestamp).toEqual(expect.any(String));
  });

  it("lists tasks", async () => {
    const response = await request(app).get("/api/tasks").expect(200);

    expect(response.body.tasks).toHaveLength(2);
    expect(response.body.tasks[0]).toMatchObject({
      id: "task-1",
      title: "Comprar café",
    });
  });

  it("returns 404 for unknown tasks", async () => {
    const response = await request(app).get("/api/tasks/unknown").expect(404);

    expect(response.body).toEqual({ error: "Task not found" });
  });

  it("creates tasks", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({
        title: "Leer documentación",
        priority: "low",
      })
      .expect(201);

    expect(response.body.task).toMatchObject({
      title: "Leer documentación",
      priority: "low",
      completed: false,
    });
  });

  it("validates task title", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "no" })
      .expect(400);

    expect(response.body.error).toBe("title must contain at least 3 characters");
  });

  it("updates tasks", async () => {
    const response = await request(app)
      .patch("/api/tasks/task-1")
      .send({ completed: true })
      .expect(200);

    expect(response.body.task.completed).toBe(true);
  });

  it("returns task stats", async () => {
    const isolatedApp = createApp({
      initialTasks: [
        { id: "task-1", title: "Comprar pan", priority: "low", completed: true },
        { id: "task-2", title: "Llamar a Ana", priority: "high", completed: false },
      ],
    });

    const response = await request(isolatedApp).get("/api/stats").expect(200);

    expect(response.body.stats).toEqual({
      total: 2,
      completed: 1,
      pending: 1,
    });
  });

  it("deletes tasks", async () => {
    const isolatedApp = createApp({
      initialTasks: [{ id: "task-1", title: "Comprar pan", priority: "low", completed: false }],
    });

    await request(isolatedApp).delete("/api/tasks/task-1").expect(204);

    const response = await request(isolatedApp).get("/api/tasks").expect(200);
    expect(response.body.tasks).toEqual([]);
  });
});

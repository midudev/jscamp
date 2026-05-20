import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the task planner", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /plan del día/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nueva tarea/i)).toBeInTheDocument();
    expect(screen.getByText(/preparar ejemplos de github actions/i)).toBeInTheDocument();
    expect(screen.getByText("GET /api/tasks")).toBeInTheDocument();
  });
});

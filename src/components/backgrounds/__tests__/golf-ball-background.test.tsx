import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GolfBallBackground } from "../golf-ball-background";

describe("GolfBallBackground", () => {
  it("returns null on initial render before particles engine init", () => {
    render(<GolfBallBackground />);
    expect(screen.queryByTestId("particles")).not.toBeInTheDocument();
  });

  it("renders Particles component after async state update", async () => {
    vi.useFakeTimers();
    render(<GolfBallBackground />);
    await vi.advanceTimersByTimeAsync(0);
    vi.useRealTimers();
    expect(screen.getByTestId("particles")).toBeInTheDocument();
  });
});

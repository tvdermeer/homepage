import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BackToTop } from "@/components/blog/back-to-top";

describe("back-to-top", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", vi.fn());
    vi.stubGlobal("scrollY", 0);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders back to top button", () => {
    render(<BackToTop />);
    expect(
      screen.getByRole("button", { name: "Back to top" })
    ).toBeInTheDocument();
  });

  it("calls window.scrollTo when clicked", () => {
    render(<BackToTop />);
    const button = screen.getByRole("button", { name: "Back to top" });

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});

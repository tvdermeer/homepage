import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "../hero";
import { siteConfig } from "@/config/site";

describe("Hero", () => {
  it("renders site name as h1 heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      siteConfig.name,
    );
  });

  it("renders subtitle text", () => {
    render(<Hero />);
    expect(screen.getByText("AI Engineer & Golf Enthusiast")).toBeInTheDocument();
  });

  it("renders Read the Blog link pointing to /blog", () => {
    render(<Hero />);
    const blogLink = screen.getByText("Read the Blog");
    expect(blogLink).toHaveAttribute("href", "/blog");
  });

  it("renders View My CV link pointing to /cv", () => {
    render(<Hero />);
    const cvLink = screen.getByText("View My CV");
    expect(cvLink).toHaveAttribute("href", "/cv");
  });

  it("renders LinkedIn social link with correct href", () => {
    render(<Hero />);
    const linkedinLink = screen.getByLabelText("LinkedIn");
    expect(linkedinLink).toHaveAttribute("href", siteConfig.links.linkedin);
  });

  it("renders GitHub social link with correct href", () => {
    render(<Hero />);
    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toHaveAttribute("href", siteConfig.links.github);
  });

  it("LinkedIn and GitHub links have target and rel attributes", () => {
    render(<Hero />);
    const linkedinLink = screen.getByLabelText("LinkedIn");
    const githubLink = screen.getByLabelText("GitHub");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});

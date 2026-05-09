import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CVPage from "@/app/cv/page";

describe("cv-page", () => {
  it('renders name "Thomas van der Meer"', () => {
    render(<CVPage />);
    expect(screen.getByText("Thomas van der Meer")).toBeInTheDocument();
  });

  it('renders role "Senior Gen AI Engineer"', () => {
    render(<CVPage />);
    expect(screen.getByText("Senior Gen AI Engineer | ML Governance & Evaluation Specialist")).toBeInTheDocument();
  });

  it('renders "Experience" section with company names', () => {
    render(<CVPage />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Sogeti")).toBeInTheDocument();
    expect(screen.getByText("Rabobank (through Sogeti)")).toBeInTheDocument();
  });

  it('renders "Education" section with degrees', () => {
    render(<CVPage />);
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("MSc Business Informatics")).toBeInTheDocument();
    expect(screen.getByText("BSc Informatiekunde (Information Science)")).toBeInTheDocument();
  });

  it('renders "Technical Skills" section with categories', () => {
    render(<CVPage />);
    expect(screen.getByText("Technical Skills")).toBeInTheDocument();
    expect(screen.getByText("Certificates")).toBeInTheDocument();
    expect(screen.getByText("GenAI & Evaluation")).toBeInTheDocument();
    expect(screen.getByText("Cloud & DevOps")).toBeInTheDocument();
  });

  it("renders LinkedIn and GitHub contact links", () => {
    render(<CVPage />);
    const linkedInLink = screen.getByRole("link", { name: /linkedin/i });
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(linkedInLink).toHaveAttribute("href", "https://www.linkedin.com/in/tvdermeer/");
    expect(githubLink).toHaveAttribute("href", "https://github.com/tvdermeer");
  });

  it("renders download CV as PDF button", () => {
    render(<CVPage />);
    expect(
      screen.getByRole("button", { name: /download cv as pdf/i })
    ).toBeInTheDocument();
  });

  it("does not expose personal email on the page", () => {
    render(<CVPage />);
    const body = document.body.textContent || "";
    expect(body).not.toContain("@");
  });

  it("renders phone number", () => {
    render(<CVPage />);
    expect(screen.getByText(/\+31 6 20728126/)).toBeInTheDocument();
  });
});

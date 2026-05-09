import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactPage from "@/app/contact/page";
import { siteConfig } from "@/config/site";

describe("contact-page", () => {
  it("renders contact heading", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<ContactPage />);
    expect(
      screen.getByText(/Want to collaborate, discuss AI, or talk golf?/)
    ).toBeInTheDocument();
  });

  it("renders form with name, email, and message fields", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("form has correct action pointing to formspree", () => {
    render(<ContactPage />);
    const form = document.querySelector("form");
    expect(form).toHaveAttribute(
      "action",
      `https://formspree.io/f/${siteConfig.formspreeId}`
    );
  });

  it("form uses POST method", () => {
    render(<ContactPage />);
    const form = document.querySelector("form");
    expect(form).toHaveAttribute("method", "POST");
  });

  it("includes honeypot field for spam protection", () => {
    render(<ContactPage />);
    const honeypot = screen.getByLabelText("Website", { selector: "[aria-hidden='true'] input" });
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("autocomplete", "off");
  });

  it("renders submit button", () => {
    render(<ContactPage />);
    expect(
      screen.getByRole("button", { name: "Send Message" })
    ).toBeInTheDocument();
  });

  it("renders LinkedIn and GitHub social links", () => {
    render(<ContactPage />);
    const linkedInLink = screen.getByRole("link", { name: /linkedin/i });
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(linkedInLink).toHaveAttribute("href", siteConfig.links.linkedin);
    expect(githubLink).toHaveAttribute("href", siteConfig.links.github);
  });

  it("does not expose personal email anywhere on the page", () => {
    render(<ContactPage />);
    const body = document.body.textContent || "";
    expect(body).not.toContain("@");
  });

  it("all required fields have required attribute", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText("Name")).toHaveAttribute("required");
    expect(screen.getByLabelText("Email")).toHaveAttribute("required");
    expect(screen.getByLabelText("Message")).toHaveAttribute("required");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactPage from "@/app/contact/page";
import { siteConfig } from "@/config/site";

const mockHandleSubmit = vi.fn();
let mockFormState = { submitting: false, succeeded: false, errors: [] };

vi.mock("@formspree/react", () => ({
  useForm: vi.fn(() => [mockFormState, mockHandleSubmit]),
  ValidationError: ({ errors, className }: { errors?: unknown; className?: string }) => {
    if (!errors || (Array.isArray(errors) && errors.length === 0)) return null;
    return <div className={className}>Error</div>;
  },
}));

describe("contact-page", () => {
  beforeEach(() => {
    mockFormState = { submitting: false, succeeded: false, errors: [] };
    mockHandleSubmit.mockClear();
  });

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

  it("calls handleSubmit when form is submitted", () => {
    render(<ContactPage />);
    const form = screen.getByRole("form", { name: "Contact form" });
    fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});

describe("contact-form submitting state", () => {
  it("shows sending text when submitting", () => {
    mockFormState = { submitting: true, succeeded: false, errors: [] };

    render(<ContactPage />);
    expect(screen.getByRole("button", { name: "Sending..." })).toBeInTheDocument();
  });
});

describe("contact-form success state", () => {
  it("shows success message after submission", () => {
    mockFormState = { submitting: false, succeeded: true, errors: [] };

    render(<ContactPage />);
    expect(screen.getByText("Thanks for reaching out!")).toBeInTheDocument();
    expect(screen.getByText(/I'll get back to you as soon as I can./)).toBeInTheDocument();
  });
});

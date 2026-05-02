import { describe, it, expect } from "vitest";
import { siteConfig } from "../site";

describe("siteConfig", () => {
  it("has required top-level properties", () => {
    expect(siteConfig).toHaveProperty("name");
    expect(siteConfig).toHaveProperty("title");
    expect(siteConfig).toHaveProperty("description");
    expect(siteConfig).toHaveProperty("url");
    expect(siteConfig).toHaveProperty("author");
  });

  it("links contains linkedin and github URLs starting with https", () => {
    expect(siteConfig.links.linkedin).toMatch(/^https:\/\//);
    expect(siteConfig.links.github).toMatch(/^https:\/\//);
  });

  it("nav is an array with items containing label and href", () => {
    expect(Array.isArray(siteConfig.nav)).toBe(true);
    siteConfig.nav.forEach((item) => {
      expect(item).toHaveProperty("label");
      expect(item).toHaveProperty("href");
      expect(typeof item.label).toBe("string");
      expect(typeof item.href).toBe("string");
    });
  });

  it("nav items match expected pages", () => {
    const navItems = siteConfig.nav;
    expect(navItems).toContainEqual({ label: "Home", href: "/" });
    expect(navItems).toContainEqual({ label: "Blog", href: "/blog" });
    expect(navItems).toContainEqual({ label: "CV", href: "/cv" });
  });

  it("title contains the author name", () => {
    expect(siteConfig.title).toContain(siteConfig.author);
  });

  it("url is a valid HTTPS URL", () => {
    expect(siteConfig.url).toMatch(/^https:\/\/.+/);
    expect(() => new URL(siteConfig.url)).not.toThrow();
  });
});
import { test, expect } from "@playwright/test";

test.describe("CV", () => {
  test("cv page loads with name and role", async ({ page }) => {
    await page.goto("/cv/");
    await expect(page.getByRole("heading", { name: "Thomas van der Meer" })).toBeVisible();
    await expect(page.locator("header p").first()).toBeVisible();
  });

  test("experience section is present", async ({ page }) => {
    await page.goto("/cv/");
    await expect(page.getByRole("heading", { name: /experience/i })).toBeVisible();
  });

  test("education section is present", async ({ page }) => {
    await page.goto("/cv/");
    await expect(page.getByRole("heading", { name: /education/i })).toBeVisible();
  });

  test("technical skills section is present", async ({ page }) => {
    await page.goto("/cv/");
    await expect(page.getByRole("heading", { name: /technical skills/i })).toBeVisible();
  });

  test("linkedin and github links are present and correct", async ({ page }) => {
    await page.goto("/cv/");
    const linkedInLink = page.getByRole("link", { name: /linkedin/i }).first();
    const githubLink = page.getByRole("link", { name: /github/i }).first();
    await expect(linkedInLink).toHaveAttribute("href", "https://www.linkedin.com/in/tvdermeer/");
    await expect(githubLink).toHaveAttribute("href", "https://github.com/tvdermeer");
  });
});
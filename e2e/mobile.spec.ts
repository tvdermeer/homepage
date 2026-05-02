import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 375, height: 667 } });

test.describe("Mobile", () => {
  test("homepage renders correctly on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Thomas van der Meer" })).toBeVisible();
    await expect(page.getByText("AI Engineer & Golf Enthusiast")).toBeVisible();
  });

  test("blog page renders correctly on mobile", async ({ page }) => {
    await page.goto("/blog/");
    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("cv page renders correctly on mobile", async ({ page }) => {
    await page.goto("/cv/");
    await expect(page.getByRole("heading", { name: "Thomas van der Meer" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /experience/i })).toBeVisible();
  });
});
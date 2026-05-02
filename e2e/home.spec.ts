import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("homepage loads and displays Thomas van der Meer heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Thomas van der Meer" })).toBeVisible();
  });

  test("hero section renders AI Engineer & Golf Enthusiast", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("AI Engineer & Golf Enthusiast")).toBeVisible();
  });

  test("Read the Blog and View My CV links are visible with correct hrefs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Read the Blog" })).toHaveAttribute("href", "/blog/");
    await expect(page.getByRole("link", { name: "View My CV" })).toHaveAttribute("href", "/cv/");
  });

  test("PassionGrid shows My Passions section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "My Passions" })).toBeVisible();
  });

  test("Golf passion card links to /blog/?tag=golf", async ({ page }) => {
    await page.goto("/");
    const golfCard = page.getByRole("link", { name: /golf/i }).first();
    await expect(golfCard).toHaveAttribute("href", "/blog/?tag=golf");
  });

  test("AI passion card links to /blog/?tag=ai", async ({ page }) => {
    await page.goto("/");
    const aiCard = page.getByRole("link", { name: /ai/i }).first();
    await expect(aiCard).toHaveAttribute("href", "/blog/?tag=ai");
  });
});
import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("blog page loads with Blog heading", async ({ page }) => {
    await page.goto("/blog/");
    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
  });

  test("blog posts are listed", async ({ page }) => {
    await page.goto("/blog/");
    const firstPost = page.locator("article").first();
    await expect(firstPost).toBeVisible();
  });

  test("clicking a blog post title navigates to blog post detail", async ({ page }) => {
    await page.goto("/blog/");
    const firstPostLink = page.locator("article a").first();
    await firstPostLink.click();
    await expect(page).toHaveURL(/\/blog\/[^/]+\/$/);
  });

  test("blog post detail page renders title and Back to blog link", async ({ page }) => {
    await page.goto("/blog/closing-the-loop/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /back to blog/i })).toBeVisible();
  });

  test("Back to blog link works", async ({ page }) => {
    await page.goto("/blog/closing-the-loop/");
    await page.getByRole("link", { name: /back to blog/i }).click();
    await expect(page).toHaveURL(/\/blog\//);
  });

  test("non-existent blog slug shows 404 page", async ({ page }) => {
    await page.goto("/blog/non-existent-slug/");
    await expect(page.getByText(/404|not found/i)).toBeVisible();
  });
});
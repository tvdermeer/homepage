import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("header renders site name and nav links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Thomas van der Meer" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "CV", exact: true })).toBeVisible();
  });

  test("clicking Blog navigates to /blog/", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Blog", exact: true }).click();
    await expect(page).toHaveURL(/\/blog\//);
  });

  test("clicking CV navigates to /cv/", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "CV", exact: true }).click();
    await expect(page).toHaveURL(/\/cv\//);
  });

  test("clicking site name navigates to /", async ({ page }) => {
    await page.goto("/blog/");
    await page.getByRole("link", { name: "Thomas van der Meer" }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("footer renders with copyright and social links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByText(/© \d{4} Thomas van der Meer/i)).toBeVisible();
  });

  test("footer LinkedIn link has correct href", async ({ page }) => {
    await page.goto("/");
    const linkedInLink = page.getByRole("link", { name: /linkedin/i }).first();
    await expect(linkedInLink).toHaveAttribute("href", "https://www.linkedin.com/in/tvdermeer/");
  });

  test("footer GitHub link has correct href", async ({ page }) => {
    await page.goto("/");
    const githubLink = page.getByRole("link", { name: /github/i }).first();
    await expect(githubLink).toHaveAttribute("href", "https://github.com/tvdermeer");
  });
});
import { test, expect } from "@playwright/test";

test.describe("404 Page", () => {
  test("navigating to non-existent url shows 404 page", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByText(/404|not found/i)).toBeVisible();
  });

  test("go back home link navigates to homepage", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await page.getByRole("link", { name: /go back home/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
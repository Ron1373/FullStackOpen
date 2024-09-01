const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3000/api/testing/reset");
    await request.post("http://localhost:3000/api/users", {
      data: {
        name: "Test User",
        username: "testuser",
        password: "test123",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();

    await expect(page.getByText("login")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("testuser");
      await page.getByTestId("password").fill("test123");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Test User logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("testuser");
      await page.getByTestId("password").fill("test");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Wrong credentials")).toBeVisible();
    });
  });
});

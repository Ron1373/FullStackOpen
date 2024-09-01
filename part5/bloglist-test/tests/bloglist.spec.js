const { test, expect, beforeEach, describe } = require("@playwright/test");
const helper = require("./helper");

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
      await helper.loginWith(page, "testuser", "test123");

      await expect(page.getByText("Test User logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await helper.loginWith(page, "testuser", "test");
      await expect(page.getByText("Wrong credentials")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, "testuser", "test123");
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      await page.getByTestId("title").fill("test title");
      await page.getByTestId("author").fill("test author");
      await page.getByTestId("url").fill("testurl.com");

      await page.getByRole("button", { name: "Create" }).click();

      await expect(page.getByText("test title")).toBeVisible();
    });
  });
});

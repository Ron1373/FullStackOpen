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
    await request.post("http://localhost:3000/api/users", {
      data: {
        name: "Second Test User",
        username: "testuser2",
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
      await helper.createBlog(page, "test title", "test author", "testurl.com");
      await expect(page.getByText("test title")).toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      await helper.createBlog(page, "test title", "test author", "testurl.com");

      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByText("Likes: 0")).toBeVisible();
      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("Likes: 1")).toBeVisible();
    });

    test("user who added a blog can delete it", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      await helper.createBlog(page, "test title", "test author", "testurl.com");

      await page.getByRole("button", { name: "view" }).click();
      page.on("dialog", async (dialog) => {
        if (dialog.message().includes("Remove")) {
          await dialog.accept();
        } else {
          await dialog.dismiss();
        }
      });
      await page.getByRole("button", { name: "remove" }).click();

      await page.waitForTimeout(5500);
      await expect(page.getByText("test title")).not.toBeVisible();
    });

    test.only("blogs are arranged by likes", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      await helper.createBlog(page, "test title", "test author", "testurl.com");

      await helper.createBlog(
        page,
        "test title 2",
        "test author2",
        "testurl2.com"
      );

      const blogs = page.locator(".blog");
      await blogs.nth(0).getByRole("button", { name: "view" }).click();
      await blogs.nth(0).getByRole("button", { name: "like" }).click();

      await blogs.nth(1).getByRole("button", { name: "view" }).click();
      await blogs.nth(1).getByRole("button", { name: "like" }).click();
      await blogs.nth(1).getByRole("button", { name: "like" }).click();

      const firstBlogLikes = parseInt(
        await blogs.nth(0).locator('[data-testid="likes-count"]').innerText()
      );
      const secondBlogLikes = parseInt(
        await blogs.nth(1).locator('[data-testid="likes-count"]').innerText()
      );

      expect(firstBlogLikes).toBeGreaterThanOrEqual(secondBlogLikes);
    }, 30000);
  });
});

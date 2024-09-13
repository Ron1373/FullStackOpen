import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect, vi } from "vitest";

test("renders content", () => {
  const blog = {
    title: "test blog",
    author: "test author",
    url: "testurl.com",
    likes: 0,
    user: {
      name: "test user",
      username: "test username",
    },
  };

  const user = {
    name: "test user",
    username: "test username",
  };

  const { container } = render(<Blog blog={blog} user={user} />);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("test blog");
  expect(div).toHaveTextContent("test author");

  const detailsDiv = container.querySelector(".blog-details");
  expect(detailsDiv).not.toBeVisible();
});

test("clicking button shows url and number of likes", async () => {
  const blog = {
    title: "test blog",
    author: "test author",
    url: "testurl.com",
    likes: 0,
    user: {
      name: "test user",
      username: "test username",
    },
  };

  const user = {
    name: "test user",
    username: "test username",
  };

  const mockHandler = vi.fn();
  render(
    <Blog
      blog={blog}
      user={user}
      visible={false}
      toggleVisibility={mockHandler}
    />
  );

  const button = screen.getByText("view");
  const userMock = userEvent.setup();
  await userMock.click(button);

  const urlElement = screen.getByText(/testurl\.com/);
  expect(urlElement).toBeVisible();
  const likeElement = screen.getByText(/Likes: 0/);
  expect(likeElement).toBeVisible();
});

test("clicking button twice calls event handler twice", async () => {
  const blog = {
    title: "test blog",
    author: "test author",
    url: "testurl.com",
    likes: 0,
    user: {
      name: "test user",
      username: "test username",
    },
  };

  const user = {
    name: "test user",
    username: "test username",
  };

  const mockHandler = vi.fn();

  render(
    <Blog
      blog={blog}
      user={user}
      visible={false}
      toggleVisibility={mockHandler}
    />
  );

  const button = screen.getByText("view");
  const userMock = userEvent.setup();
  await userMock.click(button);
  await userMock.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

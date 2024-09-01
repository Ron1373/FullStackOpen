import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

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

  render(<Blog blog={blog} user={user} />);

  const button = screen.getByText("view");
  const userMock = userEvent.setup();
  await userMock.click(button);

  const urlElement = await screen.findByText(/testurl\.com/);
  expect(urlElement).toBeVisible();
  const likeElement = await screen.findByText(/Likes: 0/);
  expect(likeElement).toBeVisible();
});

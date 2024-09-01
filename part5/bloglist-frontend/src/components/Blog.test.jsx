import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

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
  screen.debug();
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("test blog");
  expect(div).toHaveTextContent("test author");

  const detailsDiv = container.querySelector(".blog-details");
  expect(detailsDiv).not.toBeVisible();
});

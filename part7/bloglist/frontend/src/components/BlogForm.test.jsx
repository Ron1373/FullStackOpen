import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const handleAddBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm handleAddBlog={handleAddBlog} />);

  const titleInput = screen.getByPlaceholderText("title");
  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");
  const createButton = screen.getByText("Create");

  await user.type(titleInput, "title");
  await user.type(authorInput, "author");
  await user.type(urlInput, "http://example.com");
  await user.click(createButton);

  expect(handleAddBlog).toHaveBeenCalledTimes(1);
  const newBlog = handleAddBlog.mock.calls[0][0];
  expect(newBlog).toEqual({
    title: "title",
    author: "author",
    url: "http://example.com",
  });
});

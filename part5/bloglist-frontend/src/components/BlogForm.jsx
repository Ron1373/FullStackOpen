import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  setNotificationMessage,
  setErrorMessage,
  user,
  setBlogs,
}) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      blogService.setToken(user.token);
      await blogService.create(newBlog);
      setNotificationMessage(
        `A new blog ${newBlog.title} by ${newBlog.author} was added.`
      );
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
      });
      setTimeout(() => {
        setNotificationMessage("");
      }, 5000);
      setNewBlog({ title: "", author: "", url: "" });
    } catch {
      setErrorMessage("Unable to create new blog");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            value={newBlog.title}
            onChange={(event) => {
              setNewBlog((prev) => ({ ...prev, title: event.target.value }));
            }}
            id="title"
            name="title"
          />
        </div>

        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            value={newBlog.author}
            onChange={(event) => {
              setNewBlog((prev) => ({ ...prev, author: event.target.value }));
            }}
            id="author"
            name="author"
          />
        </div>

        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            value={newBlog.url}
            onChange={(event) => {
              setNewBlog((prev) => ({ ...prev, url: event.target.value }));
            }}
            name="url"
            id="url"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default BlogForm;

import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ handleAddBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  return (
    <>
      <h2>Create New Blog</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAddBlog(newBlog);
          setNewBlog({ title: "", author: "", url: "" });
        }}
      >
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
            placeholder="title"
            data-testid="title"
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
            placeholder="author"
            data-testid="author"
          />
        </div>

        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            value={newBlog.url}
            placeholder="url"
            onChange={(event) => {
              setNewBlog((prev) => ({ ...prev, url: event.target.value }));
            }}
            name="url"
            id="url"
            data-testid="url"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default BlogForm;

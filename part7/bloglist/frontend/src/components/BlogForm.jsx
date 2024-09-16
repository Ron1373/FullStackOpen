import { Button, TextField } from "@mui/material";
import { useState } from "react";

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
          <TextField
            value={newBlog.title}
            onChange={(event) => {
              setNewBlog((prev) => ({ ...prev, title: event.target.value }));
            }}
            label="title"
            data-testid="title"
            size="small"
          />
        </div>

        <div>
          <TextField
            value={newBlog.author}
            onChange={(event) => {
              setNewBlog((prev) => ({ ...prev, author: event.target.value }));
            }}
            label="author"
            data-testid="author"
            size="small"
          />
        </div>

        <div>
          <TextField
            value={newBlog.url}
            label="url"
            onChange={(event) => {
              setNewBlog((prev) => ({ ...prev, url: event.target.value }));
            }}
            data-testid="url"
            size="small"
          />
        </div>
        <Button type="submit" variant="contained" color="success">
          Create
        </Button>
      </form>
    </>
  );
};

export default BlogForm;

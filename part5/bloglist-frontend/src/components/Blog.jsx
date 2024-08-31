import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [newBlog, setNewBlog] = useState(blog);
  return (
    <div style={blogStyle}>
      {newBlog.title} {newBlog.author}
      <Togglable showButtonLabel="view" hideButtonLabel="hide">
        {blog.url}
        <br />
        Likes: {newBlog.likes}
        <button
          onClick={() => {
            blogService.addLike(newBlog);
            setNewBlog((prev) => ({ ...prev, likes: prev.likes + 1 }));
          }}
        >
          like
        </button>
        <br />
        {newBlog.user.name}
      </Togglable>
    </div>
  );
};

export default Blog;

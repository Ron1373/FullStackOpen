import blogService from "../services/blogs";
import { useState } from "react";
const Blog = ({ blog, user, setBlogs }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const removeBlog = () => (
    <button
      onClick={async () => {
        try {
          if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            await blogService.deletePost(blog);
            blogService.getAll().then((blogs) => {
              setBlogs(blogs);
            });
          }
        } catch (error) {
          console.log("Error deleting blog:", error);
        }
      }}
    >
      Remove
    </button>
  );

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <div>
        <button
          style={{ display: visible ? "none" : "block" }}
          onClick={toggleVisibility}
        >
          view
        </button>
        <div
          style={{ display: visible ? "" : "none" }}
          className="blog-details"
        >
          {blog.url}
          <br />
          Likes: {blog.likes}
          <button
            onClick={async () => {
              await blogService.addLike(blog);
              blogService.getAll().then((blogs) => {
                setBlogs(blogs);
              });
            }}
          >
            like
          </button>
          <br />
          {blog.user.name}
          {blog.user.name === user.name && removeBlog()}
          <button
            style={{ display: visible ? "block" : "none" }}
            onClick={toggleVisibility}
          >
            hide
          </button>
        </div>
        <br />
      </div>
    </div>
  );
};
export default Blog;

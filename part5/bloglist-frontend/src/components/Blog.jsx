import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable showButtonLabel="view" hideButtonLabel="hide">
        {blog.url}
        <br />
        Likes: {blog.likes}
        <button
          onClick={async () => {
            const updatedBlog = await blogService.addLike(blog);
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
      </Togglable>
    </div>
  );
};

export default Blog;

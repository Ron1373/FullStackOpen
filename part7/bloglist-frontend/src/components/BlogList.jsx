import { Link } from "react-router-dom";
const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div style={blogStyle}> {blog.title}</div>
          </Link>
        ))}
    </>
  );
};

export default BlogList;

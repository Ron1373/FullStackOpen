import Blog from "./Blog";

const BlogList = ({ blogs, setBlogs, user }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} setBlogs={setBlogs} blog={blog} user={user} />
        ))}
    </>
  );
};

export default BlogList;

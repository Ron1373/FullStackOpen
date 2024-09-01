import Blog from "./Blog";
import { useState } from "react";

const BlogList = ({ blogs, setBlogs, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            setBlogs={setBlogs}
            blog={blog}
            user={user}
            toggleVisibility={toggleVisibility}
            visible={visible}
          />
        ))}
    </>
  );
};

export default BlogList;

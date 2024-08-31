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

  const [likes, setLikes] = useState(blog.likes);
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable showButtonLabel="view" hideButtonLabel="hide">
        {blog.url}
        <br />
        Likes: {likes}
        <button
          onClick={async () => {
            const updatedBlog = await blogService.addLike(blog);
            setLikes(updatedBlog.likes);
          }}
        >
          like
        </button>
        <br />
        {blog.user.name}
      </Togglable>
    </div>
  );
};

export default Blog;

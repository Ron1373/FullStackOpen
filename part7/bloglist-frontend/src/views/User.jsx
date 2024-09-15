import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { useParams } from "react-router-dom";

const User = () => {
  const id = useParams().id;

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  if (isLoading) {
    return <p>Loading user data</p>;
  }
  const user = users.find((u) => u.id === id);
  return (
    <>
      <h1>{user.name}</h1>
      <h2>Added Blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;

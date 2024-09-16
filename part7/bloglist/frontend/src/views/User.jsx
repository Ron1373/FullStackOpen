import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

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
      <TableContainer>
        <Table>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default User;

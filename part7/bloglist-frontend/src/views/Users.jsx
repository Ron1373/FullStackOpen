import { useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "../services/users";

const Users = () => {
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.username}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;

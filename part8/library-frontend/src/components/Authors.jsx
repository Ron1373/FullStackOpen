import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, CHANGE_YEAR } from "./queries";
import { useState } from "react";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);

  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const [editAuthor] = useMutation(CHANGE_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return <p>Loading authors data...</p>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, setBornTo: Number(year) } });
    setName("");
    setYear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="year">Born: </label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default Authors;

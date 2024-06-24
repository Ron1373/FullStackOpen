const Persons = ({ data }) => (
  <ul>
    {data.map((person) => (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    ))}
  </ul>
);
export default Persons;

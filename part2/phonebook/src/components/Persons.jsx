const Persons = ({ data, deleteContact }) => (
  <ul>
    {data.map((person) => (
      <li key={person.name}>
        {person.name} {person.number}
        <button onClick={deleteContact} id={person.id} name={person.name}>
          delete
        </button>
      </li>
    ))}
  </ul>
);
export default Persons;

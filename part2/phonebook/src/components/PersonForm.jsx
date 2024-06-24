const PersonForm = ({
  addNewPerson,
  newName,
  newPhone,
  inputNewName,
  inputNewPhone,
}) => (
  <form onSubmit={addNewPerson}>
    <div>
      name: <input value={newName} onChange={inputNewName} />
    </div>
    <div>
      number: <input value={newPhone} onChange={inputNewPhone} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
export default PersonForm;

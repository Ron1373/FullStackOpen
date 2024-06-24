import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterData, setFilterData] = useState("");
  const [filteredArray, setFilteredArray] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  const inputNewName = (event) => {
    setNewName(event.target.value);
  };
  const inputNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const newNameObject = { name: newName, number: newPhone };
    let notANewName = false;
    persons.forEach((person) => {
      if (person.name === newNameObject.name) {
        alert(`${newName} is already added to phonebook`);
        notANewName = true;
      }
    });
    if (notANewName) {
      return;
    }
    setPersons(persons.concat(newNameObject));
    setFilteredArray(persons);

    setNewName("");
    setNewPhone("");
  };
  const filterName = (event) => {
    setFilterData(event.target.value.toLowerCase());
    const newFilteredArray = persons.filter((person) =>
      person.name.toLowerCase().includes(filterData)
    );
    setFilteredArray(newFilteredArray);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter data={filterData} handleChange={filterName} />

      <h2>add a new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        inputNewName={inputNewName}
        newPhone={newPhone}
        inputNewPhone={inputNewPhone}
      />

      <h2>Numbers</h2>
      <Persons data={filteredArray} />
    </div>
  );
};

export default App;

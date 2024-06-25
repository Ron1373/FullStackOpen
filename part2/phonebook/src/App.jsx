import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";
import contacts from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterData, setFilterData] = useState("");
  const [filteredArray, setFilteredArray] = useState();

  useEffect(() => {
    contacts.getAll().then((contactData) => {
      setPersons(contactData);
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
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace old number with new one?`
          )
        ) {
          contacts.update(person.id, newNameObject).then((updatedContact) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : updatedContact))
            );
            setNewName("");
            setNewPhone("");
          });
        }
        notANewName = true;
      }
    });
    if (notANewName) {
      return;
    }

    contacts.create(newNameObject).then((returnedContact) => {
      console.log(returnedContact);
      setPersons(persons.concat(returnedContact));

      setNewName("");
      setNewPhone("");
    });
  };
  const filterName = (event) => {
    setFilterData(event.target.value.toLowerCase());
    if (!event.target.value) {
      setFilteredArray();
    } else {
      setFilteredArray(
        persons.filter((person) =>
          person.name.toLowerCase().includes(filterData)
        )
      );
    }
  };

  const deleteContact = (event) => {
    if (window.confirm(`delete ${event.target.name}`)) {
      contacts.remove(event.target.id);
      setPersons(persons.filter((person) => person.id !== event.target.id));
    }
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
      <Persons data={filteredArray || persons} deleteContact={deleteContact} />
    </div>
  );
};

export default App;

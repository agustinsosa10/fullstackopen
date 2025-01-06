import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import axios from 'axios'
import personService from './persons'
import { use } from "react";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState([]);
  const [newNumber, setNewNumber] = useState("");

  useEffect( () => {
        personService
        .getAll()
        .then(initialPersons => {
          console.log('datos obtenidos del servidor', initialPersons)
          setPersons(initialPersons)
        })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    
    personService
    .create(personObject)
    .then(response => {
      console.log('Persona creada:', response)
      const updatePersons = persons.concat(response.data)
      setPersons(updatePersons);
      setNewNumber("");
      setNewName("");
    })
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };


  return (
    <>

      <h2>Phonebook</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {persons.map((person, i) => (
          <p key={i}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;

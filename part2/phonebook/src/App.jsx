import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import personService from "./service/persons";
import { use } from "react";
import FilterPersons from "./components/FilterPersons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        console.log("datos obtenidos del servidor", initialPersons);
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error("error obeteniendo datos del servidor", error);
      });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const personToUpdate = persons.find( person => person.name === personObject.name)
    console.log(personToUpdate)
    if(personToUpdate) {
      const update = window.confirm(`seguro que quiere actualizar los datos de ${personToUpdate.name}`)
      if(update) {
        console.log(personToUpdate.id)
        personService
        .update(personToUpdate.id, personObject)
        .then(updatedPerson => {
          console.log(updatedPerson)
          setPersons( persons.map( person => person.id === personToUpdate.id ? updatedPerson : person ) )
          })
          setNewName("")
          setNewNumber("")
      }else {
        setNewName("")
        setNewNumber("")
        return
      }
    }
    else {
    personService.create(personObject).then((response) => {
      console.log("APP, datos de la persona:", response);
      const newPersons = persons.concat(response);
      setPersons(newPersons);
      setNewNumber("");
      setNewName("");
    });
  }
    
  };

  const removeName = (id, name) => {
    const remove = window.confirm(`seguro que quiere eliminar a ${name}`)
    if(remove) {
      console.log(remove)
      console.log(id)
      personService
      .remove(id)
      .then( () => {
        const personToRemove = persons.filter(person => person.id !== id)
        console.log(personToRemove)
        setPersons( personToRemove)
      })
      .catch(error => console.error('persona no encontrada', error))
    }
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
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
            <FilterPersons key={person.id} person={person} removeName={removeName}/>
        ))}
      </div>
    </>
  );
}

export default App;

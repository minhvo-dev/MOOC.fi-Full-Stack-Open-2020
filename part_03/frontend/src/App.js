import React, { useState, useEffect } from "react";

import peopleService from "./services/people"

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import People from "./components/People";
import Notification from "./components/Notification";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(undefined);

  useEffect(() => {
    peopleService
      .getAll()
      .then(people => {
        setPeople(people);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  /* name input */
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  /* phone input */
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  /* add button */
  const addPerson = (event) => {
    event.preventDefault();
    const person = people.find(person => person.name === newName);
    if (person === undefined) {
      const personObject = {
        name: newName,
        number: newNumber
      };

      peopleService
        .create(personObject)
        .then(returnedPerson => {
          displayNotification({
            message: `Added ${returnedPerson.name}`,
            styleClass: "success"
          });
          setPeople(people.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          displayNotification({
            message: error.response.data.error,
            styleClass: "error"
          });
          console.log(error);
        });
    }
    else {
      if (window.confirm(`${person.name} is already added to phonebook. Replace the old number with a new one?`)) {
        const newInfo = { ...person, number: newNumber };
        peopleService
          .update(newInfo)
          .then(returnedPerson => {
            displayNotification({
              message: `${newInfo.name}'number has been changed to ${newInfo.number}`,
              styleClass: "success"
            });
            setPeople(people.map(p => p.id !== newInfo.id ? p : returnedPerson));
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            displayNotification({
              message: error.response.data.error,
              styleClass: "error"
            });
            console.log(error);
          });
      }
    }
  }

  /* remove person */
  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      peopleService
        .remove(person.id)
        .then(() => {
          displayNotification({
            message: `${person.name} has been removed`,
            styleClass: "success"
          });
          setPeople(people.filter(p => p.id !== person.id));
        })
        .catch(error => {
          displayNotification({
            message: error.response.data.error,
            styleClass: "error"
          });
          setPeople(people.filter(p => p.id !== person.id));
          console.log(error);
        });
    }
  }

  /* filter input */
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const peopleToShow = people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  /* display the notification */
  const displayNotification = (notification) => {
    const NOTIFICATION_TIME_OUT = 4_000;
    setNotification(notification);
    setTimeout(() => {
      setNotification(undefined);
    }, NOTIFICATION_TIME_OUT);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter
        filter={filter}
        onChange={handleFilterChange}
      />

      <h2>Add a new person</h2>
      <PersonForm
        name={newName}
        nameOnChange={handleNameChange}
        number={newNumber}
        numberOnChange={handleNumberChange}
        addPerson={addPerson} />

      <h2>Numbers</h2>
      <People people={peopleToShow} removePerson={removePerson} />
    </div>
  )
}

export default App;
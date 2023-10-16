import React, { useState, useEffect } from "react";

// COMPONENTS
import Notification from "./components/Notification";
import ShowPeople from "./components/showPeople";
import Filter from "./components/Filter";

// STYLES
import "./App.css";
import PersonForm from "./components/PersonForm";
import { getAll } from "./components/api";

const App = () => {
  const [people, setPeople] = useState([]);
  const [showPeople, setShowPeople] = useState([...people]);
  const [newInput, setNewInput] = useState({ name: "", phone: "" });
  const [message, setMessage] = useState({ message: "", errorType: "" });

  useEffect(() => {
    getAll().then((data) => {
      setPeople(data);
      setShowPeople(data);
    });
  }, []);

  return (
    <div>
      <Notification message={message.message} errorType={message.errorType} />
      <h2>Phonebook</h2>
      <Filter setShowPeople={setShowPeople} people={people} />
      <h2>add a new</h2>
      <PersonForm
        setMessage={setMessage}
        setNewInput={setNewInput}
        setPeople={setPeople}
        setShowPeople={setShowPeople}
        newInput={newInput}
        people={people}
      />
      <h2>Numbers</h2>
      <ShowPeople
        setMessage={setMessage}
        showPeople={showPeople}
        setPeople={setPeople}
        setShowPeople={setShowPeople}
        people={people}
      />
    </div>
  );
};

export default App;

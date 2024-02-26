import { addNewPhone, create } from "./api";

const PersonForm = ({
  setMessage,
  setShowPeople,
  setNewInput,
  setPeople,
  newInput,
  people,
}) => {
  const handleSuccessMessage = (messageContent) => {
    setMessage({
      message: messageContent,
      errorType: "success",
    });
    setTimeout(() => {
      setMessage({ message: "", errorType: "" });
    }, 5000);
  };

  const addPerson = async (newPerson) => {
    console.log("newPerson", newPerson);
    const response = await create(newPerson);
    /* const newPeople = people.concat(response); */
    setPeople((prevState) => {
      const nuevo = [...prevState, response];
      return nuevo;
    });
    setShowPeople((prevState) => [...prevState, response]);
    handleSuccessMessage(`${newInput.name} was added!`);
    setNewInput({ name: "", number: "" });
  };

  const updatePerson = async (newPerson, id, setMessage) => {
    const response = await addNewPhone(newPerson, id, setMessage);
    const newPeople = people.map((element) => {
      if (element.id === id) {
        return { ...element, number: response.phnumberone };
      }
      return element;
    });
    setPeople(newPeople);
    setShowPeople(newPeople);
    handleSuccessMessage(
      `${response.name}'s phone number was changed to: ${response.number}!`
    );
  };

  const submitPerson = async (event) => {
    event.preventDefault();
    const founded = people.find((element) => element.name === newInput.name);
    const id = founded ? founded.id : null;
    const newPerson = {
      name: newInput.name,
      number: newInput.number,
    };
    if (!founded) {
      await addPerson(newPerson);
    } else if (
      window.confirm(
        `${newInput.name} is already added to phonebook, replace the old number with new one?`
      )
    ) {
      await updatePerson(newPerson, id, setMessage);
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setNewInput((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <form onSubmit={submitPerson}>
        <div>
          name:
          <input name="name" value={newInput.name} onChange={handleInput} />
        </div>
        <div>
          number:
          <input name="number" value={newInput.number} onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;

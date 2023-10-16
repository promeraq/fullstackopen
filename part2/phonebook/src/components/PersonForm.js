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
    const response = await create(newPerson);
    const newPeople = people.concat(response);
    setPeople(newPeople);
    setShowPeople(newPeople);
    handleSuccessMessage(`${newInput.name} was added!`);
    setNewInput({ name: "", phone: "" });
  };

  const updatePerson = async (newPerson, id, setMessage) => {
    const response = await addNewPhone(newPerson, id, setMessage);
    const newPeople = people.map((element) => {
      if (element.id === id) {
        return { ...element, phone: response.phone };
      }
      return element;
    });
    setPeople(newPeople);
    setShowPeople(newPeople);
    handleSuccessMessage(
      `${response.name}'s phone was changed to: ${response.phone}!`
    );
  };

  const submitPerson = async (event) => {
    event.preventDefault();
    const founded = people.find((element) => element.name === newInput.name);
    const id = founded ? founded.id : null;
    const newPerson = {
      name: newInput.name,
      phone: newInput.phone,
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
          <input name="phone" value={newInput.phone} onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;

import "../src/App.css";
import { deletePerson } from "./api";

const ShowPeople = ({
  showPeople,
  setPeople,
  people,
  setShowPeople,
  setMessage,
}) => {
  const handleDeletePerson = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      deletePerson(id, name, setMessage).then(() => {
        const newPeople = people.filter((element) => element.id !== id);
        setPeople(newPeople);
        setShowPeople(newPeople);
      });
    }
  };

  return (
    <>
      {showPeople.length > 0 && (
        <ul className="list">
          {showPeople.map((person) => (
            <li key={person.id} className="person">
              {person.name} {person.number}
              <button
                className="buttonDelete"
                onClick={() => handleDeletePerson(person.id, person.name)}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ShowPeople;

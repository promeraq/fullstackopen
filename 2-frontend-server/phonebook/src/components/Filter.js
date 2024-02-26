const Filter = ({ setShowPeople, people }) => {
  const filterPeople = (event) => {
    const name = event.target.value.toLowerCase();
    if (name) {
      const newList = people.filter((person) =>
        person.name.toLowerCase().includes(name)
      );
      setShowPeople(newList);
    } else {
      setShowPeople(people);
    }
  };
  return (
    <>
      <input onChange={filterPeople} />
    </>
  );
};

export default Filter;

import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

export const getAll = () => {
  return axios
    .get(BASE_URL)
    .then((response) => response.data)
    .catch((error) => console.log("get error", error));
};

export const create = (newPerson) => {
  return axios
    .post(BASE_URL, newPerson)
    .then((response) => response.data)
    .catch((error) => console.log("post error", error));
};

export const deletePerson = (id, name, setMessage) => {
  return axios
    .delete(`${BASE_URL}/${id}`, id)
    .then((response) => response.data)
    .catch((error) => {
      setMessage({
        message: `${name} was already deleted!`,
        errorType: "error",
      });
      setTimeout(() => {
        setMessage({ message: "", errorType: "" });
      }, 5000);
    });
};

export const addNewPhone = (newPerson, id, setMessage) => {
  return axios
    .put(`${BASE_URL}/${id}`, newPerson)
    .then((response) => response.data)
    .catch((error) => {
      setMessage({
        message: `${newPerson.name} has already been edited!`,
        errorType: "error",
      });
      setTimeout(() => {
        setMessage({ message: "", errorType: "" });
      }, 5000);
    });
};

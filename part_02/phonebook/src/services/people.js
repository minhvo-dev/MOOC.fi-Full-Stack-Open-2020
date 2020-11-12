import axios from "axios";

const baseUrl = "http://localhost:3001/people";

const getAll = () =>
  axios
    .get(baseUrl)
    .then(response => response.data);

const create = (person) =>
  axios
    .post(baseUrl, person)
    .then(response => response.data);

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`);

const update = (person) =>
  axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data);

const peopleService = {
  getAll,
  create,
  remove,
  update
}

export default peopleService;
import axios from "axios";
const ROOT_URL = "http://localhost:3001";

// GET CLIENTS
export function getClients() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/clients`)
      .then(function (response) {
        dispatch({ type: "GET_CLIENTS", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "GET_CLIENTS_REJECTED", payload: err })
      });
  }
}

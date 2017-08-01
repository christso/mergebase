import axios from "axios";
import { ROOT_URL } from '../locator';

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

// used for highlighting selected row in client list
export function selectClient(id) {
  return function (dispatch) {
    dispatch({ type: "SELECT_CLIENT", payload: id });
  }
}

export function findClient(id, newValues = {}) {
    return function (dispatch) {
      axios.get(`${ROOT_URL}/clients/${id}`)
        .then(function (response) {
          let data = { ...response.data, ...newValues };
          dispatch({ type: "FIND_CLIENT", payload: data })
        })
        .catch(function (err) {
          dispatch({ type: "FIND_CLIENT_REJECTED", payload: err })
        });
    }
};

// // GET AND SELECT CLIENTS
// export function getAndSelectClient(id) {
//   return function (dispatch) {
//     axios.get(`${ROOT_URL}/clients`)
//       .then(function (response) {
//         dispatch({ type: "GET_CLIENTS", payload: response.data });
//         dispatch({ type: "SELECT_CLIENT", payload: id });
//       })
//       .catch(function (err) {
//         dispatch({ type: "GET_CLIENTS_REJECTED", payload: err })
//       });
//   }
// }
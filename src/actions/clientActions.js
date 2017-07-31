import axios from "axios";
import { ROOT_URL } from '../locator';

// GET CLIENTS
export function getClients(callback) {
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

export function selectClient(id) {
  return function (dispatch) {
    dispatch({ type: "SELECT_CLIENT", payload: id });
  }
}

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
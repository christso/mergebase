import axios from "axios";
import {ROOT_URL} from '../locator';

// GET CLIENTS
export function getClients() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/clients`)
      .then(function (response) {
        console.log(response.data);
        dispatch({ type: "GET_CLIENTS", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "GET_CLIENTS_REJECTED", payload: err })
      });
  }
}

export function getSelectedClients() {
  
}

export function selectClients(clients) {
  return function (dispatch) {
    dispatch({type: "SELECT_CLIENTS", payload: clients});
  }
}
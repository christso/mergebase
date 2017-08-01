
import axios from "axios";
import {ROOT_URL} from '../locator';

export function getClients() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/clients-xplan`)
      .then(function (response) {
        console.log(response.data);
        dispatch({ type: "GET_CLIENTS_XPLAN", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "GET_CLIENTS_XPLAN_REJECTED", payload: err })
      });
  }
}


export function selectClient(id) {
  return function (dispatch) {
    dispatch({type: "SELECT_CLIENT_XPLAN", payload: id});
  }
}
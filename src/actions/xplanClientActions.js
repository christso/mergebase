
import axios from "axios";
import {ROOT_URL} from '../locator';

export function getClients() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/clients-xplan`)
      .then(function (response) {
        dispatch({ type: "GET_CLIENTS_XPLAN", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "GET_CLIENTS_XPLAN_REJECTED", payload: err })
      });
  }
}


export function setSelectedClients(keys) {
  return function (dispatch) {
    dispatch({ type: "SET_SELECTED_CLIENTS_XPLAN", payload: keys})
  }
}

export function selectClient(id) {
  return function (dispatch) {
    dispatch({type: "SELECT_CLIENT_XPLAN", payload: id});
  }
}

export function deselectClient(id) {
  return function (dispatch) {
    dispatch({type: "DESELECT_CLIENT_XPLAN", payload: id});
  }
}
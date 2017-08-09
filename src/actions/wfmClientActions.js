
import axios from "axios";
import {ROOT_URL} from '../locator';

export function getClients() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/clients-wfm`)
      .then(function (response) {
        dispatch({ type: "GET_CLIENTS_WFM", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "GET_CLIENTS_WFM_REJECTED", payload: err })
      });
  }
}

export function setWfmFilterItem(id, value) {
  return function (dispatch) {
    dispatch({ type: "SET_CLIENT_FILTER_ITEM_WFM", payload: { id: id, value: value}})
  } 
}

export function setFilter(filter) {
  return function (dispatch) {
    dispatch({ type: "SET_CLIENT_FILTER_WFM", payload: filter})
  } 
}

export function setSelectedClients(keys) {
  return function (dispatch) {
    dispatch({ type: "SET_SELECTED_CLIENTS_WFM", payload: keys})
  }
}

export function selectClient(id) {
  return function (dispatch) {
    dispatch({type: "SELECT_CLIENT_WFM", payload: id});
  }
}

export function deselectClient(id) {
  return function (dispatch) {
    dispatch({type: "DESELECT_CLIENT_WFM", payload: id});
  }
}
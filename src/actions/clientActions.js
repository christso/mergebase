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
export function toggleSelectClient(client) {
  return function (dispatch) {
    dispatch({ type: "TOGGLE_SELECT_CLIENT",
      payload: { _id: client._id, wfmId: client.wfmId, xplanId: client.xplanId,
        bglId: client.bglId } 
    });
  }  
}

export function selectClient(id) {
  return function (dispatch) {
    dispatch({ type: "SELECT_CLIENT", payload: id });
  }
}

export function deselectClient(id) {
  return function (dispatch) {
    dispatch({ type: "DESELECT_CLIENT", payload: id });
  }
}

export function setSelectedClients(keys) {
  return function (dispatch) {
    dispatch({ type: "SET_SELECTED_CLIENTS", payload: keys})
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

export function updateClient(client) {
  return function (dispatch) {
    axios.put(`${ROOT_URL}/clients/${client._id}`, client)
      .then(function(response) {
        dispatch({ type: "UPDATE_CLIENT", payload: client })
      })
      .catch(function (err) {
        dispatch({ type: "UPDATE_CLIENT_REJECTED", payload: err })
      });
  }
}
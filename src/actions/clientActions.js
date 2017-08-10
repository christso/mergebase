import axios from "axios";
import { ROOT_URL } from '../locator';
import { selectClient as wfmSelectClient, deselectClient as wfmDeselectClient } from './wfmClientActions';

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
    dispatch({
      type: "TOGGLE_SELECT_CLIENT",
      payload: {
        _id: client._id, wfmId: client.wfmId, xplanId: client.xplanId,
        bglId: client.bglId
      }
    });
  }
}

// toggles selection of all client lists
export function chainToggleSelectClient(client, isSelect) {
  return function (dispatch) {
    toggleSelectClient(client)(dispatch);
    if (isSelect) {
      wfmSelectClient(client.wfmId)(dispatch);
    } else {
      wfmDeselectClient(client.wfmId)(dispatch);
    }
  }
}

// syncs selection of Bind filter across all client lists
export function setBindFilter(filteredValue) {
  return function (dispatch) {
    dispatch({ type: "CLIENT_BIND_FILTER", payload: filteredValue});
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
    dispatch({ type: "SET_SELECTED_CLIENTS", payload: keys })
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
      .then(function (response) {
        dispatch({ type: "UPDATE_CLIENT", payload: client })
      })
      .catch(function (err) {
        dispatch({ type: "UPDATE_CLIENT_REJECTED", payload: err })
      });
  }
}

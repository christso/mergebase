
import axios from "axios";
import {ROOT_URL} from '../locator';

export function getWfmClients() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/clients-wfm`)
      .then(function (response) {
        console.log(response.data);
        dispatch({ type: "GET_CLIENTS_WFM", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "GET_CLIENTS_WFM_REJECTED", payload: err })
      });
  }
}
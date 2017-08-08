
import axios from "axios";
import {ROOT_URL} from '../locator';

export function getClients() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/bgl/clients`)
      .then(function (response) {
        console.log(response.data);
        dispatch({ type: "GET_CLIENTS_BGL", payload: response.data })
      })
      .catch(function (err) {
        dispatch({ type: "GET_CLIENTS_BGL_REJECTED", payload: err })
      });
  }
}
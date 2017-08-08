import axios from 'axios';
import {port} from './serverConfig';

const CLIENT_LIST_URL = `http://localhost:${port}/clients`;

function getClients(dispatch) {
    axios.get(CLIENT_LIST_URL)
    .then(function(response) {
        dispatch(response.data, undefined);
    })
    .catch(function(err) {
        dispatch("GET_CLIENTS_ERROR", err);
    });
}

module.exports = {
    getClients: getClients
};
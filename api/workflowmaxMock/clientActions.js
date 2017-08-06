var axios = require('axios');

const CLIENT_LIST_URL = `http://localhost:3002/clients`;

function getClients(dispatch) {
    axios.default.get(CLIENT_LIST_URL)
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
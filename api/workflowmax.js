var axios = require('axios');
var xml2js = require('xml2js');

const API_KEY = '14C10292983D48CE86E1AA1FE0F8DDFE';
const ACCOUNT_KEY = 'D49B57A36DA9443082ECC6639F26FC5A';

const CLIENT_LIST_URL = `https://api.workflowmax.com/client.api/list?apiKey=${API_KEY}&accountKey=${ACCOUNT_KEY}`;

function getClients(dispatch) {
    axios.default.get(CLIENT_LIST_URL)
    .then(function(response) {
        xml2js.parseString(response.data, function(err, jsResult) {
            dispatch(jsResult.Response.Clients[0].Client, undefined);
        })
    })
    .catch(function(err) {
        dispatch("GET_CLIENTS_ERROR", err);
    });
}

module.exports = {
    getClients: getClients
};
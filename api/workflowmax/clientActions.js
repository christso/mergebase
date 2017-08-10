import axios from 'axios';
import xml2js from 'xml2js';

const API_KEY = '14C10292983D48CE86E1AA1FE0F8DDFE';
const ACCOUNT_KEY = 'D49B57A36DA9443082ECC6639F26FC5A';

function getClients(done) {
    const url = `https://api.workflowmax.com/client.api/list?apiKey=${API_KEY}&accountKey=${ACCOUNT_KEY}`;
    axios.get(url)
        .then(function (response) {
            xml2js.parseString(response.data, function (err, jsResult) {

                let mappedClients = jsResult.Response.Clients[0].Client.map(function (client) {
                    return {
                        _id: client.ID[0],
                        name: client.Name[0],
                        address: client.Address[0].replace('\n', ''),
                        website: client.Website[0],
                        firstName: client.FirstName ? client.FirstName[0] : undefined,
                        lastName: client.LastName ? client.LastName[0] : undefined,
                        phone: client.Phone[0],
                        email: client.Email ? client.Email[0] : undefined
                    };
                });

                done(undefined, mappedClients);
            })
        })
        .catch(function (err) {
            done(err);
        });
}

function deleteClient(id, done) {
    const url = `https://api.workflowmax.com/client.api/list?apiKey=${API_KEY}&accountKey=${ACCOUNT_KEY}`;
    const body = `<Client>
    <ID>${id}</ID>
    </Client>`;
}

function updateClient(client, done) {
    const url = `https://api.workflowmax.com/client.api/update?apiKey=${API_KEY}&accountKey=${ACCOUNT_KEY}`

    let obj = {
        Client: {
            ID: client.wfmId,
            Name: client.name,
            Email: client.email,
            Phone: client.phone,
            Address: client.address
        }
    };
    var builder = new xml2js.Builder();
    const body = builder.buildObject(obj);

    axios.put(url, body)
        .then(function (response) {
            xml2js.parseString(response.data, function (err, jsResult) {
                let mappedClient = jsResult.Response.Client.map(function (client) {
                    return {
                        _id: client.ID[0],
                        name: client.Name[0],
                        address: client.Address[0].replace('\n', ''),
                        website: client.Website[0],
                        firstName: client.FirstName ? client.FirstName[0] : undefined,
                        lastName: client.LastName ? client.LastName[0] : undefined,
                        phone: client.Phone[0],
                        email: client.Email ? client.Email[0] : undefined
                    };
                })[0];

                done(undefined, mappedClient);
            })
        })
        .catch(function (err) {
            done(err);
        });
}

module.exports = {
    getClients: getClients,
    updateClient: updateClient
};
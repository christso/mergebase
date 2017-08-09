import { createSelector } from 'reselect'

const getClientList = state => state.clients.clients;
const getWfmClientList = state => state.wfmClients.clients;
const getXplanClientList = state => state.xplanClients.clients;

export const extendClientList = createSelector(
    [getClientList],
    (clients = []) => {
        clients.forEach(function (client) {
            client.binds = (client.wfmId ? 1 : 0)
                + (client.xplanId ? 1 : 0)
                + (client.bglId ? 1 : 0);
        });
        return clients;
    }
);

export const extendWfmClientList = createSelector(
    [getClientList, getWfmClientList],
    (clients = [], wfmClients = []) => {
        wfmClients.forEach(function (wfmClient) {
            const clientIndex = clients.findIndex(client => client.wfmId === wfmClient._id);
            if (clientIndex != -1) {
                wfmClient.intId = clients[clientIndex]._id; 
                wfmClient.binds = 1;
            } else {
                wfmClient.intId = undefined;
                wfmClient.binds = 0;
            }
        });
        return wfmClients;
    }
);

export const extendXplanClientList = createSelector(
    [getClientList, getXplanClientList],
    (clients = [], xplanClients = []) => {
        xplanClients.forEach(function (xplanClient) {
            const clientIndex = clients.findIndex(client => client.xplanId === xplanClient._id);
            if (clientIndex != -1) {
                xplanClient.intId = clients[clientIndex]._id; 
                xplanClient.binds = 1;
            } else {
                xplanClient.intId = undefined;
                xplanClient.binds = 0;
            }
        });
        return xplanClients;
    }
);



/* Merge List */
export const getClientMergeList = createSelector(
    [getClientList, getWfmClientList, getXplanClientList],
    (clients = [], wfmClients = [], xplanClients = []) => {
        clients = clients.map((client) => {
            client.source = "INT";
            client.intFlag = 1;
            client.wfmFlag = 0;
            client.xplanFlag = 0;
            client.matchName = client.name;
            return client;
        });
        wfmClients = wfmClients.map((client) => {
            client.source = "WFM";
            client.intFlag = 0;
            client.wfmFlag = 1;
            client.xplanFlag = 0;
            client.matchName = client.name;
            return client;
        });
        xplanClients = xplanClients.map((client) => {
            client.source = "XPLAN";
            client.intFlag = 0;
            client.wfmFlag = 0;
            client.xplanFlag = 1;
            client.matchName = client.name;
            return client;
        });        
        console.log("xplan Clients", xplanClients);
        let combined = [];
        return combined.concat(clients).concat(wfmClients).concat(xplanClients);
    }
);

const groupByClientOnSource = (clients = []) => {
    var groupToValues = clients.reduce(function (obj, item) {
        obj[item.name] = obj[item.name] || {};
        let resItem = obj[item.name];

        resItem.email = item.email;
        resItem.phone = item.phone;

        if (!resItem.wfmFlag) resItem.wfmFlag = 0;
        if (!resItem.intFlag) resItem.intFlag = 0;
        if (item.source === "WFM")
            resItem.wfmFlag = resItem.wfmFlag + 1;
        else if (item.source === "INT")
            resItem.intFlag = resItem.intFlag + 1;
        return obj;
    }, {});
    var groups = Object.keys(groupToValues).map(function (key) {
        return {
            name: key,
            intFlag: groupToValues[key].intFlag,
            wfmFlag: groupToValues[key].wfmFlag,
            email: groupToValues[key].email,
            phone: groupToValues[key].phone
        };
    });
    return groups;
}
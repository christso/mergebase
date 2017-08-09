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
            const clientIndex = clients.findIndex(client => client.wfmId === wfmClient.wfmId);
            if (clientIndex != -1) {
                wfmClient._id = clients[clientIndex]._id; 
                wfmClient.binds = 1;
            } else {
                wfmClient._id = undefined;
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
                xplanClient._id = clients[clientIndex]._id; 
                xplanClient.binds = 1;
            } else {
                xplanClient._id = undefined;
                xplanClient.binds = 0;
            }
        });
        return xplanClients;
    }
);



/* Merge List */
export const getClientMergeList = createSelector(
    [getClientList, getWfmClientList],
    (clients = [], wfmClients = []) => {
        let combined = [];
        clients = clients.map((client) => {
            client.source = "INT";
            return client;
        });
        wfmClients = wfmClients.map((client) => {
            client.source = "WFM";
            return client;
        });
        combined = combined.concat(clients);
        combined = combined.concat(wfmClients);
        combined = groupByClientOnSource(combined);
        return combined;
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
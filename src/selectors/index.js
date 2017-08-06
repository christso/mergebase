import { createSelector } from 'reselect'

const getClientList = state => state.clients.clients;

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


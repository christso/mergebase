import { extendClientList } from '../selectors/index';

function toggleSelectClient(state, action) {

    const currentClients = state.selectedClients;
    const clientIdIndex = currentClients.findIndex(function (client) {
        return client._id === action.payload._id;
    });
    // if client is not selected, append to selection
    // else, remove from selection
    if (clientIdIndex === -1) {
        return { ...state, selectedClients: [...state.selectedClients, action.payload] };
    } else {
        return {
            ...state, selectedClients: [
                ...currentClients.slice(0, clientIdIndex),
                ...currentClients.slice(clientIdIndex + 1)
            ]
        }
    }    
}

export function clientReducers(state = {
    clients: [],
    selectedClients: []
}, action) {

    switch (action.type) {
        case "GET_CLIENTS":
            return { ...state, clients: [...action.payload] };
        case "SET_SELECTED_CLIENTS":
            return { ...state, selectedClients: [...action.payload] };
        case "SELECT_CLIENT":
            return { ...state, selectedClients: [...state.selectedClients, action.payload] };
        case "DESELECT_CLIENT":
            const currentClientIds = state.selectedClients;
            const clientIdIndex = currentClientIds.findIndex(function (id) {
                return id === action.payload;
            });

            return {
                ...state, selectedClients: [
                    ...currentClientIds.slice(0, clientIdIndex),
                    ...currentClientIds.slice(clientIdIndex + 1)
                ]
            };
        case "TOGGLE_SELECT_CLIENT":
            return toggleSelectClient(state, action);
        case "FIND_CLIENT":
            return { ...state, foundClient: action.payload };
        case "UPDATE_CLIENT":
            const clientsToUpdate = state.clients;
            const clientToUpdate = action.payload;
            const indexToUpdate = clientsToUpdate.findIndex(
                function (client) {
                    return client._id === clientToUpdate._id;
                }
            );
            const newClientsToUpdate = [
                ...clientsToUpdate.slice(0, indexToUpdate), clientToUpdate, ...clientsToUpdate.slice(indexToUpdate + 1)
            ];
            // console.log("UPDATE_CLIENT -> newClientsToUpdate", newClientsToUpdate);
            return { ...state, clients: [...newClientsToUpdate], updatedClient: action.payload };
        default:
            return state;
    }
}

export default clientReducers;
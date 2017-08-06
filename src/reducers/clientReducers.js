import {extendClientList} from '../selectors/index';

export function clientReducers(state = {
    clients: [],
    selectedClientIds: []
}, action) {

    switch (action.type) {
        case "GET_CLIENTS":
            return { ...state, clients: [...action.payload] };      
        case "SET_SELECTED_CLIENTS":
            return { ...state, selectedClientIds: [...action.payload]};
        case "SELECT_CLIENT":
            return { ...state, selectedClientIds: [...state.selectedClientIds, action.payload] };
        case "DESELECT_CLIENT":
            const currentClientIds = state.selectedClientIds;
            const clientIdIndex = currentClientIds.findIndex(function(id) {
                return id === action.payload;
            });        

            return { ...state, selectedClientIds: [
                ...currentClientIds.slice(0, clientIdIndex),
                ...currentClientIds.slice(clientIdIndex+1)
            ] };            
        case "FIND_CLIENT":
            return {...state, foundClient: action.payload };
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
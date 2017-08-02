export function clientReducers(state = {
    clients: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS":
            return { ...state, clients: [...action.payload] };      
        case "SELECT_CLIENT":
            return { ...state, selectedClientId: action.payload };
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
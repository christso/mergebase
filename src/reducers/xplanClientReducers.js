export function clientReducers(state = {
    clients: [],
    selectedClients: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS_XPLAN":
            return { ...state, clients: [...action.payload] };      
        case "SET_SELECTED_CLIENTS_XPLAN":
            return { ...state, selectedClients: [...action.payload]};            
        case "SELECT_CLIENT_XPLAN":
            return { ...state, selectedClients: [...state.selectedClients, action.payload] };
        case "DESELECT_CLIENT_XPLAN":
            const currentClientIds = state.selectedClients;
            const clientIdIndex = currentClientIds.findIndex(function(id) {
                return id === action.payload;
            });        

            return { ...state, selectedClients: [
                ...currentClientIds.slice(0, clientIdIndex),
                ...currentClientIds.slice(clientIdIndex+1)
            ] };  
        default:
            return state;
    }
}

export default clientReducers;
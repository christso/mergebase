export function clientReducers(state = {
    clients: [],
    selectedClientIds: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS_WFM":
            return { ...state, clients: [...action.payload] };
        case "SET_SELECTED_CLIENTS_WFM":
            return { ...state, selectedClientIds: [...action.payload]};            
        case "SELECT_CLIENT_WFM":
            return { ...state, selectedClientIds: [...state.selectedClientIds, action.payload] };
        case "DESELECT_CLIENT_WFM":
            const currentClientIds = state.selectedClientIds;
            const clientIdIndex = currentClientIds.findIndex(function(id) {
                return id === action.payload;
            });        

            return { ...state, selectedClientIds: [
                ...currentClientIds.slice(0, clientIdIndex),
                ...currentClientIds.slice(clientIdIndex+1)
            ] };               
        default:
            return state;
    }
}

export default clientReducers;
export function clientReducers(state = {
    clients: [],
    selectedClients: [],
    filtered: []
}, action) {
    const setClientFilter = (state, action) => {
        const currentFiltered = state.filtered;
        const filterToUpdateIndex = currentFiltered.findIndex((el) => {
            return el.id === action.payload.id;
        });
        return {
            ...state,
            filtered: action.payload
        };
    }

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
        case "SET_CLIENT_FILTER_XPLAN":
            setClientFilter(state, action);            
        default:
            return state;
    }
}

export default clientReducers;
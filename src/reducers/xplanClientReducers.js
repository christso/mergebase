export function clientReducers(state = {
    clients: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS_XPLAN":
            return { clients: [...action.payload] };      
        case "SELECT_CLIENT_XPLAN":
            return { ...state, selectedClientId: action.payload };
        default:
            return state;
    }
}

export default clientReducers;
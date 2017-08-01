export function clientReducers(state = {
    clients: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS_WFM":
            return { clients: [...action.payload] };
        case "SELECT_CLIENT_WFM":
            return { ...state, selectedClientId: action.payload };
        default:
            return state;
    }
}

export default clientReducers;
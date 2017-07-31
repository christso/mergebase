export function clientReducers(state = {
    clients: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS":
            return { ...state, clients: [...action.payload] };      
        case "SELECT_CLIENT":
            return { ...state, selectedClientId: action.payload };
        default:
            return state;
    }
}

export default clientReducers;
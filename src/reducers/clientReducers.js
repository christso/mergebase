export function clientReducers(state = {
    clients: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS":
            return { clients: [...action.payload] };      
        case "SELECT_CIENTS":
            console.log("SELECT CLIENTS_DATA", action.payload);
            return { ...state, selectedClients: [...action.payload] };
        default:
            return state;
    }
}

export default clientReducers;
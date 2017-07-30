export function bglClientReducers(state = {
    clients: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS_BGL":
            return { clients: [...action.payload] };      
        default:
            return state;
    }
}

export default bglClientReducers;
export function bglClientReducers(state = {
    clients: [],
    selectedClientIds: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS_BGL":
            return { ...state, clients: [...action.payload] };      
        default:
            return state;
    }
}

export default bglClientReducers;
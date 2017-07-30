export function wfmClientReducers(state = {
    clients: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS_WFM":
            return { clients: [...action.payload] };        
        default:
            return state;
    }
}

export default wfmClientReducers;
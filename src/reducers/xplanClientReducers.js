export function xplanClientReducers(state = {
    clients: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS_XPLAN":
            return { clients: [...action.payload] };      
        default:
            return state;
    }
}

export default xplanClientReducers;
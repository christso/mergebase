export function clientReducers(state = {
    clients: []
}, action) {
    switch (action.type) {
        case "GET_CLIENTS":
            return { clients: [...action.payload] };
        default:
            return state;
    }
}

export default clientReducers;
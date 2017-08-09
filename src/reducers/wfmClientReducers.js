export function clientReducers(state = {
    clients: [],
    selectedClients: [],
    filtered: []
}, action) {

    const setClientFilterItem = (state, action) => {
        const currentFiltered = state.filtered;
        const filterToUpdateIndex = currentFiltered.findIndex((el) => {
            return el.id === action.payload.id;
        });

        return {
            ...state,
            filtered: [
                ...currentFiltered.slice(0, filterToUpdateIndex),
                ...currentFiltered.slice(filterToUpdateIndex + 1),
                action.payload
            ]};
    }

    const setClientFilter = (state, action) => {
        return {
            ...state,
            filtered: action.payload
        };
    }

    switch (action.type) {
        case "GET_CLIENTS_WFM":
            return { ...state, clients: [...action.payload] };
        case "SET_SELECTED_CLIENTS_WFM":
            return { ...state, selectedClients: [...action.payload] };
        case "SELECT_CLIENT_WFM":
            return { ...state, selectedClients: [...state.selectedClients, action.payload] };
        case "DESELECT_CLIENT_WFM":
            const currentClientIds = state.selectedClients;
            const clientIdIndex = currentClientIds.findIndex(function (id) {
                return id === action.payload;
            });

            return {
                ...state, selectedClients: [
                    ...currentClientIds.slice(0, clientIdIndex),
                    ...currentClientIds.slice(clientIdIndex + 1)
                ]
            };
        case "SET_CLIENT_FILTER_WFM":
            return setClientFilter(state, action);
        case "SET_CLIENT_FILTER_ITEM_WFM":
            return setClientFilterItem(state, action);
        default:
            return state;
    }
}

export default clientReducers;

                // filtered: [...currentFiltered.slice(0, filterToUpdateIndex),
                //     ...currentFiltered.slice(filterToUpdateIndex+1),
                //      action.payload
                //     ]};
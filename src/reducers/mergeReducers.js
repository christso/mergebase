export function mergeReducers(state = []
, action) {
    switch (action.type) {
        case "SELECT_MERGE_CELL":
            return [...state, action.payload];
        case "DESELECT_MERGE_CELL":
        default:
            return state;
    }
}

export default mergeReducers;
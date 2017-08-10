export function mergeReducers(state = []
    , action) {
    const cells = state;
    switch (action.type) {
        case "TOGGLE_SELECT_MERGE_CELL":
            return function toggleSelectMergeCell() {
                const cellToDeselectIndex = cells.findIndex((cell) =>
                    cell.matchName === action.payload.matchName
                    && cell.source === action.payload.source);
                if (cellToDeselectIndex > -1) {
                    return [...cells.slice(0, cellToDeselectIndex), ...cells.slice(cellToDeselectIndex + 1)];
                }
                return [...state, action.payload];
            }();
        case "SELECT_MERGE_CELL":
            return [...state, action.payload];
        case "DESELECT_MERGE_CELL":
            return function deselectMergeCell() {
                const cellToDeselectIndex = cells.findIndex((cell) =>
                    cell.matchName === action.payload.matchName
                    && cell.source === action.payload.source);
                return [...cells.slice(0, cellToDeselectIndex), ...cells.slice(cellToDeselectIndex + 1)];
            }();
        case "RESET_MERGE_CELLS":
            return [];
        default:
            return state;
    }
}

export default mergeReducers;
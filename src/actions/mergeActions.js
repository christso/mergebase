export function selectMergeCell(matchName, source) {
  return function (dispatch) {
    dispatch({ type: "SELECT_MERGE_CELL", payload: { matchName: matchName, source: source }});
  }
}

export function resetMergeCells() {
  return function (dispatch) {
    dispatch({ type: "RESET_MERGE_CELLS", payload: { }});
  }
}

export function toggleSelectMergeCell(matchName, source) {
  return function (dispatch) {
    dispatch({ type: "TOGGLE_SELECT_MERGE_CELL", payload: { matchName: matchName, source: source }});
  }
}
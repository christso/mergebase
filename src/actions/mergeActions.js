export function selectMergeCell(matchName, source) {
  return function (dispatch) {
    dispatch({ type: "SELECT_MERGE_CELL", payload: { matchName: matchName, source: source }});
  }
}
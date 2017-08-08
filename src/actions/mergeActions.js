export function selectMergeCell(name, selection) {
  return function (dispatch) {
    dispatch({ type: "SELECT_MERGE_CELL", payload: { name: name, selection: selection }});
  }
}
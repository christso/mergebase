
export function setLoginStatus(targetStatus) {
  return function (dispatch) {
    dispatch({ type: "SET_LOGIN_STATUS", payload: targetStatus() })
  }
}
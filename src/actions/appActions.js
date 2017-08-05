
export function setLoginStatus(targetStatus) {
  return function (dispatch) {
    console.log("ACTION");
    dispatch({ type: "SET_LOGIN_STATUS", payload: targetStatus() })
  }
}
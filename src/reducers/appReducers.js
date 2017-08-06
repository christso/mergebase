export function appReducers(state = {
    isLoggedIn: true
}, action) {
    switch (action.type) {
        case "SET_LOGIN_STATUS":
            return { isLoggedIn: action.payload };     
        default:
            return state;
    }
}

export default appReducers;
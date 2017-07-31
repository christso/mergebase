const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FIND_CLIENT":
      return {
        data: action.payload
      }
    default:
      return state
  }
}

export default reducer

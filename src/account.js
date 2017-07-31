const reducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_ACCOUNT":
      return {
        data: action.data
      }
    default:
      return state
  }
}

/**
 * Simulates data loaded into this reducer from somewhere
 */
export const load = data => ({ type: "LOAD_ACCOUNT", data })

export default reducer

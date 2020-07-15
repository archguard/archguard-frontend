const initialState = false
  
function reducer(state = initialState, action) {
    switch (action.type) {
      case "SHOW_CONFIG":
        return true
      case "HIDDEN_CONFIG":
        return false
      default:
        return state;
    }
  }

  export default reducer
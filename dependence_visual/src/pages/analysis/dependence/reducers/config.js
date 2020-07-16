import _ from "lodash";

const initialState = []
  
function reducer(state = initialState, action) {
    switch (action.type) {
      case "RESET_CONFIG":
        return _.groupBy(action.payload, (item) => item.type);
      default:
        return state;
    }
  }

  export default reducer
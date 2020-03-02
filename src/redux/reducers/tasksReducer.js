import { LIST } from "../actions/getTasks";

let initialState = {
  list: [],
  isLoaded: false
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case LIST:
      return {
        ...state,
        list: action.payload.list,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}

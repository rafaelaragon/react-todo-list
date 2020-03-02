import { GET } from "../actions/getTask";

let initialState = {
  task: [],
  isLoaded: false
};

let tempList = [];
export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET:
      let tempId = action.payload.task.Id.S;
      tempList[tempId] = action.payload.task;
      return {
        ...state,
        task: tempList,
        isLoaded: action.payload.isLoaded
      };
    default:
      return state;
  }
}

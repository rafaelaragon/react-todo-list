import tasksReducer from "./tasksReducer";
import taskReducer from "./taskReducer";
import { combineReducers } from "redux";

export default combineReducers({
  tasksReducer,
  taskReducer
});

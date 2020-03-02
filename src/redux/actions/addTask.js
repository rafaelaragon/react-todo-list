import Axios from "axios";

export const ADD = "ADD";

//
export function addTask(id, name, desc) {
  return dispatch => {
    Axios.post(
      `https://4e19jgnd02.execute-api.us-east-1.amazonaws.com/default/createTask?id=` +
        id +
        `&name=` +
        name +
        `&desc=` +
        desc
    );
  };
}

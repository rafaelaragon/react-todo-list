import Axios from "axios";

export const EDIT = "EDIT";

//
export function editTask(id, name, desc) {
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

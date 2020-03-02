import Axios from "axios";

export const DELETE = "DELETE";

//
export function deleteTask(id) {
  return dispatch => {
    Axios.get(
      `https://4e19jgnd02.execute-api.us-east-1.amazonaws.com/default/deleteTask?id=` +
        id
    );
  };
}

import Axios from "axios";

export const GET = "GET";

//
export const loadTaskAction = (task, isLoaded) => ({
  type: GET,
  payload: { task, isLoaded }
});

//
export function getTask(id) {
  return dispatch => {
    Axios.get(
      `https://4e19jgnd02.execute-api.us-east-1.amazonaws.com/default/getTask?id=` +
        id
    ).then(res => {
      const task = res.data.Item;
      dispatch(loadTaskAction(task, true));
    });
  };
}

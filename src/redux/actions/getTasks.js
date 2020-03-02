import Axios from "axios";

export const LIST = "LIST";

//
export const loadListAction = (list, isLoaded) => ({
  type: LIST,
  payload: { list, isLoaded }
});

//
export function loadList() {
  return dispatch => {
    Axios.get(
      `https://4e19jgnd02.execute-api.us-east-1.amazonaws.com/default/getTasks`
    ).then(res => {
      const tasks = res.data.Items;
      dispatch(loadListAction(tasks, true));
    });
  };
}

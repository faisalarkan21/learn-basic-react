import Axios from "axios";

export const FETCH_USERS = "ADD_COUNTING";

export function fetchUsers(data) {
  return {
    type: FETCH_USERS,
    data
  };
}

export function getUsersThunk() {
  return dispatch => {
    return Axios.get("http://20.20.20.156:3008/api/users").then(
      ({ data }) => {
        
        
        dispatch(fetchUsers(data));
      }
    );
  };
}

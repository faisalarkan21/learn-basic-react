import Axios from "axios";

export const FETCH_USERS = "FETCH_USERS";

export function fetchUsers(data) {
  return {
    type: FETCH_USERS,
    data: data
  };
}

export function getUsersThunk() {
  return dispatch => {
    return Axios.get("http://20.20.20.156:3008/api/users").then(data => {
      // console.log('data-hasil-fetch1', data.data.data);
      const {
        data: { data: dataUsers }
      } = data;
      console.log("data-hasil-fetch2", dataUsers);
      dispatch(fetchUsers(dataUsers));
    });
  };
}



export function postUsersThunk() {
  return dispatch => {
    return Axios.post("http://20.20.20.156:3008/api/users",).then(data => {
      // console.log('data-hasil-fetch1', data.data.data);
      const {
        data: { data: dataUsers }
      } = data;
      console.log("data-hasil-fetch2", dataUsers);

      
      dispatch(getUsersThunk(dataUsers));
    });
  };
}

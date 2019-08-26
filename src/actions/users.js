import Axios from "axios";
import { toast } from "react-toastify";

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



export function postUsersThunk(data) {
  return dispatch => {
    return Axios.post("http://20.20.20.156:3008/api/add-user", data ).then(data => {
    dispatch(getUsersThunk())
    toast.success('Data Berhasil Disimpan!')
    }).catch((err) => {
      toast.error(JSON.stringify(err.message))
    })}
}


export function updateUsersThunk(data) {
  return dispatch => {
    return Axios.post("http://20.20.20.156:3008/api/update-user", data ).then(data => {
    dispatch(getUsersThunk())
    toast.success('Data Berhasil Disimpan!')
    }).catch((err) => {
      toast.error(JSON.stringify(err.message))
    })}
}

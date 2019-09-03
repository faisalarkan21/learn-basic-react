import Axios from "axios";
import { toast } from "react-toastify";
import { getResponse, postResponse } from "../util/api";

export const FETCH_USERS = "FETCH_USERS";
export const GET_DETAIL_USER = "GET_DETAIL_USER";

export function fetchUsers(data) {
  return {
    type: FETCH_USERS,
    data: data
  };
}

export function fetchSingelUser(data) {
  return {
    type: GET_DETAIL_USER,
    data: data
  };
}

export function getUsersThunk() {
  return dispatch => {
    return getResponse("/users").then(data => {
      // console.log('data-hasil-fetch1', data.data.data);
      const { data: dataUsers } = data;
      console.log("data-hasil-fetch2", dataUsers);
      dispatch(fetchUsers(dataUsers));
    });
  };
}

export function getDetailUserThunk(params) {
  return dispatch => {
    return getResponse(`/user${params}` ).then(res => {
      console.log('res', res)
      const { data: dataUsers } = res;
      console.log("data-hasil-fetch2", dataUsers);
      dispatch(fetchSingelUser(dataUsers));
    });
  };
}

export function postUsersThunk(data) {
  return dispatch => {
    return postResponse("add-user", data)
      .then(data => {
        dispatch(getUsersThunk());
        toast.success("Data Berhasil Disimpan!");
      })
      .catch(err => {
        toast.error(JSON.stringify(err.message));
      });
  };
}

export function updateUsersThunk(data) {
  return dispatch => {
    return postResponse("/update-user", data)
      .then(data => {
        dispatch(getUsersThunk());
        toast.success("Data Berhasil Disimpan!");
      })
      .catch(err => {
        toast.error(JSON.stringify(err.message));
      });
  };
}

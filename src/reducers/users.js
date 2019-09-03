import { FETCH_USERS, GET_DETAIL_USER } from "../actions/users";

export function getUsers(state = { data: [] }, action) {
    console.log('action getUsers', action)
  switch (action.type) {
    case FETCH_USERS:
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}


export function getDetailUser(state = { data: {} }, action) {
  console.log('action getUsers', action)
switch (action.type) {
  case GET_DETAIL_USER:
    return Object.assign({}, state, {
      data: action.data
    });
  default:
    return state;
}
}

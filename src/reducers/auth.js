import { LOGIN_SUBMIT } from "../actions/auth";


export function loginUser(state = { data: [] }, action) {
    console.log('action', action)
  switch (action.type) {
    case LOGIN_SUBMIT:
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}

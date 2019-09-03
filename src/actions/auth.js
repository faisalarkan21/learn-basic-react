import axios from 'axios';
import Cookies from 'cookies-js';
import { postResponse } from '../util/api';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';


export function loginOnRequest(data) {
  return {
    type: LOGIN_SUBMIT,
    data,
  };
}

export function postLogin(data) {
    return (dispatch) => {
      //   console.log('data', data)
      postResponse('/add-user', {email: data.username, password: data.password}).then(({data}) => {
          console.log('res', data);

          Cookies.set('token', data.token);
          Cookies.set('data', JSON.stringify({email: data.email}));
          Cookies.set('isValid', JSON.stringify({isValid: data.isValid}));

          dispatch(loginOnRequest(data))
      });
    };
  }
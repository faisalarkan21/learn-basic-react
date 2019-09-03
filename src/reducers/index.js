import { combineReducers } from 'redux';
import { countingAdd, countingMin } from './counting';
import { getUsers, getDetailUser } from './users';
import { loginUser } from './auth'


export default combineReducers({
    countingAdd,
    countingMin,
    getUsers,
    loginUser,
    getDetailUser
});

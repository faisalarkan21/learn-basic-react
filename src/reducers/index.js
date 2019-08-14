import { combineReducers } from 'redux';
import { countingAdd, countingMin } from './counting';
import { getUsers } from './users';


export default combineReducers({
    countingAdd,
    countingMin,
    getUsers
});

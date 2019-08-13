import { combineReducers } from 'redux';
import { countingAdd, countingMin } from './counting';


export default combineReducers({
    countingAdd,
    countingMin,
});

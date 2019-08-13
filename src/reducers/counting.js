

import { ADD_COUNTING, MIN_COUNTING } from '../actions/counting';

export function countingAdd(state = { data: 0 }, action) { 
    console.log('action1 countingAdd', action)
  switch (action.type) {
    case 'ADD_COUNTING':
      return Object.assign({}, state, {
        data: action.data +1,
      });
    default:
      return state;
  }
}


export function countingMin(state = { data: 0 }, action) { 
    console.log('action2 countingMin', action)
    switch (action.type) {
      case 'ADD_COUNTING':
        return Object.assign({}, state, {
          data: action.data - 1,
        });
      default:
        return state;
    }
  }
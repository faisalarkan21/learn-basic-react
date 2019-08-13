

export const ADD_COUNTING = 'ADD_COUNTING';
export const MIN_COUNTING = 'MIN_COUNTING';

export function addCounting(data) {
  return {
    type: 'ADD_COUNTING',
    data,
  };
}

export function minCounting(data) {
  return {
    type: MIN_COUNTING,
    data,
  };
}

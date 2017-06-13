import { QUERY_ES } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case QUERY_ES:
      return [action.payload.data];
  }
  return state;
}
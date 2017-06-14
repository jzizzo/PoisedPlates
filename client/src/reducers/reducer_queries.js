import { QUERY_ES } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case QUERY_ES:
      console.log('action', action.payload.data.hits.hits)
      return [action.payload.data];
  }
  return state;
}
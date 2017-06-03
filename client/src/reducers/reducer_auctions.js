import _ from 'lodash';
import { FETCH_AUCTIONS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_AUCTIONS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
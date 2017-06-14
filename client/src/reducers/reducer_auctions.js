import _ from 'lodash';
import { FETCH_AUCTIONS, FETCH_AUCTION } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_AUCTION:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_AUCTIONS:
      const auctions = _.mapKeys(action.payload.data, 'id');
      _.map(auctions, auction => auction.url = auction.images[0].url)
      return auctions;
    default:
      return state;
  }
}


import _ from 'lodash';
import { FETCH_AUCTIONS, FETCH_AUCTION, QUERY_ES } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case QUERY_ES:
      let queryResults = {};
      action.payload.data.hits.hits.map((auction) => queryResults[auction._source.auction_id] = auction._source);
      return queryResults;
    case FETCH_AUCTION:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_AUCTIONS:
      const auctions = _.mapKeys(action.payload.data, 'id');
      _.map(auctions, auction => {
        auction.url = auction.images[0].url;
        auction.auction_id = auction.id;
      });
      return auctions;
    default:
      return state;
  }
}


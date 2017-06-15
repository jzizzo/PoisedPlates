import _ from 'lodash';
import { FETCH_AUCTIONS, FETCH_AUCTION, QUERY_ES } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case QUERY_ES:
      let queryResults = {};
      action.payload.data.hits.hits.map( elem => {
        const auction = elem._source;
        console.log('auction',auction)
        queryResults[auction.auction_id] = {
          id: auction.auction_id,
          category: { id: auction.category_id, name: auction.name },
          categpry_id: auction.category_id,
          description: auction.description,
          end_time: auction.end_time,
          images: [ { "auction_id": auction.auction_id, url: auction.url} ],
          title: auction.title
        }
      })
      return queryResults;
    case FETCH_AUCTION:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_AUCTIONS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}


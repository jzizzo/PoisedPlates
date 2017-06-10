import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuctionsReducer from './reducer_auctions';
import biddingReducer from './biddingReducer';
import imagesReducer from './imagesReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auctions: AuctionsReducer,
  bidding: biddingReducer,
  images: imagesReducer
});

export default rootReducer;

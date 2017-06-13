import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuctionsReducer from './reducer_auctions';
import biddingReducer from './biddingReducer';
import imagesReducer from './imagesReducer';
import categoryReducer from './categoryReducer';
import profileReducer from './profileReducer';
import searchReducer from './reducer_queries';

const rootReducer = combineReducers({
  form: formReducer,
  auctions: AuctionsReducer,
  bidding: biddingReducer,
  images: imagesReducer,
  categories: categoryReducer,
  profile: profileReducer,
  search: searchReducer
});

export default rootReducer;

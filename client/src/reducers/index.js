import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuctionsReducer from './reducer_auctions';

const rootReducer = combineReducers({
  form: formReducer,
  auctions: AuctionsReducer
});

export default rootReducer;

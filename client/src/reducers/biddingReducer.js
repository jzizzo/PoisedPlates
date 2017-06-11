import { TOGGLE_MODAL, FETCH_BID, POST_BID } from '../actions/index';

const initialState = {
  modal: false,
  currentBid: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        modal: !state.modal
      });
    case FETCH_BID:
      return Object.assign({}, state, {
        currentBid: action.payload.data.bid
      });
    case POST_BID:
      return Object.assign({}, state, {
        currentBid: action.payload
      });
    default:
      return state;
  }
}
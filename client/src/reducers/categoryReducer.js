import { FETCH_CATEGORIES, CHANGE_CATEGORY } from '../actions/index';

const initialState = {
  categories: [
    { id: 'all', name: 'all'}
  ],
  showing: 'all'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.payload.data
      });
    case CHANGE_CATEGORY:
      return Object.assign({}, state, {
        showing: action.payload
      });
    default:
      return state;
  }
}
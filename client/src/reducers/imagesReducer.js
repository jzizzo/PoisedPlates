import { SELECT_IMAGE } from '../actions/index';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_IMAGE:
      return Object.assign({}, state, {
        selectedImage: action.payload[0],
        imagePath: action.payload[1]
      });
    default:
      return state;
  }
}
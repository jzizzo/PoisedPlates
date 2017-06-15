import { SELECT_IMAGE, DESELECT_IMAGE } from '../actions/index';

const initialState = {
  displayImage: '../assets/placeholder.png'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_IMAGE:
      return Object.assign({}, state, {
        displayImage: action.payload.display,
        file: action.payload.file
      });
    case DESELECT_IMAGE:
      return {};
    default:
      return state;
  }
}
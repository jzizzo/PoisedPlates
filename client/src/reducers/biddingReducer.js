import { TOGGLE_MODAL } from '../actions/index';

const initialState = {
  modal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        modal: !state.modal
      });
    default:
      return state;
  }
}
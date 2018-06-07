import { SET_LOADING } from '../actions/loading';

export default (state = true, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.status;
    default:
      return state;
  }
};

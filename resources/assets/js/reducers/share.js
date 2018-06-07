import { SET_LOADING } from '../actions/share';

export default (state = { loading: true }, action) => {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, { loading: action.status });
    default:
      return state;
  }
};

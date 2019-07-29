import { SET_AUTHENTICATED, SET_USER_DATA } from '../actions/auth';

export default (state = { user: null, authenticated: false }, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, { user: action.user });
    case SET_AUTHENTICATED:
      return Object.assign({}, state, { authenticated: action.authenticated });
    default:
      return state;
  }
};

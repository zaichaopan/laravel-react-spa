import localforage from 'localforage';
import { isEmpty } from 'lodash';
import { SET_AUTHENTICATED, SET_USER_DATA, SET_TOKEN, SET_HTTP_TOKEN } from '../actions/auth';

const setToken = token => {
  if (isEmpty(token)) {
    localforage.removeItem('authtoken', token);
    return;
  }

  localforage.setItem('authtoken', token);
};

export const setHttpToken = (token) => {
  if (isEmpty(token)) {
    window.axios.defaults.headers.common['Authorization'] = null;
  }

  window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export default (state = { user: null, authenticated: false }, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, { user: action.user });
    case SET_AUTHENTICATED:
      return Object.assign({}, state, { authenticated: action.authenticated });
    case SET_TOKEN:
      setToken(action.token);
      return state;
    case SET_HTTP_TOKEN:
      setHttpToken(action.token);
      return state;
    default:
      return state;
  }
};

import { checkTokenExists, setToken } from '../helpers/auth';

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

const fetchUser = () => {
  return window.axios.get('/api/me')
    .then(({ data: { data } }) => Promise.resolve(data))
    .catch(error => Promise.reject(error));
};

export const setUserData = user => ({
  type: SET_USER_DATA,
  user
});

export const setAuthenticated = authenticated => ({
  type: SET_AUTHENTICATED,
  authenticated
});

export const signInUser = credentials => dispatch => {
  return window.axios.post('/api/signin', credentials).then(({ data: { data, meta } }) => {
    setToken(meta.token);
    dispatch(setUserData(data));
    dispatch(setAuthenticated(true));
    return Promise.resolve({ data, meta });
  }).catch(error => {
    return Promise.reject(error);
  });
};

export const registerUser = credentials => dispatch => {
  return window.axios.post('/api/register', credentials
  ).then(({ data: { data, meta } }) => {
    setToken(meta.token);
    dispatch(setUserData(data));
    dispatch(setAuthenticated(true));
    return Promise.resolve({ data, meta });
  }).catch(error => {
    return Promise.reject(error);
  });
};

export const clearAuth = () => dispatch => {
  setToken(null);
  dispatch(setUserData(null));
  dispatch(setAuthenticated(false));
};

export const logoutUser = cb => dispatch => {
  return window.axios.post('/api/logout')
    .then(response => {
      dispatch(clearAuth());
      cb();
    })
    .catch(anyError => {
      dispatch(clearAuth());
      cb();
    });
};

export const initAuthFromExistingToken = (cb) => dispatch => {
  checkTokenExists().then(token => {
    setToken(token);
    fetchUser().then(data => {
      dispatch(setUserData(data));
      dispatch(setAuthenticated(true));
      cb();
    }).catch(anyError => {
      dispatch(clearAuth());
      cb();
    });
  }).catch(anyError => {
    dispatch(clearAuth());
    cb();
  });
};

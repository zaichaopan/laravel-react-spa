import localforage from 'localforage';

const INTENDED_URL = 'intended_url';
const DEFAULT_INTENDED_URL = '/home';

const setLocalForageToken = token => {
  if (window._.isEmpty(token)) {
    localforage.removeItem('authtoken', token);
  }

  localforage.setItem('authtoken', token);
};

const setHttpToken = (token) => {
  if (window._.isEmpty(token)) {
    window.axios.defaults.headers.common['Authorization'] = null;
  }

  window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export const checkTokenExists = () => {
  return localforage.getItem('authtoken').then((token) => {
    if (window._.isEmpty(token)) {
      return Promise.reject(new Error('invalid token'));
    }

    return Promise.resolve(token);
  });
};

export const setToken = token => {
  setLocalForageToken(token);
  setHttpToken(token);
};

export const setIntendedUrl = url => {
  localforage.setItem(INTENDED_URL, url);
};

export const getIntendedUrl = () => {
  return localforage.getItem(INTENDED_URL).then((url) => {
    if (window._.isEmpty(url)) {
      url = DEFAULT_INTENDED_URL;
    }

    return Promise.resolve(url);
  });
};

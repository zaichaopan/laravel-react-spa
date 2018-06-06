export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_HTTP_TOKEN = 'SET_HTTP_TOKEN';


export const setToken = token => ({
    type: SET_TOKEN,
    token
});

export const setHttpToken = token => ({
    type: SET_HTTP_TOKEN,
    token
});

export const setUserData = user => ({
    type: SET_USER_DATA,
    user
});

export const setAuthenticated = authenticated => ({
    type: SET_AUTHENTICATED,
    authenticated
});


export const signInUser = (credentials, cb) => dispatch => {
    return window.axios.post('/api/signin', credentials).then(({ data: { data, meta } }) => {
        dispatch(setUserData(data));
        dispatch(setAuthenticated(true));
        dispatch(setToken(meta.token));
        dispatch(setHttpToken(meta.token));
        cb();
    }).catch(error => {
        console.log(error);
    });
};

export const registerUser = (credentials, cb) => dispatch => {
    return window.axios.post('/api/register', credentials
    ).then(({ data: { data, meta } }) => {
        dispatch(setUserData(data));
        dispatch(setAuthenticated(true));
        dispatch(setToken(meta.token));
        dispatch(setHttpToken(meta.token));
        cb();
    }).catch(error => {
        console.log(error);
    });
};

export const fetchUser = () => dispatch => {
    return window.axios.get('/api/me').then(({ data: { data } }) => {
        return Promise.resolve(data);
    }).catch(err => {
        return Promise.reject('No valid Token!');
    })
}

export const clearAuth = () => dispatch => {
    dispatch(setUserData(null));
    dispatch(setAuthenticated(false));
    dispatch(setToken(null));
    dispatch(setHttpToken(null));
}

export const logoutUser = (cb) => dispatch => {
    return axios.post('/api/logout').then((response) => {
        cb();
    }).catch(err => {
        cb();
    });
}

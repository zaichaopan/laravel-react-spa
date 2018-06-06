import './bootstrap';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import App from './router';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

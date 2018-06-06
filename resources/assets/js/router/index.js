import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Welcome from '../components/Welcome';
import SignIn from '../components/SignIn';
import Register from '../components/Register';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import Home from '../components/Home';
import AuthRoute from './AuthRoute';
import { connect } from 'react-redux';
import { setLoading } from '../actions/share';
import { setToken, fetchUser, setUserData, setAuthenticated, clearAuth, setHttpToken } from '../actions/auth';
import { checkTokenExists } from '../helpers';

class App extends Component {
    componentDidMount() {
        checkTokenExists().then(token => {
            this.props.setToken(token);
            this.props.setHttpToken(token);
            this.props.fetchUser().then(data => {
                this.props.setUserData(data);
                this.props.setAuthenticated(true);
                this.props.setLoading(false);
            }).catch(error => {
                this.props.clearAuth();
                this.props.setLoading(false);
            });
        }).catch(error => {
            this.props.clearAuth();
            this.props.setLoading(false);
        });
    }

    render() {
        return (
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Route exact path="/" component={Welcome} />
                    <Route path="/register" component={Register} />
                    <Route path="/signin" component={SignIn} />
                    <AuthRoute path="/home" component={Home} />
                </div>

            </Router>
        );
    }
}

const mapDispatchToProps = {
    setToken,
    fetchUser,
    clearAuth,
    setHttpToken,
    setLoading,
    setAuthenticated,
    setUserData
};

export default connect(null, mapDispatchToProps)(App);

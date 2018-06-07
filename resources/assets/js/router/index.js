import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import NotFound from '../pages/404';
import PropTypes from 'prop-types';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import AuthRoute from './AuthRoute';
import { connect } from 'react-redux';
import { setLoading } from '../actions/share';
import { setToken, fetchUser, setUserData, setAuthenticated, clearAuth, setHttpToken } from '../actions/auth';
import { checkTokenExists } from '../helpers';
import GuestRoute from './GuestRoute';

const propTypes = {
  setToken: PropTypes.func.isRequired,
  setHttpToken: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
  clearAuth: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

class App extends Component {
  componentDidMount () {
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
        console.log(error);
      });
    }).catch(error => {
      this.props.clearAuth();
      this.props.setLoading(false);
      console.log(error);
    });
  }

  render () {
    if (this.props.loading) {
      return (
        <div className="p-2">loading...</div>
      );
    }

    return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Switch>
            <GuestRoute exact path="/" component={Welcome} />
            <GuestRoute path="/register" component={Register} />
            <GuestRoute path="/signin" component={SignIn} />
            <AuthRoute path="/home" component={Home} />
            <AuthRoute path="/profile/:id" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = propTypes;

const mapDispatchToProps = {
  setToken,
  fetchUser,
  clearAuth,
  setHttpToken,
  setLoading,
  setAuthenticated,
  setUserData
};

const mapStateToProps = ({ share: { loading } }) => ({ loading });

export default connect(mapStateToProps, mapDispatchToProps)(App);

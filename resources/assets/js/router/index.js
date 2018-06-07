import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import SignIn from '../pages/auth/SignIn';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import NotFound from '../pages/404';
import PropTypes from 'prop-types';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import AuthRoute from './AuthRoute';
import { connect } from 'react-redux';
import { setLoading } from '../actions/loading';
import { initAuthFromExistingToken } from '../actions/auth';
import GuestRoute from './GuestRoute';

const propTypes = {
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  initAuthFromExistingToken: PropTypes.func.isRequired
};

class App extends Component {
  componentDidMount () {
    this.props.initAuthFromExistingToken(() => this.props.setLoading(false));
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
            <GuestRoute path="/forgot-password" component={ForgotPassword} />
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
  setLoading,
  initAuthFromExistingToken
};

const mapStateToProps = ({ loading }) => ({ loading });

export default connect(mapStateToProps, mapDispatchToProps)(App);

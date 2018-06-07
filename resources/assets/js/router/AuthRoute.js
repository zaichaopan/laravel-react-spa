import React from 'react';
import store from '../store';
import { Route, Redirect } from 'react-router-dom';
import AppLayoutRoute from './ AppLayoutRoute';
import { setIntendedUrl } from '../helpers';
import PropTypes from 'prop-types';

const propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object,
  location: PropTypes.object
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { auth: { authenticated }, share: { loading } } = store.getState();

      if (!authenticated) {
        setIntendedUrl(props.location.pathname);
      }

      return loading || authenticated ? (
        <AppLayoutRoute component={Component} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      );
    }
    }
  />
);

AuthRoute.propTypes = propTypes;
AuthRoute.displayName = 'Auth Route';

export default AuthRoute;

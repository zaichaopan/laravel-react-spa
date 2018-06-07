import React from 'react';
import store from '../store';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object,
  location: PropTypes.object
};

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { auth: { authenticated } } = store.getState();

      return !authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/home',
            state: { from: props.location }
          }}
        />
      );
    }
    }
  />
);

GuestRoute.propTypes = propTypes;
GuestRoute.displayName = 'Guest Route';

export default GuestRoute;

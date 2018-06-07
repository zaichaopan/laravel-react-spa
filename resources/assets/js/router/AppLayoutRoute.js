import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../pages/layouts/AppLayout';
import PropTypes from 'prop-types';

const propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object
};

const AppLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    )} />
  );
};

AppLayoutRoute.propTypes = propTypes;

export default AppLayoutRoute;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthNav from '../components/AuthNav';
import GuestNav from '../components/GuestNav';

const propTypes = {
  authenticated: PropTypes.bool.isRequired
};

class NotFound extends Component {
  render () {
    const nav = this.props.authenticated ? <AuthNav /> : <GuestNav />;

    return (
      <div className="flex flex-col min-h-screen">
        {nav}

        <div className="flex flex-col flex-1 items-center">
          <h1 className="py-8">Sorry, that page isn’t here.</h1>
          <p className="text-grey-dark">
            You didn’t do anything wrong. We may have moved the page you’re looking for somewhere else.
          </p>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = propTypes;
const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated });
export default connect(mapStateToProps)(NotFound);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadGoogleApi from '../helpers/load-google-api';

const propTypes = {
  googleSignInSuccess: PropTypes.func.isRequired
};

class GoogleSignIn extends Component {
  componentDidMount () {
    this.gapi = null;
    this.initGoogleBtn();
  }

  async initGoogleBtn () {
    try {
      this.gapi = await loadGoogleApi();
      this.gapi.load('auth2', () => {
        this.gapi.auth2.init({
          client_id: window.App.google_client_id,
          fetch_basic_profile: true,
          scope: 'profile'
        });
      });
    } catch (e) {
    }
  }

  async handleAuthClick () {
    try {
      let res = await this.gapi.auth2.getAuthInstance().signIn();
      this.props.googleSignInSuccess({
        id_token: res.getAuthResponse().id_token
      });
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    return (
      <button type="button"
        id="g-signin-btn"
        className="w-full text-grey-darker"
        onClick={() => this.handleAuthClick()}>Use My

        <img width="72" height="24" className="align-middle mx-2" alt="Google" title="Google" src="/images/icons/google.svg" />
        Account</button>

    );
  }
}

GoogleSignIn.propTypes = propTypes;

export default GoogleSignIn;

import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser, clearAuth } from '../actions/auth';

const propTypes = {
  auth: PropTypes.object.isRequired,
  clearAuth: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

class AuthNav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: this.props.auth.user
    };
  }

  redirectToSignIn () {
    this.props.clearAuth();
    this.props.history.push('/');
  }

  handleLogout () {
    this.props.logoutUser(() => this.redirectToSignIn());
  }

  render () {
    return (
      <div className="flex h-16 border-b border-grey-light">
        <div className="container px-2 mx-auto flex items-center justify-between">
          <div className="left">
            <ul className="list-reset flex items-center">
              <li>
                <NavLink to="/home" activeClassName="font-bold" className="text-grey-darkest no-underline text-indigo">Laravel React SPA</NavLink>
              </li>
            </ul>
          </div>

          <div className="right">
            <ul className="list-reset flex items-center">
              <li className="px-4">
                <NavLink to={`/profile/${this.state.user.id}`} className="capitalize text-sm text-grey-darker no-underline">
                  {this.state.user.name}
                </NavLink>
              </li>
              <li onClick={() => this.handleLogout()}>
                <Link to="/logout" className="text-sm text-grey-darker no-underline">Log out</Link>
              </li>
            </ul>
          </div>

        </div>

      </div>
    );
  }
}

AuthNav.propTypes = propTypes;

const mapDispatchToProps = { logoutUser, clearAuth };
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(withRouter(AuthNav));

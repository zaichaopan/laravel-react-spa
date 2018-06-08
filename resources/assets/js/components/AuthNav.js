import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../actions/auth';

const propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

class AuthNav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: this.props.auth.user,
      hideMobileNav: true
    };
  }

  toggleMobileNav () {
    this.setState((prevState, props) => ({
      hideMobileNav: !prevState.hideMobileNav
    }));
  }

  closeMobileNav () {
    if (!this.state.hideMobileNav) {
      this.setState({
        hideMobileNav: true
      });
    }
  }

  handleLogout () {
    this.props.logoutUser(() => this.props.history.push('/'));
  }

  render () {
    return (
      <div className="auth-nav flex flex-row h-16 border-b border-grey-light">
        <div className="container flex-col lg:flex-row px-2 mx-auto flex items-center justify-between">
          <div className="left flex justify-between w-full lg:w-auto flex-1 lg:flex-initial">
            <ul className="list-reset flex items-center">
              <li>
                <NavLink
                  to="/home"
                  activeClassName="font-bold"
                  className="text-grey-darkest no-underline text-indigo">Laravel React SPA
                </NavLink>
              </li>
            </ul>

            <div
              onClick={() => this.toggleMobileNav()}
              id="sidebar-open"
              className="z-50 flex px-6 items-center lg:hidden">

              {this.state.hideMobileNav
                ? (<svg
                  className="fill-current w-4 h-4 cursor-pointer text-grey"
                  role="button" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>)
                : (<svg className="fill-current w-4 h-4 cursor-pointer text-grey"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z">
                  </path>
                </svg>
                )}
            </div>
          </div>

          <div
            className={`right lg:flex pt-8 lg:pt-0 right fixed lg:relative bg-indigo lg:bg-white w-full lg:w-auto h-screen lg:h-auto ${this.state.hideMobileNav ? 'mobile-hidden' : ''}`}>
            <ul className="mt-8 py-8 lg:py-0 lg:mt-0 list-reset flex items-center flex-col lg:flex-row">
              <li
                onClick={() => this.closeMobileNav()}
                className="px-4 py-3 lg:py-0">
                <NavLink
                  to='/home'
                  className="capitalize text-2xl font-bold lg:text-sm lg:font-light text-white lg:text-grey-dark underline lg:no-underline">
                  Home
                </NavLink>
              </li>
              <li
                onClick={() => this.closeMobileNav()}
                className="px-4 py-3 lg:py-0">
                <NavLink
                  to='/home'
                  className="capitalize text-2xl font-bold lg:text-sm lg:font-light text-white lg:text-grey-dark underline lg:no-underline">
                  Messages
                </NavLink>
              </li>

              <li
                onClick={() => this.closeMobileNav()}
                className="px-4 py-3 lg:py-0">
                <NavLink
                  to='/home'
                  className="capitalize text-2xl font-bold lg:text-sm lg:font-light text-white lg:text-grey-dark underline lg:no-underline">
                  Notifications
                </NavLink>
              </li>

              <li
                onClick={() => this.closeMobileNav()}
                className="px-4 py-3 lg:py-0">
                <NavLink
                  to={`/profile/${this.state.user.id}`}
                  className="text-2xl font-bold lg:text-sm lg:font-light capitalize text-sm text-white lg:text-grey-dark underline lg:no-underline">
                  {this.state.user.name}
                </NavLink>
              </li>
              <li
                onClick={() => this.handleLogout()}
                className="px-4 py-3 lg:py-0">
                <Link
                  to="/logout"
                  className="capitalize text-2xl font-bold lg:text-sm lg:font-light text-white lg:text-grey-dark underline lg:no-underline">
                  Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

AuthNav.propTypes = propTypes;

const mapDispatchToProps = { logoutUser };
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(withRouter(AuthNav));

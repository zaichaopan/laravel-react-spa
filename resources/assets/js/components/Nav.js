import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser, clearAuth } from '../actions/auth';

const propTypes = {
    auth: PropTypes.object.isRequired
};

class Nav extends Component {
    redirectToSignIn() {
        this.props.clearAuth();
        this.props.history.push('/');
    }

    handleLogout() {
        this.props.logoutUser(() => this.redirectToSignIn());
    }

    render() {
        const links = this.props.auth.authenticated
            ? (
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li onClick={() => this.handleLogout()}><Link to="/logout">Logout</Link></li>
                </ul>)
            : (
                <ul>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/signin">Sign in</Link></li>
                </ul>
            );

        return (
            <div className="flex h-16 border-b border-grey-light">
                {links}
            </div>
        )
    }
}

Nav.propTypes = propTypes;

const mapDispatchToProps = { logoutUser, clearAuth };
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));


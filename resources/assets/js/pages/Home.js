import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

const propTypes = {
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.loading && !this.props.auth.authenticated) {
            return <Redirect to='/signin' />
        }

        return (
            <div>
                <h1>This is home</h1>
            </div>
        )
    }
}


Home.propTypes = propTypes;

const mapStateToProps = ({ auth, share: { loading } }) => ({ auth, loading });

export default connect(mapStateToProps)(Home);

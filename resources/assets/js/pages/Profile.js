import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

const propTypes = {
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

class Profile extends Component {
    constructor(props) {
        super(props);
        //console.log(props.match.params.id);
    }

    render() {
        if (!this.props.loading && !this.props.auth.authenticated) {
            return <Redirect to='/signin' />
        }

        return (
            <div className="container p-2 mx-auto flex flex-col">
                <h1>This is Profile page</h1>
            </div>
        )
    }
}


Profile.propTypes = propTypes;

const mapStateToProps = ({ auth, share: { loading } }) => ({ auth, loading });

export default connect(mapStateToProps)(Profile);

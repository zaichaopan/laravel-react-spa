import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

const propTypes = {
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = { user: this.props.auth.user };
  }

  render () {
    return (
      <DocumentTitle title={`Home - ${window.App.name}`}>
        <div className="container p-2 mx-auto flex flex-col">
          <h1>Welcome back {this.state.user.name}</h1>
        </div>
      </DocumentTitle>
    );
  }
}

Home.propTypes = propTypes;
const mapStateToProps = ({ auth, loading }) => ({ auth, loading });
export default connect(mapStateToProps)(Home);

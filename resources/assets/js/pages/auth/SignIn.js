import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { signInUser } from '../../actions/auth';
import { getIntendedUrl } from '../../helpers/auth';
import { destructServerErrors, hasError, getError } from '../../helpers/error';

const propTypes = {
  signInUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired

};

class SignIn extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: ''
    };
  }

  signInSuccess () {
    getIntendedUrl().then(url => this.props.history.push(url));
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.signInUser(this.state)
      .then(response => this.signInSuccess())
      .catch(error => this.setState({ errors: destructServerErrors(error) }));
  }

  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {
        ...this.state.errors,
        ...{ [e.target.name]: '' }
      }
    });
  }

  render () {
    return (
      <DocumentTitle title={`Sign in - ${window.App.name}`}>
        <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-grey-lightest">

          <div className="p-4">
            <Link
              to="/"
              className="text-grey-darkest text-bold no-underline text-indigo text-2xl">Laravel React SPA
            </Link>
          </div>

          <div className="border rounded bg-white border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4">
            <form onSubmit={e => this.handleSubmit(e)}
              method="POST">
              <h2 className="text-center mt-4 mb-6 text-grey-darkest">Sign in to Level</h2>
              <div className="mb-4">
                <label className="block text-grey-darkest text-sm font-bold mb-2" htmlFor="email">
                  Email address
                </label>
                <input
                  value={this.state.email}
                  onChange={e => this.handleInputChange(e)}
                  id="email"
                  type="email"
                  name="email"
                  className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker ${hasError(this.state.errors, 'email') ? 'border-red' : ''}`}
                  placeholder="jane@example.com"
                  required
                  autoFocus
                />

                {hasError(this.state.errors, 'email') &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, 'email')}</p>
                }

              </div>

              <div className="mb-6">
                <label className="block text-grey-darkest text-sm font-bold mb-2" htmlFor="password"> Password </label>
                <input
                  value={this.state.password}
                  onChange={e => this.handleInputChange(e)}
                  type="password"
                  id="password"
                  name="password"
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  required />

              </div>

              <div className="mb-2">
                <button type="submit"
                  className="border rounded-full p-3 text-white bg-indigo w-full font-bold hover:bg-indigo-dark">Sign in</button>
              </div>
            </form>

          </div>

          <div className="p-4 text-grey-dark text-sm flex flex-col items-center">
            <div>
              <span>Create a New Account? </span>
              <Link to="/register" className="no-underline text-grey-darker font-bold">Register</Link>
            </div>

            <div className="mt-2">
              <strong>Help:</strong> <Link to="/forgot-password" className="no-underline text-grey-dark text-xs">Reset Password</Link>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

SignIn.propTypes = propTypes;

const mapDispatchToProps = {
  signInUser
};

export default connect(null, mapDispatchToProps)(withRouter(SignIn));

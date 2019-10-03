import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { signInUser, googleSignIn } from '../../actions/auth';
import { getIntendedUrl } from '../../helpers/auth';
import { destructServerErrors, hasError, getError } from '../../helpers/error';
import GoogleSignIn from '../../components/GoogleSignIn';

const propTypes = {
  signInUser: PropTypes.func.isRequired,
  googleSignIn: PropTypes.func.isRequired,
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

  handleGoogleSignInSuccess (credentials) {
    this.props.googleSignIn(credentials)
      .then(response => this.signInSuccess())
      .catch(error => this.setState({ errors: destructServerErrors(error) })); ;
  }

  render () {
    return (
      <DocumentTitle title={`Sign in - ${window.App.name}`}>
        <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-gray-200">

          <div className="p-8 flex flex-col items-center">
            <div>

              <Link
                to="/"
              >  <img width="48"
                  className="align-middle mx-2"
                  alt="Google"
                  title="Google"
                  src="/images/icons/laravel.svg" />
              </Link>

            </div>
            <div className="text-2xl leading-loose">

              Sign into your account
            </div>
            <div className="text-gray-800">
              <span className="text-gray-700">Or</span> <Link to="/register" className="underline">Start your free trial</Link>
            </div>

          </div>

          <div className="border rounded bg-white border-gray-300 w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 shadow">
            <form onSubmit={e => this.handleSubmit(e)}
              method="POST">
              {/* <h2 className="text-center mt-4 mb-6 text-gray-700">Sign in to Level</h2> */}
              <div className="mb-4 mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                  Email address
                </label>
                <input
                  value={this.state.email}
                  onChange={e => this.handleInputChange(e)}
                  id="email"
                  type="email"
                  name="email"
                  className={`appearance-none border rounded w-full py-1 px-3 text-grey-darker bg-gray-100 ${hasError(this.state.errors, 'email') ? 'border-red' : ''}`}
                  required
                  autoFocus
                />

                {hasError(this.state.errors, 'email') &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, 'email')}</p>
                }

              </div>

              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password"> Password </label>
                <input
                  value={this.state.password}
                  onChange={e => this.handleInputChange(e)}
                  type="password"
                  id="password"
                  name="password"
                  className="appearance-none border rounded w-full py-1 px-3 text-grey-darker bg-gray-100"
                  required />

              </div>

              <div className="mb-3 flex justify-end">
                <Link to="/forgot-password" className="text-sm underline text-gray-600 font-bold">Forget password?</Link>
              </div>

              <div className="mb-3">
                <button type="submit"
                  className="border rounded px-3 py-2 text-white bg-indigo-500 w-full font-bold">Sign in</button>
              </div>
            </form>

            <div className="flex flex-col items-center text-sm text-gray-600">
              <div className="pb-2">
                Or continue with
              </div>
              <div>
                <GoogleSignIn googleSignInSuccess={(credentials) => this.handleGoogleSignInSuccess(credentials)} />
              </div>
            </div>

          </div>
        </div>
      </DocumentTitle>
    );
  }
}

SignIn.propTypes = propTypes;

const mapDispatchToProps = {
  signInUser,
  googleSignIn
};

export default connect(null, mapDispatchToProps)(withRouter(SignIn));

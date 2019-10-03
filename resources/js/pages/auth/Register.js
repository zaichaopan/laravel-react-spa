import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { registerUser, googleSignIn } from '../../actions/auth';
import { destructServerErrors, hasError, getError } from '../../helpers/error';
import GoogleSignIn from '../../components/GoogleSignIn';

const propTypes = {
  registerUser: PropTypes.func.isRequired,
  googleSignIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

class Register extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
    };
  }

  registerSuccess () {
    this.props.history.push('/home');
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.registerUser(this.state)
      .then(response => this.registerSuccess())
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
      .then(response => this.registerSuccess())
      .catch(error => this.setState({ errors: destructServerErrors(error) })); ;
  }

  render () {
    return (
      <DocumentTitle title={`Register - ${window.App.name}`}>
        <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-gray-200">

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
              Start your free trial
            </div>
            <div className="text-gray-800">
              <span className="text-gray-700">Or</span> <Link to="/signin" className="underline">sign in to your account</Link>
            </div>
          </div>

          <div className="bg-white border rounded border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 shadow">
            <form onSubmit={e => this.handleSubmit(e)}
              method="POST"
            >
              <div className="mb-4 mt-2">
                <label className="block text-gray-700 text-sm mb-1 font-bold" htmlFor="username">
                  Username
                </label>
                <input
                  value={this.state.name}
                  onChange={e => this.handleInputChange(e)}
                  type="text"
                  id="username"
                  name="name"
                  className="appearance-none border rounded w-full py-1 px-3 bg-gray-100 leading-tight"
                  required
                  autoFocus />

                {hasError(this.state.errors, 'name') &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, 'name')}</p>
                }
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                  Email address
                </label>
                <input
                  value={this.state.email}
                  onChange={e => this.handleInputChange(e)}
                  id="email"
                  name="email"
                  type="email"
                  className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${hasError(this.state.errors, 'name') ? 'border-red' : ''}`}
                  required />

                {hasError(this.state.errors, 'email') &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, 'email')}</p>
                }
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password"> Password </label>
                <input
                  value={this.state.password}
                  onChange={e => this.handleInputChange(e)}
                  type="password"
                  id="password"
                  name="password"
                  className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100  ${hasError(this.state.errors, 'password') ? 'border-red' : ''}`}
                  minLength={6}
                  required />

                {hasError(this.state.errors, 'password') &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, 'password')}</p>
                }
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
                <input
                  value={this.state.password_confirmation}
                  onChange={e => this.handleInputChange(e)}
                  type="password"
                  id="password-confirmation"
                  name="password_confirmation"
                  className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${hasError(this.state.errors, 'password') ? 'border-red' : ''}`}
                  required />
              </div>

              <div className="mb-4">
                <button className="border rounded p-2 text-white bg-indigo-500 w-full font-bold hover:bg-indigo-500-dark">Register</button>
              </div>

              <div className="flex flex-col items-center text-sm text-gray-600">
                <div className="pb-2">
                  Or continue with
                </div>
                <div>
                  <GoogleSignIn googleSignInSuccess={(credentials) => this.handleGoogleSignInSuccess(credentials)} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

Register.propTypes = propTypes;

const mapDispatchToProps = { registerUser, googleSignIn };

export default connect(null, mapDispatchToProps)(withRouter(Register));

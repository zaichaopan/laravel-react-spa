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
        <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-grey-lightest">
          <div className="p-4">
            <Link
              to="/"
              className="text-grey-darkest text-bold no-underline text-indigo text-2xl">Laravel React SPA
            </Link>
          </div>

          <div className="bg-white border rounded border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4">
            <form onSubmit={e => this.handleSubmit(e)}
              method="POST"
            >
              <h2 className="text-center mt-4 mb-6 text-grey-darker">Register</h2>
              <div className="mb-4">
                <label className="block text-grey-darkest text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  value={this.state.name}
                  onChange={e => this.handleInputChange(e)}
                  type="text"
                  id="username"
                  name="name"
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight"
                  placeholder="jane doe"
                  required
                  autoFocus />

                {hasError(this.state.errors, 'name') &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, 'name')}</p>
                }
              </div>

              <div className="mb-4">
                <label className="block text-grey-darkest text-sm font-bold mb-2" htmlFor="email">
                  Email address
                </label>
                <input
                  value={this.state.email}
                  onChange={e => this.handleInputChange(e)}
                  id="email"
                  name="email"
                  type="email"
                  className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError(this.state.errors, 'name') ? 'border-red' : ''}`}
                  placeholder="jane@example.com"
                  required />

                {hasError(this.state.errors, 'email') &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, 'email')}</p>
                }
              </div>

              <div className="mb-4">
                <label className="block text-grey-darkest text-sm font-bold mb-2" htmlFor="password"> Password </label>
                <input
                  value={this.state.password}
                  onChange={e => this.handleInputChange(e)}
                  type="password"
                  id="password"
                  name="password"
                  className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError(this.state.errors, 'password') ? 'border-red' : ''}`}
                  minLength={6}
                  required />

                {hasError(this.state.errors, 'password') &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, 'password')}</p>
                }
              </div>

              <div className="mb-4">
                <label className="block text-grey-darkest text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
                <input
                  value={this.state.password_confirmation}
                  onChange={e => this.handleInputChange(e)}
                  type="password"
                  id="password-confirmation"
                  name="password_confirmation"
                  className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError(this.state.errors, 'password') ? 'border-red' : ''}`}
                  required />
              </div>

              <div className="mb-2">
                <button className="border rounded-full p-3 text-white bg-indigo w-full font-bold hover:bg-indigo-dark">Register</button>
              </div>
            </form>
          </div>
          <div className="p-4 text-grey-dark text-sm">
            <span>Already have an account? </span>
            <Link to="/signin" className="no-underline text-grey-darker font-bold"> Sign in</Link>
          </div>

          <div className="border rounded bg-white border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4">
            <GoogleSignIn googleSignInSuccess={(credentials) => this.handleGoogleSignInSuccess(credentials)} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

Register.propTypes = propTypes;

const mapDispatchToProps = { registerUser, googleSignIn };

export default connect(null, mapDispatchToProps)(withRouter(Register));

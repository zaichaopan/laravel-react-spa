import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { destructServerErrors, hasError, getError } from '../../helpers/error';

import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

class ResetPassword extends Component {
  constructor (props) {
    super(props);
    this.state = {
      'email': '',
      'password': '',
      'password_confirmation': '',
      'token': '',
      'errors': '',
      'resetMessage': ''
    };
  }

  componentDidMount () {
    this.setState({
      'token': this.props.match.params.token
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    window.axios.post('/api/password/reset', this.state)
      .then(({ data: { status } }) => {
        this.setState({ 'resetMessage': status });
      }).catch(error => {
        this.setState({ errors: destructServerErrors(error) });
      });
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
      <DocumentTitle title={`Reset password - ${window.App.name}`}>
        <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-grey-300">

          {this.state.resetMessage !== '' && (
            <div className="bg-white border-l-4 border-blue text-sm text-grey-darker p-4 mb-4 w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3" role="alert">
              <p> {this.state.resetMessage}
                <span className="pl-2">
                  Please
                  <Link to="/signin" className="no-underline text-grey-darker font-bold"> login </Link>
                  with your new password
                </span>
              </p>
            </div>
          )
          }

          <form
            onSubmit={e => this.handleSubmit(e)}
            method="POST"
            className="border rounded bg-white border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3 px-8 py-4">

            <h2 className="text-center mb-4 text-grey-darker">Reset Your Password</h2>
            <div className="mb-4">

              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                Enter your email address
              </label>
              <input
                value={this.state.email}
                onChange={e => this.handleInputChange(e)}
                id="email"
                type="email"
                name="email"
                className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker ${hasError(this.state.errors, 'email') ? 'border-red' : ''}`}
                placeholder="e.g.jane@example.com"
                required
                autoFocus
              />

              {hasError(this.state.errors, 'email') &&
                <p className="text-red text-xs pt-2">{getError(this.state.errors, 'email')}</p>
              }

            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password"> Password </label>
              <input
                value={this.state.password}
                onChange={e => this.handleInputChange(e)}
                type="password"
                id="password"
                name="password"
                className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError(this.state.errors, 'password') ? 'border-red' : ''}`}
                minLength={8}
                required />

              {hasError(this.state.errors, 'password') &&
                <p className="text-red text-xs pt-2">{getError(this.state.errors, 'password')}</p>
              }
            </div>

            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
              <input
                value={this.state.password_confirmation}
                onChange={e => this.handleInputChange(e)}
                type="password"
                id="password-confirmation"
                name="password_confirmation"
                className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError(this.state.errors, 'password') ? 'border-red' : ''}`}
                required />
            </div>

            <div className="mt-6 mb-2">
              <button type="submit"
                className="border rounded-full p-3 text-white bg-indigo-500 w-full font-bold hover:bg-indigo-500-dark">
                Reset
              </button>
            </div>
          </form>
        </div>
      </DocumentTitle>
    );
  }
}

ResetPassword.propTypes = propTypes;

export default ResetPassword;

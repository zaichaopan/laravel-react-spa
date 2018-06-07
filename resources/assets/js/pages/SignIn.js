import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInUser } from '../actions/auth';
import { getIntendedUrl, destructServerErrors, hasError, getError } from '../helpers';
import PropTypes from 'prop-types';

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
      <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-grey-lighter">
        <form onSubmit={e => this.handleSubmit(e)}
          method="POST" className="border rounded bg-white border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4">
          <h2 className="text-center mb-4 text-grey-darker">Sign in</h2>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
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
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password"> Password </label>
            <input
              value={this.state.password}
              onChange={e => this.handleInputChange(e)}
              type="password"
              id="password"
              name="password"
              className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
              required />
          </div>

          <div className="mb-2">
            <button type="submit" className="border rounded-full p-3 text-white bg-indigo w-full font-bold hover:bg-indigo-dark">Sign in</button>
          </div>
        </form>

        <div className="p-4 text-grey-dark text-sm">
          <span>Create a New Account? </span>
          <Link to="/register" className="no-underline text-grey-darker font-bold">Register</Link>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = propTypes;

const mapDispatchToProps = {
  signInUser
};

export default connect(null, mapDispatchToProps)(withRouter(SignIn));

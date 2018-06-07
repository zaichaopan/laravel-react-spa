import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { destructServerErrors, hasError, getError } from '../../helpers/error';

class ForgotPassword extends Component {
  constructor (props) {
    super(props);
    this.state = {
      'email': '',
      'errors': '',
      'resetMessage': ''
    };
  }

  handleSubmit (e) {
    e.preventDefault();
    window.axios.post('/api/password/email', { email: this.state.email })
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
      <DocumentTitle title={`Forgot password - ${window.App.name}`}>
        <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-grey-lighter">

          {this.state.resetMessage !== '' && (
            <div className="bg-white border-l-4 border-blue text-sm text-grey-darker p-4 mb-4 w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3" role="alert">
              <p> {this.state.resetMessage}</p>
            </div>
          )
          }

          <form
            onSubmit={e => this.handleSubmit(e)}
            method="POST"
            className="border rounded bg-white border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3 px-8 py-4">

            <h2 className="text-center mb-4 text-grey-darker">Can&#39;t log in?</h2>
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

              <div className="mt-6 mb-2">
                <button type="submit"
                  className="border rounded-full p-3 text-white bg-indigo w-full font-bold hover:bg-indigo-dark">
                  Email me reset instructions
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-grey-light">
                <strong className="text-grey-darker">If you don’t see your reset email…</strong>
                <div className="text-grey-darker text-sm pt-2">
                  Be sure to check your spam filter for an email from support@yourapp.com
                </div>
              </div>
            </div>
          </form>
        </div>
      </DocumentTitle>
    );
  }
}

export default ForgotPassword;

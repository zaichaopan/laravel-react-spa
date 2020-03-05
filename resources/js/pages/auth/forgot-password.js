import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/auth';
import useInputValue from '../../components/input-value';

function ForgotPassword () {
  let [resetFeedback, setResetFeedback] = useState('');
  let email = useInputValue('email');

  const handleSubmit = e => {
    e.preventDefault();

    forgotPassword({ email: email.value })
      .then(status => setResetFeedback(status))
      .catch(error => {
        error.json().then(({errors}) => {
          email.parseServerError(errors);
        });
      });
  };

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-gray-200">
      {
        resetFeedback && (
          <div className="bg-white border-l-4 border-blue text-sm text-grey-darker p-4 mb-4 w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3" role="alert">
            <p> {resetFeedback}</p>
          </div>)
      }

      <div className="p-4 flex flex-col items-center">
        <div>
          <Link to="/" >
            <img width="48"
              className="align-middle mx-2"
              alt="laravel"
              title="laravel"
              src="/images/icons/laravel.svg" />
          </Link>
        </div>
        <div className="text-2xl leading-loose">
              Can&#39;t log in?
        </div>
      </div>
      <div className="border rounded shadow bg-white border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3 px-8 py-4">
        <form
          onSubmit={handleSubmit}
          method="POST"
        >
          <div className="mb-4 mt-3">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                  Enter your email address
            </label>
            <input

              id="email"
              type="email"
              name="email"
              className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${email.error ? 'border-red-500' : ''}`}
              placeholder="e.g.jane@example.com"
              required
              autoFocus
              {...email.bind}
            />
            { email.error && <p className="text-red-500 text-xs pt-2">{ email.error }</p> }

            <div className="mt-6 mb-2">
              <button type="submit"
                className="border rounded p-2 text-white bg-indigo-500 w-full font-bold hover:bg-indigo-500-dark">
                    Email me reset instructions
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-grey-light">
              <strong className="text-gray-700">If you don’t see your reset email…</strong>
              <div className="text-gray-600 text-sm pt-2">
                    Be sure to check your spam filter for an email from support@lmyapp.com
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="py-4 font-bold text-sm text-gray-700">
        <span className="text-gray-600">Never mind,</span>&nbsp;
        <Link
          to="/login"
          className="underline text-grey-darkest text-indigo">go back to the login screen
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;

import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {resetPassword} from '../../api/auth';
import useInputValue from '../../components/input-value';

function ResetPassword () {
  const token = useRouteMatch().params.token;
  let [passwordResetFeedback, setPasswordResetFeedback] = useState('');
  let email = useInputValue('email');
  let password = useInputValue('password');
  let passwordConfirmation = useInputValue('password_confirmation');

  const handleSubmit = e => {
    e.preventDefault();
    [email, password, passwordConfirmation].forEach(({setError}) => setError(''));

    resetPassword({
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      token
    })
      .then(status => {
        [email, password, passwordConfirmation].forEach(({setValue}) => setValue(''));
        setPasswordResetFeedback(status);
      }).catch(error => {
        error.json().then(({errors}) => {
          setPasswordResetFeedback('');
          [email, password, passwordConfirmation].forEach(({parseServerError}) => parseServerError(errors));
        });
      });
  };

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-gray-200">
      { passwordResetFeedback !== '' && (
        <div className="bg-white border-l-4 border-blue text-sm text-grey-darker p-4 mb-4 w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3" role="alert">
          <p> {passwordResetFeedback}
            <span className="pl-2"> Please
              <Link to="/login" className="no-underline text-grey-darker font-bold"> login </Link>
              with your new password
            </span>
          </p>
        </div>
      ) }

      <form
        onSubmit={handleSubmit}
        method="POST"
        className="border rounded bg-white border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/3 px-8 py-4">
        <h2 className="text-center mb-4 text-grey-darker">Reset Your Password</h2>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email"> Enter your email address </label>
          <input
            id="email"
            type="email"
            name="email"
            className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker ${email.error ? 'border-red-500' : ''}`}
            placeholder="e.g.jane@example.com"
            required
            autoFocus
            {...email.bind}
          />

          { email.error && <p className="text-red-500 text-xs pt-2">{ email.error }</p> }
        </div>

        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password"> Password </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${password.error ? 'border-red-500' : ''}`}
            minLength={8}
            required
            {...password.bind}/>

          { password.error && <p className="text-red-500 text-xs pt-2">{ password.error}</p> }
        </div>

        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
          <input
            type="password"
            id="password-confirmation"
            name="password_confirmation"
            className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${password.error ? 'border-red' : ''}`}
            required
            {...passwordConfirmation.bind}/>
        </div>

        <div className="mt-6 mb-2">
          <button type="submit"
            className="border rounded-full p-3 text-white bg-indigo-500 w-full font-bold hover:bg-indigo-500-dark">
                Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { login } from '../../api/auth';
import {getIntendedUrl} from '../../utils/auth';
import useInputValue from '../../components/input-value';

function Login () {
  let {setCurrentUser, setToken} = useAuth();
  let history = useHistory();
  let email = useInputValue('email');
  let password = useInputValue('password');

  const handleSubmit = e => {
    e.preventDefault();

    login({
      email: email.value,
      password: password.value
    }).then(({ user, token }) => {
      setToken(token);
      setCurrentUser(user);
      history.push(getIntendedUrl());
    }).catch(error => {
      error.json().then(({errors}) => email.parseServerError(errors));
    });
  };

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-gray-200">
      <div className="p-8 flex flex-col items-center">
        <div>
          <Link to="/">
            <img width="48"
              className="align-middle mx-2"
              alt="laravel"
              title="laravel"
              src="/images/icons/laravel.svg" />
          </Link>
        </div>
        <div className="text-2xl leading-loose">Sign into your account</div>
        <div className="text-gray-800">
          <span className="text-gray-700">Or</span>
          <Link to="/register" className="underline">Start your free trial</Link>
        </div>
      </div>

      <div className="border rounded bg-white border-gray-300 w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 shadow">
        <form onSubmit={handleSubmit}
          method="POST">
          <div className="mb-4 mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                  Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={`appearance-none border rounded w-full py-1 px-3 text-grey-darker bg-gray-100 ${email.error ? 'border-red-500' : ''}`}
              required
              autoFocus
              {...email.bind}
            />

            { email.error && <p className="text-red-500 text-xs pt-2">{ email.error }</p> }
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password"> Password </label>
            <input
              type="password"
              id="password"
              name="password"
              className="appearance-none border rounded w-full py-1 px-3 text-grey-darker bg-gray-100"
              required
              {...password.bind}
            />
          </div>

          <div className="mb-3 flex justify-end">
            <Link to="/forgot-password" className="text-sm underline text-gray-600 font-bold">Forget password?</Link>
          </div>

          <div className="mb-3">
            <button type="submit" className="border rounded px-3 py-2 text-white bg-indigo-500 w-full font-bold">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

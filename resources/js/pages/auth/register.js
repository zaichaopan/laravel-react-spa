import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import {register} from '../../api/auth';
import useInputValue from '../../components/input-value';

function Register () {
  let history = useHistory();
  let { setCurrentUser, setToken } = useAuth();
  let email = useInputValue('email');
  let name = useInputValue('name');
  let password = useInputValue('password');
  let passwordConfirmation = useInputValue('password_confirmation');

  const handleSubmit = e => {
    e.preventDefault();

    register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    }).then(({user, token}) => {
      setCurrentUser(user);
      setToken(token);
      history.push('/home');
    }).catch(error => {
      error.json().then(({errors}) => {
        ;[email, name, password].forEach(({parseServerError}) => parseServerError(errors));
      });
    });
  };

  return (
    <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-gray-200">

      <div className="p-8 flex flex-col items-center">
        <div>
          <Link to="/" >
            <img width="48" className="align-middle mx-2" alt="laravel" title="laravel" src="/images/icons/laravel.svg" />
          </Link>
        </div>
        <div className="text-2xl leading-loose">
              Start your free trial
        </div>
        <div className="text-gray-800">
          <span className="text-gray-700">Or</span> <Link to="/login" className="underline">login to your account</Link>
        </div>
      </div>

      <div className="bg-white border rounded border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 shadow">
        <form onSubmit={handleSubmit}
          method="POST"
        >
          <div className="mb-4 mt-2">
            <label className="block text-gray-700 text-sm mb-1 font-bold" htmlFor="username">
                  Username
            </label>
            <input
              type="text"
              id="username"
              name="name"
              className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${name.error ? 'border-red-500' : ''}`}
              required
              autoFocus
              {...name.bind} />

            { name.error && <p className="text-red-500 text-xs pt-2">{name.error}</p> }
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${email.error ? 'border-red-500' : ''}`}
              required
              {...email.bind} />

            { email.error && <p className="text-500 text-xs pt-2">{ email.error }</p> }
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password"> Password </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100  ${password.error ? 'border-red-500' : ''}`}
              minLength={6}
              required
              {...password.bind}/>

            { password.error && <p className="text-red-500 text-xs pt-2">{ password.error }</p> }
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
            <input
              type="password"
              id="password-confirmation"
              name="password_confirmation"
              className={`appearance-none border rounded w-full py-1 px-3 bg-gray-100 ${password.error ? 'border-red-500' : ''}`}
              required
              {...passwordConfirmation.bind}/>
          </div>

          <div className="mb-4">
            <button className="border rounded p-2 text-white bg-indigo-500 w-full font-bold hover:bg-indigo-500-dark">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

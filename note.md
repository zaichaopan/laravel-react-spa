# React

## How useState and useEffect run the component and render

[https://overreacted.io/a-complete-guide-to-useeffect/](https://overreacted.io/a-complete-guide-to-useeffect/)

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Each function has its own useState and useEffect.

1. react set the state
2. react tell browser tell updated the DOM, using return render and the state
3. browser tells react, I am done
4. react will run the effect that belongs to the render just did.

If state changes, redo the above. There is data binding of count. It just re render

```js
// custom hook
function FormError() {
    let [formError, setFormError] = useState({});

  const hasError = field => {
    return !!formError[field];
  };

  const getError = field => {
    let [error] = formError[field];
    return error;
  };

  const parseServerError = error => {
    if (error.response && error.response.data && error.response.data.errors) {
      setFormError(error.response.data.errors);
    }
  };

  const setError = error => {
    setFormError(prevState => {
      return {
        ...prevState,
        ...error
      };
    });
  };

  return { hasError, getError, setError, parseServerError };
}

function Login() {
    let { hasError, getError, parseServerError, setError } = useFormError();

  let [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    e.persist();
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    setError({ [e.target.name]: '' });
  };
}
```

When login form changes, login re-run and cause useFormError to re-run

```js
import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {getToken, setToken} from '../utils/auth';
import {getUser} from '../api/auth';

const AuthContext = React.createContext();
const AuthConsumer = AuthContext.Consumer;

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};

function AuthProvider ({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const initAuth = () => {
    return getToken()
      ? getUser()
      : Promise.resolve(null);
  };

  const handleUserResponse = ({user, token}) => {
    setToken(token);
    setCurrentUser(user);
    setAuthenticated(!!user);
  };

  const onLogin = handleUserResponse;
  const onRegister = handleUserResponse;
  const onLogout = () => handleUserResponse({user: null, token: null});

  useEffect(() => {
    initAuth().then((user) => {
      setInitializing(false);
      setCurrentUser(user);
      setAuthenticated(!!user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      initializing,
      currentUser,
      onLogin,
      onRegister,
      onLogout,
      authenticated }
    }> { children }
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthConsumer };
```

The reason useEffect doesn't run even when we change the state is because we see the dependencies to []. So only when dependencies are different, the useEffect will run

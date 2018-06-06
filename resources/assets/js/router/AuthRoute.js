import React from "react";
import store from '../store'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";


export default ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const { auth: { authenticated }, share: { loading } } = store.getState();

            console.log(loading);

            return loading || authenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )

        }
        }
    />
);

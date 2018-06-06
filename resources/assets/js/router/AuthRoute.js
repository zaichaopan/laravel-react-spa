import React from "react";
import store from '../store'
import { Route, Redirect } from "react-router-dom";
import AppLayoutRoute from './ AppLayoutRoute';

export default ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const { auth: { authenticated }, share: { loading } } = store.getState();

            return loading || authenticated ? (
                <AppLayoutRoute component={Component} {...props} />
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

// {/* <Component {...props} /> */}

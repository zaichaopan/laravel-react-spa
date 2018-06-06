import React from "react";
import store from '../store'
import { Route, Redirect } from "react-router-dom";
import AppLayoutRoute from './ AppLayoutRoute';
import { setIntendedUrl } from '../helpers';

export default ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const { auth: { authenticated }, share: { loading } } = store.getState();

            if (!authenticated) {
                setIntendedUrl(props.location.pathname);
            }

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




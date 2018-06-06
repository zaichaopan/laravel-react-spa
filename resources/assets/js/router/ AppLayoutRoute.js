import React from "react";
import { Route, } from "react-router-dom";
import AppLayout from '../pages/layouts/AppLayout';

const AppLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            <AppLayout>
                <Component {...props} />
            </AppLayout>
        )} />
    )
};

export default AppLayoutRoute;

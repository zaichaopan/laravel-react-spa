import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import SignIn from './SignIn';
import Register from './Register';
import Nav from './Nav';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = { store: PropTypes.object.isRequired };

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Nav />
                    <div className="flex flex-1">
                        <Route exact path="/" component={Welcome} />
                        <Route path="/register" component={Register} />
                        <Route path="/signin" component={SignIn} />
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'


class NotFound extends Component {
    render() {
        return (
            <div className="flex flex-col min-h-screen">
                <Nav />
                <div className="flex flex-col flex-1 items-center">
                    <h1 className="py-8">Sorry, that page isn’t here.</h1>
                    <p>
                        You didn’t do anything wrong. We may have moved the page you’re looking for somewhere else.
                </p>
                </div>
            </div>
        )
    }
}

export default NotFound;

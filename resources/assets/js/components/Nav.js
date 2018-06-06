import React from 'react';
import { Link } from "react-router-dom";


export default () => (
    <div className="flex h-16 border-b border-grey-light">
        <ul>
            <li>
                <Link to="/">Welcome</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/signin">Login</Link>
            </li>
        </ul>
    </div>
);

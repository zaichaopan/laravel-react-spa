import React from 'react';
import { NavLink } from 'react-router-dom';

const GuestNav = () => {
  return (
    <div className="container flex w-full justify-end">
      <ul className="list-reset flex pt-4">
        <li className="px-2">
          <NavLink to="/register"
            className="no-underline text-grey-darker"
            activeClassName="font-bold">Register</NavLink>
        </li>
        <li className="px-2">
          <NavLink to="/signin"
            activeClassName="font-bold"
            className="no-underline text-grey-darker">Sign in</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default GuestNav;

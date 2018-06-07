import React from 'react';
import GuestNav from '../components/GuestNav';

const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <GuestNav />

      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-indigo p-2"> Hello <span className="">Dev!</span> Start crafting your app now!</h1>

        <div className="flex items-center">
          <img src='/images/icons/laravel.svg' className="h-32" />
          <span className="text-3xl font-bold">&#43;</span>
          <img src='/images/icons/react.svg' className="h-24" />
        </div>
      </div>

    </div>
  );
};

export default Welcome;

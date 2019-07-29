import React from 'react';

const Footer = () => (
  <div className="bg-grey-lightest h-32 text-center">
    <div className="container mx-auto flex flex-col">
      <p className="px-4 py-8 text-grey-dark font-light text-sm">
                &copy;{(new Date()).getFullYear()}  Laravel React SPA
      </p>
    </div>
  </div>
);

export default Footer;

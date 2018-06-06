import React from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

const AppLayout = ({ children, ...rest }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <div className="flex flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout;

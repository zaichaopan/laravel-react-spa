import React from 'react';
import AuthNav from '../../components/AuthNav';
import Footer from '../../components/Footer';

const AppLayout = ({ children, ...rest }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <AuthNav />
            <div className="flex flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout;

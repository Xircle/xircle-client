import React from 'react'
import Footer_nav from './Footer_nav/footer_nav';

const Layout = ({ children }) => {
    return (
        <div>
            <div 
                style={{ minWidth: "320px", maxWidth: "414px", border: '1px solid #ccc' }}
                className="flex flex-col mx-auto h-screen relative"
            >
                

            {/*  main custom  */}
            <main>
                {children}
            </main>

            {/* footer */}
            <Footer_nav />
            </div>
    )
}

export default Layout;
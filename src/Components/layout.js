import React from 'react'
import Footer_nav from './footer_nav';
import Banner from './banner';
import { Link } from 'react-router-dom';

const Layout = ({ children, headerNone }) => {
    return (
        <div 
            style={{ minWidth: "320px", maxWidth: "414px", maxHeight: '100vh', border: "1px solid gray"}}
            className="flex flex-col mx-auto h-screen relative"
        >
            {/* Navigation */}
            {!headerNone ? (
                <>
                    <nav className="flex flex-row justify-between px-3 py-5">
                        <Link to="/person">
                            <img
                                style={{width: 50, height: 50}}
                                src="https://2donny.github.io/ykring/yk-logo.png"
                                className=" rounded-2xl"
                            />
                        </Link>
                        <div className="flex flex-row items-center">
                            <Link to="/">
                            <h1 className="mx-2 font-bold hover:text-blue-400">돌아가기</h1>
                            </Link>
                            <h1 className="mx-2 cursor-pointer font-bold hover:text-red-600 hover:font-bold">신고하기</h1>
                        </div>
                    </nav>
                    {/* Banner */}
                    <Banner />
                </>
            ) : (
                null
            )}
            
            {/*  main custom  */}
            <main className="h-screen">
                {children}
            </main>

            {/* footer */}
            <Footer_nav />
        </div>
    )
}

export default Layout;
import React from 'react';
import Headroom from 'react-headroom';

const Layout = ({ children}) => {
  return (
    <>
        {/* header */}
        <Headroom
            className="bg-transparent"
            style={{transition: 'all .5s ease-in-out' }}
        >
            <h1 className="text-3xl font-bold text-white">연고링</h1>
            <nav>
                <ul className="flex flex-row ">
                    <li className="text-2xl font-bold mx-5 text-white">사용법</li>
                    <li className="text-2xl font-bold mx-5 text-white">로그인</li>
                </ul>
            </nav>
        </Headroom>

        <main>
            {children}
        </main>

        <footer>
        </footer>
    </>
  );
}

export default Layout;

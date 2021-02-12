import React from 'react';

const Layout = ({ children}) => {
  return (
    <>
        {/* header */}
        <header className="flex flex-row justify-between px-10 py-7 absolute top-0 left-0">
            <h1 className="text-3xl font-bold text-white">연고링</h1>
            <nav>
                <ul className="flex flex-row ">
                    <li className="text-2xl font-bold mx-5 text-white">사용법</li>
                    <li className="text-2xl font-bold mx-5 text-white">로그인</li>
                </ul>
            </nav>
        </header>

        <main>
            {children}
        </main>

        <footer>
        </footer>
    </>
  );
}

export default Layout;

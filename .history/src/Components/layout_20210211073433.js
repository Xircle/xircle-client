import React from 'react';

const Layout = ({ children}) => {
  return (
    <>
        <header>
            <h1>연고링</h1>
            <ul>
                <li>사용법</li>
                <li>로그인</li>
            </ul>
        </header>

        {children}

        <footer>
        </footer>
    </>
  );
}

export default Layout;

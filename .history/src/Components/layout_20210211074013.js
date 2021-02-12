import React from 'react';

const Layout = ({ children}) => {
  return (
    <>
        <header className="flex flex-row justify-between">
            <h1 className="tex-2">연고링</h1>
            <ul className="flex flex-row">
                <li>사용법</li>
                <li>로그인</li>
            </ul>
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

import React from 'react';

const Layout = ({ children}) => {
  return (
    <>
        <main>
            {children}
        </main>

        <footer>
        </footer>
    </>
  );
}

export default Layout;

import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Sidebar />
      <main style={{ flexGrow: 1}}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <span className="pad-x-page pt-8 font-mono text-3xl font-bold">
        virtualization, compression, checkboxes.
      </span>
      {children}
    </div>
  );
};

export default Layout;

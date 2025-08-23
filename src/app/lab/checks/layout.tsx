import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <div className="pad-x-page pt-8">
        <span className="font-mono text-3xl font-bold">
          virtualization, compression, checkboxes.
        </span>
        <p className="font-mono text-sm text-foreground-neutral">
          There&apos;s a 100,000 checkboxes. The goal is to simulate large
          number of items, manage their states, and come up with a more
          efficient storing technique to save the large number of states.
        </p>
      </div>
      {children}
    </div>
  );
};

export default Layout;

import React from 'react';

const CodeInline = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-fit rounded-sm border border-border bg-card px-2 py-0.5 font-mono font-semibold">
      {children}
    </div>
  );
};

export default CodeInline;

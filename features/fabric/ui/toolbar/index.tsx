import React from 'react';

interface ToolbarProps {
  children: React.ReactNode;
}

const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center h-[200px]">
      {children}
    </div>
  );
};

export default Toolbar;

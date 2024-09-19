import React from 'react';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="mx-auto flex w-full max-w-[1255px] items-center justify-between p-4">
        {children}
      </div>
    </div>
  );
};

export default MainContainer;

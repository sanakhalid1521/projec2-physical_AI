import React from 'react';
import FloatingChatButton from './FloatingChatButton';

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <FloatingChatButton />
    </>
  );
};

export default LayoutProvider;
import React from 'react';
import LayoutProvider from '../components/LayoutProvider';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return <LayoutProvider>{children}</LayoutProvider>;
};

export default LayoutWrapper;
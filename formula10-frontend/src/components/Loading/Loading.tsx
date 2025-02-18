import React from 'react';
import { PulseLoader } from 'react-spinners';
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  const {theme} = useTheme();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-100">
      <PulseLoader color={theme === 'dark' ? 'var(--color-blue)' : 'var(--color-primary)'} size={15} margin={2} />
    </div>
  );
};

export default Loading;
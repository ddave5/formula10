import React, { createContext, useState, useContext } from 'react';

const ErrorContext = createContext({
  error: null as string | null,
  showError: (message: string) => {},
  clearError: () => {},
});

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }: any) => {
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};
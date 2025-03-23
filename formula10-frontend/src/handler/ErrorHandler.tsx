import React, { useState, useEffect } from 'react';
import eventBus from '../services/eventBus';
import ErrorDialog from '../components/Error/ErrorDialog';
import SnackbarComponent from '../components/Snackbar/SnackbarComponent';

interface ErrorHandlerProps {
  children: React.ReactNode; // Add a children prop type definition
}


const ErrorHandler: React.FC<ErrorHandlerProps> = ({ children }) => {
  const [message, setMessage] = useState<string>('');
  const [isDialog, setIsDialog] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success'); // Severity state

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const handleError = (error: any) => {
      const { message, isDialog } = error;

      setSeverity('error');
      setIsDialog(isDialog);
      setMessage(message);

      if (isDialog) {
        setOpenDialog(true);
      } else {
        setOpenSnackbar(true);
      }
    };

    const handleSuccess = (success: any) => {
      const { message } = success;
      setSeverity('success');
      setSuccessMessage(message);
      setOpenSnackbar(true);
    };

    eventBus.on('error', handleError);
    eventBus.on('success', handleSuccess);


    return () => {
      eventBus.off('error', handleError);
      eventBus.off('success', handleSuccess);

    };
  }, []);

  return (
    <>
      <ErrorDialog open={openDialog} onClose={handleCloseDialog} message={message} />
      <SnackbarComponent open={openSnackbar} onClose={handleCloseSnackbar} message={severity === 'error' ? message : successMessage} severity={severity}  />
      {children}
    </>
  );
};

export default ErrorHandler;
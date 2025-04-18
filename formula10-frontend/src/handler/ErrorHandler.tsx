import type React from 'react';
import { useState, useEffect } from 'react';
import eventBus, { type EventMap } from '../services/eventBus';
import ErrorDialog from '../components/Error/ErrorDialog';
import SnackbarComponent from '../components/Snackbar/SnackbarComponent';

interface ErrorHandlerProps {
  children: React.ReactNode;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    const handleError = (error: EventMap['error']) => {
      setMessage(error.message);
      setSeverity('error');
      error.isDialog ? setOpenDialog(true) : setOpenSnackbar(true);
    };

    const handleSuccess = (success: EventMap['success']) => {
      setSuccessMessage(success.message);
      setSeverity('success');
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
      <SnackbarComponent
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={severity === 'error' ? message : successMessage}
        severity={severity}
      />
      {children}
    </>
  );
};

export default ErrorHandler;
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ open, onClose, title = "Error", message }: {open: boolean, onClose: () => void, title?: string, message: string}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="error-dialog-title">
      <DialogTitle id="error-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { TbFaceIdError } from "react-icons/tb";
import { useTranslation } from 'react-i18next';


interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ open, onClose, title = "Error", message }: {open: boolean, onClose: () => void, title?: string, message: string}) => {

  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="error-dialog-title" sx={{ '& .MuiDialog-paper': { minWidth: '300px'} }}>
      <DialogTitle id="error-dialog-title" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TbFaceIdError className='text-[120px] text-[var(--color-primary)] mb-2 '/>
        <h2 className='text-[var(--color-primary)] mb-4 text-xl dark:text-[var(--color-font)]'>{title}</h2>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center'}}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('error.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { t } from 'i18next';
import React, { useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi';
import { useTheme } from '../../../layout/navbar/Theme/ThemeContext';
import { checkOldPassword, deleteUserAccount } from '../../../services/user.service';
import eventBus from '../../../services/eventBus';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/AuthSlice';
import type { RootState } from '../../../redux/Store';
import PasswordInput from '../../../components/passwordInput/PasswordInput';

const DeleteProfile = () => {

    const { user } = useSelector((state: RootState) => state.auth);

  const [open, setOpen] = React.useState(false);  
  const [deletePassword, setDeletePassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {theme} = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDeletePassword('');
    setOpen(false);
  };

  const deleteAccount = async () => {
    const isValidOldPassword = await checkOldPassword(deletePassword, user?.id || 0);

    if (!isValidOldPassword) {
      eventBus.emit('error', { message: t('messages.errorDeleteAccount'), isDialog: false });
      return;
    }
    
    const response = await deleteUserAccount(user?.id || 0);
    if (response) {
      eventBus.emit('success', { message: t('messages.successDeleteAccount') });
      setDeletePassword('');
      dispatch(logout());
      navigate('/');
    } 
  }
  return (
    <>
        <Card className="border-destructive dark:bg-gray-800 dark:text-white">
            <CardHeader
                className='flex items-center text-destructive'
                avatar={<FiAlertTriangle />}
                title={t('profile.deleteTitle')}
                sx={{".MuiCardHeader-subheader": {color: theme === 'dark' ? 'var(--color-text)' : 'bg-gray-800'}}}
                subheader={t('profile.deleteSubTitle')}
            />
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    {t('profile.deleteDescription')}
                </p>
                <Button type="submit" variant="contained" color="error" onClick={handleClickOpen}>
                    {t('profile.deleteAccount')}
                </Button>
            </CardContent>
        </Card>
        <Dialog
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries()) as { [key: string]: FormDataEntryValue };
                const email = formJson.email?.toString();
                console.log(email);
                handleClose();
              },
            },
          }}
        >
          <DialogTitle
            sx={{backgroundColor: theme === 'dark' ? 'var(--color-gray)' : 'var(--color-font)',
                color: theme === 'dark' ? 'var(--color-font)' : 'var(--color-black)'}}
          >{t('profile.deleteDialogTitle')}</DialogTitle>
          <DialogContent 
            sx={{
              backgroundColor: theme === 'dark' ? 'var(--color-gray)' : 'var(--color-font)',
            }}
              >
            <DialogContentText
              sx={{
                color: theme === 'dark' ? 'var(--color-font)' : 'var(--color-black)'
              }}>
              {t('profile.deleteDialogDescription')}
            </DialogContentText>
            <PasswordInput props={{
                password: deletePassword,
                setPassword: setDeletePassword,
                label:'password',
                sx:{width: '100%', marginTop: '1rem'}
            }} />
            </DialogContent>
            <DialogActions
                sx={{
                backgroundColor: theme === 'dark' ? 'var(--color-gray)' : 'var(--color-font)',
                }}>
                <Button onClick={handleClose} variant='contained'>{t('profile.cancel')}</Button>
                <Button onClick={deleteAccount} color='error' variant='contained'>{t('profile.deleteAccount')}</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default DeleteProfile
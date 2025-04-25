import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import { IoIosLock } from "react-icons/io";
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { FiAlertTriangle } from "react-icons/fi";
import { CharacterValidator, PasswordValidator } from '../../utils/Validator';
import { changePasswordForUser, checkOldPassword, deleteUserAccount } from '../../services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/Store';
import { t } from 'i18next';
import eventBus from '../../services/eventBus';
import { logout } from '../../redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';
import ChangeEmail from './ChangeEmail/ChangeEmail';


const Profile = () => {

  const { user } = useSelector((state: RootState) => state.auth);

  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  const [showPasswordErrors, setShowPasswordErrors] = useState(false);

  const [deletePassword, setDeletePassword] = useState('');
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {theme} = useTheme();



  const validatePassword = async () => {

    const isValidOldPassword = await checkOldPassword(oldPassword, user?.id || 0);
    
    // Ellenőrizd az összes mező validitását
    const isValid = (
      isValidOldPassword &&
      CharacterValidator(newPassword) && PasswordValidator(newPassword) &&
      !(newPassword !== confirmPassword || confirmPassword === "")
    );
    return isValid;
  };

  const changePassword = async () => {
    setShowPasswordErrors(true);

    const isValid = await validatePassword();
    
    if (isValid) {
      const response = await changePasswordForUser(user?.email || '', newPassword);

      if (response) {
        eventBus.emit('success', { message: t('messages.successUserPasswordChange') });
      }
    }
  }

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
    <div className='flex flex-col items-center'>
      <div className="w-full max-w-3xl py-10">
        <div className='w-full'>
          <h2 className="text-3xl font-bold mb-6 pl-4">{t('profile.title')}</h2>
        </div>
      
        <ChangeEmail />

        {/* Password Update Section */}
        <Card className="mb-8 dark:bg-gray-800 dark:text-white">
          <CardHeader
            className="flex items-center"
            avatar={<IoIosLock />}
            title={t('profile.passwordTitle')}
            sx={{".MuiCardHeader-subheader": {color: theme === 'dark' ? 'var(--color-text)' : 'bg-gray-800'}}}
            subheader={t('profile.subTitle')}/>
          <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <PasswordInput props={{
                password: oldPassword,
                setPassword: setOldPassword,
                label:'oldPassword'
              }}
            />
            <PasswordInput props={{
                password: newPassword,
                setPassword: setNewPassword,
                label:'password',
                validation: [
                  {error: newPassword.length === 0, errori18n: 'validation.passwordEmpty'},
                  {error: !CharacterValidator(newPassword), errori18n: 'validation.invalidPasswordCharacter'},
                  {error: !PasswordValidator(newPassword), errori18n: 'validation.invalidPassword'}
                ],
                showError: showPasswordErrors,
              }}
            />
            <PasswordInput props={{
                password: confirmPassword,
                setPassword: setConfirmPassword, 
                label: 'passwordAgain',
                validation: [
                  {error: (newPassword !== confirmPassword || confirmPassword === ""), errori18n: 'validation.passwordsDontMatch'}
                ],
                showError: showPasswordErrors
              }}
            />
            <Button onClick={changePassword} variant='contained'>
              {t('profile.updatePassword')}
            </Button>
          </CardContent>
        </Card>

      {/* Delete Account Section */}
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
      </div>
    </div>
  )
}

export default Profile

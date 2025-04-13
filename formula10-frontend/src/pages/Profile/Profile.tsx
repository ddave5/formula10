import { Button, Card, CardContent, CardHeader } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdMail } from "react-icons/io";
import TextInput from '../../components/TextInput/TextInput';
import { IoIosLock } from "react-icons/io";
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { FiAlertTriangle } from "react-icons/fi";
import { CharacterValidator, EmailValidator, PasswordValidator } from '../../utils/Validator';
import { changeEmail, changePasswordForUser, checkEmailAvailability, checkOldPassword } from '../../services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { t } from 'i18next';
import eventBus from '../../services/eventBus';
import { changeEmailInStore } from '../../redux/slices/AuthSlice';


const Profile = () => {

  const { user } = useSelector((state: RootState) => state.auth);

  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailAvailable, setEmailAvailable] = useState(true);

  const [showEmailErrors, setShowEmailErrors] = useState(false);
  const [showPasswordErrors, setShowPasswordErrors] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInformations = async () => {
      try {
        if (user === null) return;
        setNewEmail(user.email || '');
      } catch (error) {
        console.log(error);
      }
    }

    getUserInformations();
  }, []);

  const validateEmail = async () => {

    const checkEmail = async (email: string) => {
      if (email.trim()) {
        const isAvailable = await checkEmailAvailability(email);
        setEmailAvailable(isAvailable);
        return isAvailable;
      } else {
        setEmailAvailable(true);
        return true;
      }
    };

    const emailValid = await checkEmail(newEmail);
    
    // Ellenőrizd az összes mező validitását
    const isValid = (
      emailValid && 
      newEmail.length <= 100 && newEmail.length > 0 && EmailValidator(newEmail)
    );
    return isValid;
  };

  const changeEmailAddress = async () => {
    setShowEmailErrors(true);

    const isValid = await validateEmail();
    
    if (isValid) {
      const response = await changeEmail(newEmail, user?.id || 0);

      if (response) {
        eventBus.emit('success', { message: t('profile.successEmailChange') });
        dispatch(changeEmailInStore(newEmail));
      }
    }
  }

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
        eventBus.emit('success', { message: t('profile.successPasswordChange') });
      }
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className="w-full max-w-3xl py-10">
        <div className='w-full'>
          <h2 className="text-3xl font-bold mb-6">{t('profile.title')}</h2>
        </div>
      
        <Card className="mb-8">
          <CardHeader 
            avatar={
              <IoMdMail />
            }
            title={t('profile.emailTitle')}
            subheader={t('profile.subTitle')}/>
          <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <TextInput props={
              {
                id: 'email',
                isRequired: true,  
                type: 'text', 
                i18n: 'profile.email', 
                variant: 'outlined', 
                value: newEmail, setValue: setNewEmail,
                validation: [
                  {error: newEmail.length === 0, errori18n: 'profile.emailEmpty'}, 
                  {error: newEmail.length > 100 , errori18n: 'profile.emailLength'},
                  {error: !EmailValidator(newEmail), errori18n: 'profile.invalidEmail'},
                  {error: !emailAvailable, errori18n: 'profile.emailAlreadyTaken'}
                ],
                showError: showEmailErrors
              }}
            />
            <Button onClick={changeEmailAddress} variant='contained'>
              {t('profile.updateEmail')}
            </Button>
        
          </CardContent>
        </Card>

        {/* Password Update Section */}
        <Card className="mb-8">
          <CardHeader
            className="flex items-center"
            avatar={<IoIosLock />}
            title={t('profile.passwordTitle')}
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
                  {error: !CharacterValidator(newPassword), errori18n: 'profile.invalidCharacter'},
                  {error: !PasswordValidator(newPassword), errori18n: 'profile.invalidPassword'}
                ],
                showError: showPasswordErrors
              }}
            />
            <PasswordInput props={{
                password: confirmPassword,
                setPassword: setConfirmPassword, 
                label: 'passwordAgain',
                validation: [
                  {error: (newPassword !== confirmPassword || confirmPassword === ""), errori18n: 'profile.passwordsDontMatch'}
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
        <Card className="border-destructive">
          <CardHeader
            className='flex items-center text-destructive'
            avatar={<FiAlertTriangle />}
            title={t('profile.deleteTitle')}
            subheader={t('profile.deleteSubTitle')}
          />
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {t('profile.deleteDescription')}
            </p>
            <Button type="submit" variant="contained" color="error">
              {t('profile.deleteAccount')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profile

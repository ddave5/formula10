import { Button, Card, CardContent, CardHeader } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdMail } from 'react-icons/io'
import TextInput from '../../../components/TextInput/TextInput'
import { t } from 'i18next'
import eventBus from '../../../services/eventBus'
import { useDispatch, useSelector } from 'react-redux'
import { changeEmail, checkEmailAvailability } from '../../../services/user.service'
import { EmailValidator } from '../../../utils/Validator'
import { changeEmailInStore } from '../../../redux/slices/AuthSlice'
import { useTheme } from '../../../layout/navbar/Theme/ThemeContext'
import type { RootState } from '../../../redux/Store'

const ChangeEmail = () => {

    const { user } = useSelector((state: RootState) => state.auth);

    const [newEmail, setNewEmail] = useState('');
    const [emailAvailable, setEmailAvailable] = useState(true);
    const [showEmailErrors, setShowEmailErrors] = useState(false);

    const {theme} = useTheme();

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
      }, [user]);
    
      const validateEmail = async () => {
    
        const checkEmail = async (email: string) => {
          if (email.trim()) {
            const isAvailable = await checkEmailAvailability(email);
            setEmailAvailable(isAvailable);
            return isAvailable;
          }
          setEmailAvailable(true);
          return true;
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
            eventBus.emit('success', { message: t('messages.successEmailChange') });
            dispatch(changeEmailInStore(newEmail));
          }
        }
      }


  return (
    <Card className="mb-8 dark:bg-gray-800 dark:text-white">
        <CardHeader 
        avatar={
            <IoMdMail />
        }
        sx={{".MuiCardHeader-subheader": {color: theme === 'dark' ? 'var(--color-text)' : 'bg-gray-800'}}}
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
  )
}

export default ChangeEmail
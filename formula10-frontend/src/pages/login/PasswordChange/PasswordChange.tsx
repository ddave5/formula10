import React, { useEffect, useState } from 'react'
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel'
import { Button, FormControl, TextField } from '@mui/material'
import PasswordInput from '../../../components/passwordInput/PasswordInput'
import { useTranslation } from 'react-i18next'
import Error from '../../../components/Error/Error';
import { darkInputStyle, lightInputStyle } from '../../../components/TextInput/InputStyle'
import { useTheme } from '../../../layout/navbar/Theme/ThemeContext'
import { changePassword } from '../../../services/userService'

const PasswordChange = () => {

  const { t } = useTranslation();
  const { theme } = useTheme();
  
  const [changeDone, setChangeDone] = useState(false); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  useEffect(() => {
    setEmailError(false);
  }, [email]);

  useEffect(() => {
    setPasswordError(false);
  }, [password]);

  useEffect(() => {
    setConfirmPasswordError(false);
  }, [confirmPassword]);

  const validation = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      isValid = false;
      setEmailError(true);
    }
  
    if (!validatePassword(password)) {
      isValid = false;
      setPasswordError(true);
    } 
  
    if (password !== confirmPassword || confirmPassword === "") {
      isValid = false;
      setConfirmPasswordError(true);
    } 

    return isValid; 
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email !== "";
  };
  
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~`#^()-+=|:;/_])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password) && password !== "";
  };

  const changePwd = () => {
        if (validation()) {
          try {
            changePassword(email, password).then((response) => {
              const data = response;
              if (data) {
                setChangeDone(true);
              }
            }).catch( (err) => {
              setError('Error, sorry. :(');
            });
          } catch (err) {
            setError('Error again, sorry. :(');
          }
        }
  }
  
  return (
    <>
      {changeDone ? (
          <SuccessPanel title='passwordChange.successTitle' details='passwordChange.successDetails' url={'/login'} />
      ) : (
        <div className='flex flex-col items-center my-8'>
          <div className='flex flex-col p-8 xl:w-2/3 sm:w-1/2 lg:w-1/3'>
            <p className="text-4xl title-font whitespace-nowrap dark:text-white mb-16 text-center">{t('passwordChange.passwordChange')}</p>
            <div className='flex flex-col space-y-4'>
              {error && <Error errorMessage={error} />}
              <FormControl sx={{ '& .MuiTextField-root': { marginBottom: '.5rem'}}}>
                <TextField id='email' 
                type='email'
                required 
                placeholder={t('passwordChange.email')} 
                variant='outlined' 
                label={t('passwordChange.email')} 
                size='small' 
                className='sm:text-sm' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off'
                                            sx={ theme === "dark" ? darkInputStyle : lightInputStyle }/>
                { emailError && <span className='text-red-500 text-sm mb-2'>{t('passwordChange.invalidEmail')}</span>} 
                <PasswordInput password={password} setPassword={setPassword} label='newPassword' />
                { passwordError && <span className='text-red-500 text-sm mb-2'>{t('passwordChange.invalidPassword')}</span>}     
                <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} label='newPasswordAgain' />
                { confirmPasswordError && <span className='text-red-500 text-sm mb-2'>{t('passwordChange.passwordsDontMatch')}</span>}          
                <Button onClick={changePwd} className='dark:text-[--color-font]'
                        sx={{borderStyle: 'solid', borderColor: 'var(--color-blue)', borderWidth: '2px', color: 'var(--color-gray)'}}>
                          {t('passwordChange.change')}
                </Button>
              </FormControl>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PasswordChange
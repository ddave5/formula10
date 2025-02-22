import { Button, Checkbox, Divider, FormControl, FormControlLabel, TextField } from '@mui/material';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import {debounce} from 'lodash';
import { checkUsernameAvailability, registerUser } from '../../services/userService';
import Error from '../../components/Error/Error';
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';
import SuccessPanel from '../../components/SuccessPanel/SuccessPanel';

const Registration = () => {
  const { t } = useTranslation();

  const [registrationDone, setRegistrationDone] = useState(false);

  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const { theme } = useTheme();

  const checkUsername = debounce(async (username: string) => {
    if (username) {
      const isAvailable = await checkUsernameAvailability(username); // Hívás a service-ből
      setUsernameAvailable(isAvailable);
    }
  }, 500);

  useEffect(() => {
    checkUsername(username);
  }, [checkUsername, username]);

  useEffect(() => {
    setEmailError(false);
  }, [email]);

  useEffect(() => {
    setPasswordError(false);
  }, [password]);

  useEffect(() => {
    setConfirmPasswordError(false);
  }, [confirmPassword]);


  const register = async () => {

    if (validation()) {
      try {
        registerUser({
          username: username,
          email: email,
          password: password
        }).then((response) => {
          const data = response.success;
          if (data) {
            setRegistrationDone(true);
          }
        }).catch( (err) => {
          setError('Email is already taken!');
        });
      } catch (err) {
        setError('Email is already taken!');
      }
    }
  };

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

    if (!usernameAvailable) {
      isValid = false;
    }
    
    return isValid; 
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email !== "";
  };
  
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password) && password !== "";
  };

  //TODO - When you save the theme mode into the Redux store, then change the lightInputStyle and darkInputStyle to use the Redux store value

  const darkInputStyle = {
    '.css-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input' : {color: 'var(--color-font)'}, 
    '.MuiInputLabel-root': {color: 'var(--color-font)'}, 
    '.MuiOutlinedInput-notchedOutline' : {borderColor: 'var(--color-font)'}, 
    '&:hover .MuiOutlinedInput-notchedOutline' : {borderColor: 'var(--color-font)'}
}

  const lightInputStyle = {
    '.css-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input' : {color: 'var(--color-gray)'}, 
    '.MuiInputLabel-root': {color: 'var(--color-gray)'}, 
    '.MuiOutlinedInput-notchedOutline' : {borderColor: 'var(--color-gray)'}, 
    '&:hover .MuiOutlinedInput-notchedOutline' : {borderColor: 'var(--color-gray)'}
  }

  const darkCheckBoxStyle = {
    '.css-1umw9bq-MuiSvgIcon-root': {color: 'var(--color-font)'},
  }

  const lightCheckBoxStyle = {
    '.css-1umw9bq-MuiSvgIcon-root': {color: 'var(--color-gray)'},
  }

  const termsAndConditions = () => {
    const el1 = t('registration.acceptTerms1');
    const el2 = <Link to='/termsOfUse' className='text-[--color-blue] before:bg-[--color-blue]'>{t('registration.acceptTerms2')}</Link>;
    const el3 = t('registration.acceptTerms3');
    const el4 = <Link to='/privacyPolicy' className='text-[--color-blue] before:bg-[--color-blue]'>{t('registration.acceptTerms4')}</Link>;
    const el5 = t('registration.acceptTerms5');

    return (
      <div className='text-justify w-full'>
        <span className='text-md '>{el1} {el2} </span>
        <br />
        <span className='text-md '>{el3} {el4} {el5}</span>  
      </div>
    )
  }

  return (
    <>
      {registrationDone ? (
        <SuccessPanel title='registration.successTitle' details='registration.successDetails' url={'/login'} />
      ) : (
        <div className='flex flex-col items-center justify-center xxl:h-[80dvh] my-4'>
          <div className='flex flex-col p-8 border-solid border-2 border-gray-200 rounded-md shadow-md dark:border-gray-700 dark:bg-gray-800 xxl:w-1/4 sm:w-1/2 lg:w-1/3'>
            <p className="text-2xl title-font whitespace-nowrap dark:text-white mb-4">Formula 10</p>
            <h2 className='text-3xl whitespace-nowrap dark:text-white mb-8'>{t('registration.login')}</h2>
            <div className='flex flex-col space-y-4'>
              {error && <Error errorMessage={error} />}
              
              <FormControl sx={{ '& .MuiTextField-root': { marginBottom: '.5rem'}}}>
                <TextField id='username' required placeholder={t('registration.username')} variant='outlined' label={t('registration.username')} size='small' className='sm:text-sm' value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='off'
                          sx={ theme === "dark" ? darkInputStyle : lightInputStyle}/>
                          {!usernameAvailable && <span className='text-red-500 text-sm mb-2'>{t('registration.usernameAlreadyTaken')}</span>} 
                <TextField id='email' required type='email' placeholder={t('registration.email')} variant='outlined' label={t('registration.email')} size='small' className='sm:text-sm' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off'
                          sx={ theme === "dark" ? darkInputStyle : lightInputStyle}/>
                          { emailError && <span className='text-red-500 text-sm mb-2'>{t('registration.invalidEmail')}</span>} 
                <TextField id='password' required type='password' placeholder={t('registration.password')} variant='outlined' label={t('registration.password')} size='small' className='text-2xl' value={password} onChange={(e) => setPassword(e.target.value)}
                          sx={ theme === "dark" ? darkInputStyle : lightInputStyle}/>
                          { passwordError && <span className='text-red-500 text-sm mb-2'>{t('registration.invalidPassword')}</span>} 
                <TextField id='confirmPassword' required type='password' placeholder={t('registration.passwordAgain')} variant='outlined' label={t('registration.passwordAgain')} size='small' className='text-2xl' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                          sx={ theme === "dark" ? darkInputStyle : lightInputStyle}/>
                          { confirmPasswordError && <span className='text-red-500 text-sm mb-2'>{t('registration.passwordsDontMatch')}</span>}          
                <div className='my-4'>
                  <FormControlLabel 
                    label={termsAndConditions()}
                    control={<Checkbox onChange={() => setAcceptTerms(!acceptTerms)}/>} 
                    value={acceptTerms} sx={ theme === "dark" ? darkCheckBoxStyle : lightCheckBoxStyle}/>
                </div>

                <Button onClick={register} className='dark:text-[--color-font]' disabled={!acceptTerms}
                        sx={{borderStyle: 'solid', borderColor: 'var(--color-blue)', borderWidth: '2px', color: 'var(--color-gray)'}}>
                          {t('registration.signUp')}
                </Button>
              </FormControl>
              <Divider> {t('registration.or')} </Divider>
              <Button disabled startIcon={<FcGoogle />} className='dark:text-[--color-font]'
                      sx={{borderStyle: 'solid', borderColor: 'var(--color-blue)', borderWidth: '2px', color: 'var(--color-blue)'}}>{t('registration.google')}</Button>
              <span className='text-center'> {t('registration.alreadyHaveAccount')} <Link to="/Login" className='text-[--color-blue] before:bg-[--color-blue]'>{t('registration.login')}</Link> </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Registration
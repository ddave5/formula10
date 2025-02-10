import { Button, Divider, FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import {debounce, set} from 'lodash';
import { checkUsernameAvailability, registerUser } from '../../services/userService';
import Error from '../../components/Error/Error';

const Registration = () => {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const checkUsername = debounce(async (username: string) => {
    if (username) {
      const isAvailable = await checkUsernameAvailability(username); // Hívás a service-ből
      setUsernameAvailable(isAvailable);
    }
  }, 500);

  useEffect(() => {
    checkUsername(username);
  }, [username]);

  useEffect(() => {
    setNameError('');
  }, [name]);

  useEffect(() => {
    setEmailError('');
  }, [email]);

  useEffect(() => {
    setPasswordError('');
  }, [password]);

  useEffect(() => {
    setConfirmPasswordError('');
  }, [confirmPassword]);


  const register = async () => {

    if (validation()) {
      try {
        registerUser({
          name: name,
          username: username,
          email: email,
          password: password
        }).then((response) => {
          const data = response.success;
          if (data) {
            navigate('/success');
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
    if (name === "") {
      setNameError(t('registration.nameIsEmpty'));
    } else {
      setNameError('');
    }

    if (!validateEmail(email)) {
      setEmailError(t('registration.invalidEmail'));
    } else {
      setEmailError('');
    }
  
    if (!validatePassword(password)) {
      setPasswordError(t('registration.invalidPassword'));
    } else {
      setPasswordError('');
    }
  
    if (password !== confirmPassword || confirmPassword === "") {
      setConfirmPasswordError(t('registration.passwordsDontMatch'));
    } else {
      setConfirmPasswordError('');
    }
    
    return usernameAvailable && !emailError && !passwordError && !confirmPasswordError ;
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email !== "";
  };
  
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password) && email !== "";
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

  return (
    <div className='flex flex-col items-center justify-center xxl:h-[80dvh] mt-4'>
      <div className='flex flex-col p-8 border-solid border-2 border-gray-200 rounded-md shadow-md dark:border-gray-700 dark:bg-gray-800 xxl:w-1/4 sm:w-1/2 lg:w-1/3'>
        <p className="text-2xl title-font whitespace-nowrap dark:text-white mb-4">Formula 10</p>
        <h2 className='text-3xl whitespace-nowrap dark:text-white mb-8'>{t('registration.login')}</h2>
        <div className='flex flex-col space-y-4'>
          {error && <Error errorMessage={error} />}
          
          <FormControl sx={{ '& .MuiTextField-root': { marginBottom: '.5rem'}}}>
            <TextField id='name' required placeholder={t('registration.name')} variant='outlined' label={t('registration.name')} size='small' className='sm:text-sm' value={name} onChange={(e) => setName(e.target.value)} autoComplete='off'
                        sx={lightInputStyle}/>          
            {nameError && <span className='text-red-500 text-sm mb-2'>{nameError}</span>} 
            <TextField id='username' required placeholder={t('registration.username')} variant='outlined' label={t('registration.username')} size='small' className='sm:text-sm' value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='off'
                       sx={lightInputStyle}/>
                      {!usernameAvailable && <span className='text-red-500 text-sm mb-2'>{t('registration.usernameAlreadyTaken')}</span>} 
            <TextField id='email' required type='email' placeholder={t('registration.email')} variant='outlined' label={t('registration.email')} size='small' className='sm:text-sm' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off'
                       sx={lightInputStyle}/>
                       { emailError && <span className='text-red-500 text-sm mb-2'>{emailError}</span>} 
            <TextField id='password' required type='password' placeholder={t('registration.password')} variant='outlined' label={t('registration.password')} size='small' className='text-2xl' value={password} onChange={(e) => setPassword(e.target.value)}
                       sx={lightInputStyle}/>
                       { passwordError && <span className='text-red-500 text-sm mb-2'>{passwordError}</span>} 
            <TextField id='confirmPassword' required type='password' placeholder={t('registration.passwordAgain')} variant='outlined' label={t('registration.passwordAgain')} size='small' className='text-2xl' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                       sx={lightInputStyle}/>
                       { confirmPasswordError && <span className='text-red-500 text-sm mb-2'>{confirmPasswordError}</span>}
            <Button onClick={register} className='dark:text-[--color-font]'
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
  )
}

export default Registration
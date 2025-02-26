import { Button, Checkbox, Divider, FormControl, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/Store';
import { loginUser } from '../../redux/slices/AuthSlice';
import Error from '../../components/Error/Error';
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { darkInputStyle, lightInputStyle } from '../../components/TextInput/InputStyle';

const Login = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const {theme} = useTheme();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ usernameOrEmail, password, rememberMe }));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/');
      } else {
        setErrorMessage('Login failed.');
      }
    } catch (error) {
      setErrorMessage('An error occurred.');
    }
  }

  const darkCheckBoxStyle = {
    '.css-1umw9bq-MuiSvgIcon-root': {color: 'var(--color-font)'},
  }

  const lightCheckBoxStyle = {
    '.css-1umw9bq-MuiSvgIcon-root': {color: 'var(--color-gray)'},
  }

  return (
    <div className='flex flex-col items-center justify-center xxl:h-[80dvh] my-4'>
      <div className='flex flex-col p-8 border-solid border-2 border-gray-200 rounded-md shadow-md dark:border-gray-700 dark:bg-gray-800 xxl:w-1/4 sm:w-1/2 lg:w-1/3'>
        <p className="text-2xl title-font whitespace-nowrap dark:text-white mb-4">Formula 10</p>
        <h2 className='text-3xl whitespace-nowrap dark:text-white mb-8'>{t('login.login')}</h2>
        <div className='flex flex-col space-y-4'>
          {errorMessage && <Error errorMessage={errorMessage} />}
          <FormControl sx={{ '& .MuiTextField-root': { marginBottom: '.5rem'}}}>
            <TextField id='username' placeholder={t('login.username')} variant='outlined' label={t('login.username')} size='small' className='sm:text-sm' value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} autoComplete='off'
                       sx={ theme === "dark" ? darkInputStyle : lightInputStyle}/>
            <PasswordInput password={password} setPassword={setPassword} label='password'/>
            <FormControlLabel label={t('login.remember')} control={<Checkbox onChange={() => setRememberMe(!rememberMe)}/>} value={rememberMe} sx={ theme === "dark" ? darkCheckBoxStyle : lightCheckBoxStyle}/>
            <Button onClick={login} className='dark:text-[--color-font]'
                    sx={{borderStyle: 'solid', borderColor: 'var(--color-blue)', borderWidth: '2px', color: 'var(--color-gray)'}}>
                      {t('login.login')}
            </Button>
          </FormControl>
          <Link to="/passwordChange" className='w-fit text-[--color-blue] before:bg-[--color-blue]'> {t('login.forgotPassword')} </Link>
          <Divider> {t('login.or')} </Divider>
          <Button disabled startIcon={<FcGoogle />} className='dark:text-[--color-font]'
                  sx={{borderStyle: 'solid', borderColor: 'var(--color-blue)', borderWidth: '2px', color: 'var(--color-blue)'}}>{t('login.google')}</Button>
          <span className='text-center'> {t('login.dontHaveAccount')} <Link to="/Register" className='text-[--color-blue] before:bg-[--color-blue]'>{t('login.register')}</Link> </span>
        </div>
      </div>
    </div>
  )
}

export default Login
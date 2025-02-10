import { Button, Checkbox, Divider, FormControl, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { loginUser } from '../../redux/slices/AuthSlice';

const Login = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);
  const auth = useSelector((state: RootState) => state.auth);

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ usernameOrEmail, password, rememberMe }));
  }

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
        <h2 className='text-3xl whitespace-nowrap dark:text-white mb-8'>{t('login.login')}</h2>
        <div className='flex flex-col space-y-4'>
          <FormControl sx={{ '& .MuiTextField-root': { marginBottom: '.5rem'}}}>
            <TextField id='username' placeholder={t('login.username')} variant='outlined' label={t('login.username')} size='small' className='sm:text-sm' value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} autoComplete='off'
                       sx={lightInputStyle}/>
            <TextField id='password' type='password' placeholder={t('login.password')} variant='outlined' label={t('login.password')} size='small' className='text-2xl' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off'
                       sx={lightInputStyle}/>
            <FormControlLabel label={t('login.remember')} control={<Checkbox defaultChecked/>} value={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
            <Button onClick={login} className='dark:text-[--color-font]'
                    sx={{borderStyle: 'solid', borderColor: 'var(--color-blue)', borderWidth: '2px', color: 'var(--color-gray)'}}>
                      {t('login.login')}
            </Button>
          </FormControl>
          <Link to="/ForgotPassword" className='w-fit text-[--color-blue] before:bg-[--color-blue]'> {t('login.forgotPassword')} </Link>
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
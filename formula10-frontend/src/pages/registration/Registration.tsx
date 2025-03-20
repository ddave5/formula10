import { Button, Checkbox, Divider, FormControl, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import {debounce} from 'lodash';
import { checkUsernameAvailability, registerUser } from '../../services/user.service';
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';
import SuccessPanel from '../../components/SuccessPanel/SuccessPanel';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import TextInput from '../../components/TextInput/TextInput';
import { CharacterValidator, EmailValidator, PasswordValidator } from '../../utils/Validator';

const Registration = () => {
  const { t } = useTranslation();

  const [registrationDone, setRegistrationDone] = useState(false);

  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [usernameLengthError, setUsernameLengthError] = useState(false);
  const [usernameEmptyError, setUsernameEmptyError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [invalidCharacterError, setInvalidCharacterError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const { theme } = useTheme();

  const checkUsername = debounce(async (username: string) => {
    if (username.trim()) {
      const isAvailable = await checkUsernameAvailability(username);
      setUsernameAvailable(isAvailable);
    } else {
      setUsernameAvailable(true);
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
          console.log('Email is already taken!');
        });
      } catch (err) {
        console.log('Email is already taken!');
      }
    }
  };

  const validation = () => {
    let isValid = true;

    if (username.length === 0) {
      isValid = false;
      setUsernameEmptyError(true);
    } else {
      setUsernameEmptyError(false);
    }

    if (username.length > 50) {
      isValid = false;
      setUsernameLengthError(true);
    } else {
      setUsernameLengthError(false);
    }

    if (!EmailValidator(email)) {
      isValid = false;
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!CharacterValidator(password)) {
          isValid = false;
          setInvalidCharacterError(true);
        } else {
          setInvalidCharacterError(false);
          if (!PasswordValidator(password)) {
            isValid = false;
            setPasswordError(true);
          } else {
            setPasswordError(false);
          }
        }
  
    if (password !== confirmPassword || confirmPassword === "") {
      isValid = false;
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }

    if (!usernameAvailable) {
      isValid = false;
    }
    
    return isValid; 
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
              
              <FormControl sx={{ '& .MuiTextField-root': { marginBottom: '.5rem'}}}>
                <TextInput props={{id: 'username', isRequired: true, type: 'text', i18n: 'registration.username', errori18n: 'registration.usernameAlreadyTaken', variant: 'outlined', value: username, setValue: setUsername, error: !usernameAvailable}}/>
                          {usernameLengthError && <span className='text-red-500 text-sm mb-2'>Túl hosszú</span>}
                          {usernameEmptyError && <span className='text-red-500 text-sm mb-2'>Adj meg valamit!</span>}
                <TextInput props={{id: 'email', isRequired: true,  type: 'text', i18n: 'registration.email', errori18n: 'registration.invalidEmail', variant: 'outlined', value: email, setValue: setEmail, error: emailError}}/>
                <PasswordInput password={password} setPassword={setPassword} label='password'/>
                          { invalidCharacterError && <span className='text-red-500 text-sm mb-2'>{t('registration.invalidCharacter')}</span>} 
                          { passwordError && <span className='text-red-500 text-sm mb-2'>{t('registration.invalidPassword')}</span>} 
                <PasswordInput password={confirmPassword} setPassword={setConfirmPassword}  label='passwordAgain'/>
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
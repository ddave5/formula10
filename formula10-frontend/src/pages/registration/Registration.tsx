import { Button, Checkbox, Divider, FormControl, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { checkEmailAvailability, checkUsernameAvailability, registerUser } from '../../services/user.service';
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
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true); 
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const [showErrors, setShowErrors] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    setUsernameAvailable(true);
  }, [username]);

  useEffect(() => {
    setEmailAvailable(true);
  }, [email]);

  const checkUsername = async (username: string) => {
    if (username.trim()) {
      const isAvailable = await checkUsernameAvailability(username);
      setUsernameAvailable(isAvailable);
      return isAvailable;
    } else {
      setUsernameAvailable(true);
      return true;
    }
  };

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

  const validateForm = async () => {
    const usernameValid = await checkUsername(username);
    const emailValid = await checkEmail(email);
    
    // Ellenőrizd az összes mező validitását
    const isValid = (
      usernameValid && 
      emailValid && 
      !(username.length > 50 || username.length < 5) &&
      email.length <= 100 && email.length > 0 && EmailValidator(email) &&
      CharacterValidator(password) && PasswordValidator(password) &&
      !(password !== confirmPassword || confirmPassword === "") && 
      acceptTerms
    );
    return isValid;
  };

  const register = async () => {

    setShowErrors(true);

    const isValid = await validateForm();
    
    if (isValid) {
      try {
        await registerUser({
          username: username,
          email: email,
          password: password
        }).then((response) => {
          const data = response.success;
          if (data) {
            setRegistrationDone(true);
          }
        }).catch( (err) => {
          throw err;
        });
      } catch (err) {
        throw err;
      }
    }
  };

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
                <TextInput props={
                  {
                    id: 'username',
                    isRequired: true,
                    type: 'text', 
                    i18n: 'registration.username', 
                    variant: 'outlined', 
                    value: username, setValue: setUsername,
                    validation: [
                      {error: username.length === 0, errori18n: 'registration.usernameEmpty'}, 
                      {error: (username.length > 50 || username.length < 5), errori18n: 'registration.usernameLength'},
                      {error: !usernameAvailable, errori18n: 'registration.usernameAlreadyTaken'}
                    ],
                    isValid: setIsUsernameValid,
                    showError: showErrors
                  }}/>
                <TextInput props={
                  {
                    id: 'email',
                    isRequired: true,  
                    type: 'text', 
                    i18n: 'registration.email', 
                    variant: 'outlined', 
                    value: email, setValue: setEmail,
                    validation: [
                      {error: email.length === 0, errori18n: 'registration.emailEmpty'}, 
                      {error: email.length > 100 , errori18n: 'registration.emailLength'},
                      {error: !EmailValidator(email), errori18n: 'registration.invalidEmail'},
                      {error: !emailAvailable, errori18n: 'registration.emailAlreadyTaken'}
                    ],
                    isValid: setIsEmailValid,
                    showError: showErrors
                  }}
                />
                <PasswordInput props={{
                    password: password,
                    setPassword: setPassword,
                    label:'password',
                    validation: [
                      {error: !CharacterValidator(password), errori18n: 'registration.invalidCharacter'},
                      {error: !PasswordValidator(password), errori18n: 'registration.invalidPassword'}
                    ],
                    isValid: setIsPasswordValid,
                    showError: showErrors
                  }}
                />
                <PasswordInput props={{
                    password: confirmPassword,
                    setPassword: setConfirmPassword, 
                    label: 'passwordAgain',
                    validation: [
                      {error: (password !== confirmPassword || confirmPassword === ""), errori18n: 'registration.passwordsDontMatch'}
                    ],
                    isValid: setIsConfirmPasswordValid,
                    showError: showErrors
                  }}
                />       
                <div className='my-4'>
                  <FormControlLabel 
                    label={termsAndConditions()}
                    control={<Checkbox onChange={() => setAcceptTerms(!acceptTerms)}/>} 
                    value={acceptTerms} sx={ theme === "dark" ? darkCheckBoxStyle : lightCheckBoxStyle}/>
                </div>

                <Button onClick={register} className='dark:text-[--color-font]' disabled={!acceptTerms || ((!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) && showErrors) }
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
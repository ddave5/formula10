import React, { useState } from 'react'
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel'
import { Button, FormControl } from '@mui/material'
import PasswordInput from '../../../components/passwordInput/PasswordInput'
import { useTranslation } from 'react-i18next'
import { changePassword } from '../../../services/user.service'
import { CharacterValidator, EmailValidator, PasswordValidator } from '../../../utils/Validator'
import TextInput from '../../../components/TextInput/TextInput'

const PasswordChange = () => {

  const { t } = useTranslation();
  
  const [changeDone, setChangeDone] = useState(false); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);


  const changePwd = () => {
    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      try {
        changePassword(email, password).then((response) => {
          const data = response;
          if (data) {
            setChangeDone(true);
          }
        }).catch( (err) => {
          console.log(err)
        });
      } catch (err) {
        console.log(err);
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
              <FormControl sx={{ '& .MuiTextField-root': { marginBottom: '.5rem'}}}>
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
                        {error: !EmailValidator(email), errori18n: 'registration.invalidEmail'}
                      ],
                      isValid: setIsEmailValid
                    }}
                />
                <PasswordInput props={{
                    password: password, 
                    setPassword: setPassword, 
                    label: 'newPassword',
                    validation: [
                      {error: !CharacterValidator(password), errori18n: 'passwordChange.invalidCharacter'},
                      {error: !PasswordValidator(password), errori18n: 'passwordChange.invalidPassword'}
                    ],
                    isValid: setIsPasswordValid
                  }}
                />
                <PasswordInput props={{
                    password: confirmPassword,
                    setPassword: setConfirmPassword, 
                    label: 'newPasswordAgain',
                    validation: [
                      {error: (password !== confirmPassword || confirmPassword === ""), errori18n: 'registration.passwordsDontMatch'}
                    ],
                    isValid: setIsConfirmPasswordValid
                  }}
                /> 
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
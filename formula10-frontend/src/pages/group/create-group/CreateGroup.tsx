import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../layout/navbar/Theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, TextField } from '@mui/material';
import { AppDispatch, RootState } from '../../../redux/Store';
import { checkGroupName, createGroup } from '../../../services/groupService';
import Error from '../../../components/Error/Error';
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel';
import { useOutletContext } from 'react-router-dom';
import { fetchGroupList } from '../../../redux/slices/GroupSlice';

const CreateGroup = () => {

  const { t } = useTranslation();

  const [createDone, setCreateDone] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameTaken, setNameTaken] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch<AppDispatch>();

  const { theme } = useTheme();

  useEffect(() => {
    setNameError(false);
  }, [name]);

  useEffect(() => {
    setConfirmPasswordError(false);
  }, [confirmPassword]);


  const create = async () => {

    if (await validation()) {
      try {
        await createGroup(name, password, (user ? user.id : 0));
        if (user) {
          dispatch(fetchGroupList(user.id));
        }
        setCreateDone(true);
      } catch (err) {
        setError('Something Went Wrong!');
      }
    }
  };

  const validation = async () => {
    let isValid = true;

    if (name === "") {
      isValid = false;
      setNameError(true);
    } else {
      await checkName(name);
      if (nameTaken) {
        isValid = false;
      }
    }
  
    if (password !== confirmPassword ) {
      isValid = false;
      setConfirmPasswordError(true);
    } 
    
    return isValid; 
  }

  const checkName = async (name: string) => {
    if (name) {
      try {
        const response = await checkGroupName(name);
        setNameTaken(response); 
        return response;
      } catch (err) {
        console.error(err);
        return true; 
      }
    }
    return true; // Ha nincs név, azt foglaltnak tekintjük
  };

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
    <>
      {createDone ? (
          <SuccessPanel title='createGroup.successTitle' details='createGroup.successDetails' url={'/groups'} />
      ) : (
        <div className='flex flex-col items-center my-8'>
          <div className='flex flex-col p-8 xl:w-2/3 sm:w-1/2 lg:w-1/3'>
            <p className="text-4xl title-font whitespace-nowrap dark:text-white mb-16 text-center">{t('createGroup.createGroup')}</p>
            <div className='flex flex-col space-y-4'>
              {error && <Error errorMessage={error} />}
              <FormControl sx={{ '& .MuiTextField-root': { marginBottom: '.5rem'}}}>
                <TextField id='name' required placeholder={t('createGroup.name')} variant='outlined' label={t('createGroup.name')} size='small' className='sm:text-sm' value={name} onChange={(e) => setName(e.target.value)} autoComplete='off'
                            sx={ theme === "dark" ? darkInputStyle : lightInputStyle }/>          
                {nameError && <span className='text-red-500 text-sm mb-2'>{t('createGroup.nameIsEmpty')}</span>} 
                {nameTaken && <span className='text-red-500 text-sm mb-2'>{t('createGroup.nameTaken')}</span>} 
                <TextField id='password' type='password' placeholder={t('createGroup.password')} variant='outlined' label={t('createGroup.password')} size='small' className='text-2xl' value={password} onChange={(e) => setPassword(e.target.value)}
                          sx={ theme === "dark" ? darkInputStyle : lightInputStyle}/>
                <TextField id='confirmPassword' type='password' placeholder={t('createGroup.confirmPassword')} variant='outlined' label={t('createGroup.confirmPassword')} size='small' className='text-2xl' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                          sx={ theme === "dark" ? darkInputStyle : lightInputStyle}/>
                          { confirmPasswordError && <span className='text-red-500 text-sm mb-2'>{t('createGroup.passwordsDontMatch')}</span>}          

                <Button onClick={create} className='dark:text-[--color-font]'
                        sx={{borderStyle: 'solid', borderColor: 'var(--color-blue)', borderWidth: '2px', color: 'var(--color-gray)'}}>
                          {t('createGroup.create')}
                </Button>
              </FormControl>
            </div>
          </div>
        </div>
      )}
    </>
    
  )
}

export default CreateGroup
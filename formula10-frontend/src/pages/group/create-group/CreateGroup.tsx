import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../layout/navbar/Theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, TextField } from '@mui/material';
import { AppDispatch, RootState } from '../../../redux/Store';
import { checkGroupName, createGroup } from '../../../services/group.service';
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel';
import { addGroup } from '../../../redux/slices/GroupSlice';
import PasswordInput from '../../../components/passwordInput/PasswordInput';
import { darkInputStyle, lightInputStyle } from '../../../components/TextInput/InputStyle';
import eventBus from '../../../services/eventBus';
import { CharacterValidator } from '../../../utils/Validator';

const CreateGroup = () => {

  const { t } = useTranslation();

  const [createDone, setCreateDone] = useState(false);

  const [name, setName] = useState('');
  const [groupPassword, setGroupPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [nameTaken, setNameTaken] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch<AppDispatch>();

  const { theme } = useTheme();

  useEffect(() => {
    setNameError(false);
  }, [name]);

  const create = async () => {
    if (!isPasswordValid) return;
    if (await validation()) {
      try {
        const newGroup = await createGroup(name, groupPassword, (user ? user.id : 0));
        if (newGroup && user) {
          eventBus.emit('success', { message: 'Group created successfully!' });
          dispatch(addGroup(newGroup));
          setCreateDone(true);
        }
      } catch (err) {
        eventBus.emit('error', { message: 'Failed to create group.', isDialog: false });
        console.error('Something Went Wrong!');
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

    
    return isValid; 
  }

  const checkName = async (name: string) => {
    if (name) {
      try {
        const response = await checkGroupName(name);
        setNameTaken(response); 
        return response;
      } catch (err) {
        eventBus.emit('error', { message: 'Failed to check group name.', isDialog: false });
        console.error(err);
        return true; 
      }
    }
    return true;
  };

  return (
    <>
      {createDone ? (
          <SuccessPanel title='createGroup.successTitle' details='createGroup.successDetails' url={'/groups'} />
      ) : (
        <div className='flex flex-col items-center my-8'>
          <div className='flex flex-col p-8 xl:w-2/3 sm:w-1/2 lg:w-1/3'>
            <p className="text-4xl title-font whitespace-nowrap dark:text-white mb-16 text-center">{t('createGroup.createGroup')}</p>
            <div className='flex flex-col space-y-4'>
              <FormControl sx={{ '& .MuiTextField-root': { marginBottom: '.5rem'}}}>
                <TextField id='name' required placeholder={t('createGroup.name')} variant='outlined' label={t('createGroup.name')} size='small' className='sm:text-sm' value={name} onChange={(e) => setName(e.target.value)} autoComplete='off'
                            sx={ theme === "dark" ? darkInputStyle : lightInputStyle }/>          
                {nameError && <span className='text-red-500 text-sm mb-2'>{t('createGroup.nameIsEmpty')}</span>} 
                {nameTaken && <span className='text-red-500 text-sm mb-2'>{t('createGroup.nameTaken')}</span>} 
                <PasswordInput props={{
                    password: groupPassword,
                    setPassword: setGroupPassword,
                    label:'passwordOptional',
                    validation: [
                      {error: !CharacterValidator(groupPassword), errori18n: 'createGroup.invalidCharacter'},
                    ],
                    isValid: setIsPasswordValid
                  }}
                />    
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
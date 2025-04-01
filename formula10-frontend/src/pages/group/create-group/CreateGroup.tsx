import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl } from '@mui/material';
import { AppDispatch, RootState } from '../../../redux/Store';
import { checkGroupName, createGroup } from '../../../services/group.service';
import { addGroup } from '../../../redux/slices/GroupSlice';
import PasswordInput from '../../../components/passwordInput/PasswordInput';
import eventBus from '../../../services/eventBus';
import { CharacterValidator } from '../../../utils/Validator';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../../components/TextInput/TextInput';

const CreateGroup = () => {

  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [groupPassword, setGroupPassword] = useState('');

  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  
  const [nameAvailable, setNameAvailable] = useState(true);
  const [showErrors, setShowErrors] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const checkName = async (name: string) => {
    if (name.trim()) {
      const isAvailable = await checkGroupName(name);
      setNameAvailable(isAvailable);
      return isAvailable;
    } else {
      setNameAvailable(true);
      return true;
    }
  };
  

  const validateForm = async () => {
    const nameValid = await checkName(name);
    const isValid = (
      nameValid && 
      !(name.length > 50 || name.length < 3) &&
      !(groupPassword.length > 0 && !CharacterValidator(groupPassword))
    );
    return isValid;
  };

  const create = async () => {

    setShowErrors(true);
    const isValid = await validateForm();

    if (isValid) {
      try {
        const newGroup = await createGroup(name, groupPassword, (user ? user.id : 0));
        if (newGroup && user) {
          eventBus.emit('success', { message: 'Group created successfully!' });
          dispatch(addGroup(newGroup));
          navigate('/groups');
        }
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <>
      <div className='flex flex-col items-center my-8'>
        <div className='flex flex-col p-8 xl:w-2/3 sm:w-1/2 lg:w-1/3'>
          <p className="text-4xl title-font whitespace-nowrap dark:text-white mb-16 text-center">{t('createGroup.createGroup')}</p>
          <div className='flex flex-col space-y-4'>
            <FormControl sx={{ '& .MuiTextField-root': { marginBottom: '.5rem'}}}> 
              <TextInput props={
                  {
                    id: 'name',
                    isRequired: true,
                    type: 'text', 
                    i18n: 'createGroup.name', 
                    variant: 'outlined', 
                    value: name, setValue: setName,
                    validation: [
                      {error: name.length === 0, errori18n: 'createGroup.nameIsEmpty'}, 
                      {error: (name.length > 50 || name.length < 3), errori18n: 'createGroup.usernameLength'},
                      {error: !nameAvailable, errori18n: 'createGroup.nameTaken'}
                    ],
                    isValid: setIsNameValid,
                    showError: showErrors
                  }}/>
              <PasswordInput props={{
                  password: groupPassword,
                  setPassword: setGroupPassword,
                  label:'passwordOptional',
                  validation: [
                    {error: groupPassword.length > 0 && !CharacterValidator(groupPassword), errori18n: 'createGroup.invalidCharacter'},
                  ],
                  isValid: setIsPasswordValid,
                  showError: showErrors
                }}
              />    
              <Button onClick={create} className='dark:text-[--color-font]' disabled={(!isNameValid || !isPasswordValid) && showErrors }
                      sx={{borderStyle: 'solid', borderColor: 'var(--color-blue)', borderWidth: '2px', color: 'var(--color-gray)'}}>
                        {t('createGroup.create')}
              </Button>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateGroup
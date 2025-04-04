import { useTranslation } from 'react-i18next';
import RenameComponent from './RenameComponent/RenameComponent';
import { useState } from 'react';
import { Button } from '@mui/material';
import ChangePasswordComponent from './ChangePasswordComponent/ChangePasswordComponent';
import ModifyMembersComponent from './ModifyMembersComponent/ModifyMembersComponent';

const ManageGroup = () => {

  const { t } = useTranslation();
  const [renameOpen, setRenameOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  return (
    <div className='flex flex-col gap-4 p-4 align-center'>
      <h1 className='text-2xl font-bold text-center'>{t('manageGroup.manageGroup')}</h1>
      <div className='flex justify-center'>
        <div className='grid grid-cols-3 gap-4 w-4/5 md:w-2/3 xl:w-1/2 justify-center'>
          <Button variant='contained' onClick={() => setRenameOpen(true)}>
            {t('manageGroup.renameGroup')}
          </Button>
          <Button variant='contained' onClick={() => setChangePasswordOpen(true)}>
            {t('manageGroup.changePassword')}
          </Button>
          <Button variant='contained' color='error'>
            {t('manageGroup.calculatePoints')}
          </Button>
        </div>
      </div>

      <ModifyMembersComponent />
      
      <RenameComponent open={renameOpen} onClose={() => setRenameOpen(false)} />
      <ChangePasswordComponent open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} />
    </div>
  )
}

export default ManageGroup
import { useTranslation } from 'react-i18next';
import RenameComponent from './RenameComponent/RenameComponent';
import { useState } from 'react';
import { Button } from '@mui/material';
import ChangePasswordComponent from './ChangePasswordComponent/ChangePasswordComponent';
import ModifyMembersComponent from './ModifyMembersComponent/ModifyMembersComponent';
import { useGroup } from '../../../../context/GroupContext';
import { calculatePointsForGroup } from '../../../../services/score.service';
import eventBus from '../../../../services/eventBus';
import { useWindowWidth } from '@react-hook/window-size';

const ManageGroup = () => {

  const { group } = useGroup();

  const { t } = useTranslation();
  const [renameOpen, setRenameOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const width = useWindowWidth();

  const calculatePoints = async () => {
    try {
      if (group?.id === 0 ) {
        throw new Error('Invalid group ID');
      }

      const response = await calculatePointsForGroup(group?.id || 0);
      if (response) {
        eventBus.emit('success', {message: t('manageGroup.calculateSuccess'), isDialog: false });
      }
    } catch (error) {
      console.error('Failed to leave group:', error);
    }
  }

  return (
    <div className='flex flex-col gap-4 p-4 align-center'>
      <h1 className='text-2xl font-bold text-center'>{t('manageGroup.manageGroup')}</h1>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-4/5 md:w-2/3 xl:w-1/2 justify-center'>
          <Button variant='contained' onClick={() => setRenameOpen(true)}>
            {t('manageGroup.renameGroup')}
          </Button>
          <Button variant='contained' onClick={() => setChangePasswordOpen(true)}>
            {t('manageGroup.changePassword')}
          </Button>
          <Button variant='contained' color='success' onClick={calculatePoints}>
            {t('manageGroup.calculatePoints')}
          </Button>
        </div>
      </div>
      {width > 768 && (
        <ModifyMembersComponent groupId={group?.id || 0}/>
      )}
      
      
      <RenameComponent open={renameOpen} onClose={() => setRenameOpen(false)} />
      <ChangePasswordComponent open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} />
    </div>
  )
}

export default ManageGroup
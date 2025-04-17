import React, { useState } from 'react'
import { changePasswordForGroup } from '../../../../../services/group.service';
import { t } from 'i18next';
import eventBus from '../../../../../services/eventBus';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PasswordInput from '../../../../../components/passwordInput/PasswordInput';
import { useGroup } from '../../../../../context/GroupContext';

const ChangePasswordComponent = ({ open, onClose }: { open: boolean; onClose: () => void }) => {

  const { group } = useGroup();

  const [newPassword, setNewPassword] = useState('');


  const changePassword = async () => {
    const newGroup = await changePasswordForGroup(group?.id || 0, newPassword);
    if (newGroup) {
        eventBus.emit('success', { message: t('manageGroup.successPasswordChange') });
        onClose();
    }
  };

  return (
      <Dialog open={open} onClose={onClose} sx={{'.css-10d30g3-MuiPaper-root-MuiDialog-paper': {width: '100%'}}}>
          <DialogTitle>{t('manageGroup.changePassword')}</DialogTitle>
          <DialogContent sx={{minHeight: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <PasswordInput props = 
                  {{
                      label: 'newPassword',
                      password: newPassword,
                      setPassword: setNewPassword,
                      sx:{width: '100%'}
                  }}
              />
          </DialogContent>
          <DialogActions>
              <Button onClick={onClose} color='primary'>
                  Cancel
              </Button>
              <Button onClick={changePassword} color='primary' variant='contained'>
                  Save
              </Button>
          </DialogActions>
      </Dialog>
  )
}

export default ChangePasswordComponent
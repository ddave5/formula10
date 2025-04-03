import { useTranslation } from 'react-i18next';
import RenameComponent from './RenameComponent/RenameComponent';
import { useState } from 'react';
import { Button } from '@mui/material';

const ManageGroup = () => {

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col gap-4 p-4 align-center'>
      <h1 className='text-2xl font-bold text-center'>{t('manageGroup.manageGroup')}</h1>
      <div className='flex justify-center'>
        <div className='grid grid-cols-2 gap-4 w-4/5 md:w-2/3 xl:w-1/2 justify-center'>
          <Button variant='contained' onClick={() => setOpen(true)}>
            {t('manageGroup.renameGroup')}
          </Button>

        </div>
      </div>
      
      <RenameComponent open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default ManageGroup
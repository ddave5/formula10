import { Button } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { TbFaceId } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const SuccessRegistration = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full h-[80dvh] flex justify-center items-center">
      <div className="bg-white rounded-md shadow-md md:w-96 w-72 text-center dark:bg-gray-800">
        <div className='bg-[var(--color-green)] w-full pb-4 pt-4 rounded-t-md'>
          <TbFaceId className='text-[120px] text-[var(--color-font)] mb-2'/>
          <h2 className='text-[var(--color-font)] mb-4 text-xl dark:text-[var(--color-font)]'>{t('successRegistration.success')}</h2>
        </div>
        <p className='my-8 px-4'>{t('successRegistration.details')}</p>
        <Button onClick={() => navigate('/login')} sx={{
          color: 'var(--color-green)',
          border: '1px solid var(--color-green)',
          borderRadius: '12px',
          marginBottom: '1rem',
          '&:hover': {
            backgroundColor: 'var(--color-green)',
            color: 'white',
        }}}>{t('successRegistration.continue')}</Button>

      </div>
    </div>
  )
}

export default SuccessRegistration
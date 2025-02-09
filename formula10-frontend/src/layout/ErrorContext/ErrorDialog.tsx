import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { clearError, ErrorState} from '../../redux/slices/ErrorSlice';
import { TbFaceIdError } from "react-icons/tb";
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ErrorDialog = () => {

  const {t} = useTranslation();

  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootState) => (state.error as ErrorState).message);

  if (!errorMessage) return null; // Csak akkor jelenik meg, ha van hiba

  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md shadow-md md:w-96 w-72 text-center dark:bg-gray-800">
        <TbFaceIdError className='text-[120px] text-[var(--color-primary)] mb-4'/>
        <h2 className='text-[var(--color-primary)] mb-4 text-xl dark:text-[var(--color-font)]'>{t('error.error')}</h2>
        <p className='mb-4'>{errorMessage}</p>
        <Button onClick={() => dispatch(clearError())} sx={{
          color: 'var(--color-blue)',
          border: '1px solid var(--color-blue)',
          borderRadius: '12px',
          '&:hover': {
            backgroundColor: 'var(--color-blue)',
            color: 'white',
        }}}>{t('error.close')}</Button>

      </div>
    </div>
  );
};

export default ErrorDialog;
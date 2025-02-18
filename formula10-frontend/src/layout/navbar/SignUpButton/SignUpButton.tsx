import { Button } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SignUpButton = () => {
    let navigate = useNavigate();

    const { t } = useTranslation();
    return (
        <Button variant="text" onClick={() => navigate('/Register')} sx={{ color: 'var(--color-font)' }}>
            { t('navbar.signUp') } 
        </Button>
  )
}

export default SignUpButton
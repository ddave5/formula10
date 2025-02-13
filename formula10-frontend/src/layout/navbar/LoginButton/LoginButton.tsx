import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Theme/ThemeContext';


const Login = () => {

    let navigate = useNavigate();

    const { theme } = useTheme();

    const { t } = useTranslation();

    const lightMode = { color: 'var(--color-primary)', backgroundColor: 'var(--color-font)' };
    const darkMode = { color: 'var(--color-font)', backgroundColor: 'var(--color-gray-light)' };

    return (
        <Button variant="contained" onClick={() => navigate('/Login')} sx={theme === 'dark' ? darkMode : lightMode}>
            { t('navbar.login') } 
        </Button>
  )
}

export default Login
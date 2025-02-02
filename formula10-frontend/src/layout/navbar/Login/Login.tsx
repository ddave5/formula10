import { Button, ButtonProps, styled } from '@mui/material'
import { purple } from '@mui/material/colors';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { IoMdLogIn } from "react-icons/io";


const Login = () => {

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
      }));


    const { t } = useTranslation();
    return (
        <ColorButton variant="text" startIcon={<IoMdLogIn />}>
            { t('navbar.login') } 
        </ColorButton>
  )
}

export default Login
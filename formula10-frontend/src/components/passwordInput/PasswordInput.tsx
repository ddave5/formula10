import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { darkInputStyle, lightInputStyle } from '../TextInput/InputStyle';

const PasswordInput = ({password, setPassword, label} : {password: string, setPassword: Function, label:string}) => {

    const [showPassword, setShowPassword] = useState(false);
    const {theme} = useTheme();
    const { t } = useTranslation();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const passwordLightInputStyle = {
        ...lightInputStyle, 
        '.MuiButtonBase-root': {color: 'var(--color-blue)'}
    }

    const passwordDarkInputStyle = {
        ...darkInputStyle, 
        '.MuiButtonBase-root': {color: 'var(--color-font)'}
    }

    return (
        <TextField 
            id={label} 
            type={showPassword ? 'text' : 'password'} 
            placeholder={t(`passwordInput.${label}`)} 
            label={t(`passwordInput.${label}`)} 
            size='small' 
            className='text-2xl' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            autoComplete='off'
            sx={ theme === "dark" ? passwordDarkInputStyle : passwordLightInputStyle}
            slotProps={{
                "input": {
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                    >
                        {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                    </IconButton>
                    </InputAdornment>
                )
                }
            }}
        />
    )
}

export default PasswordInput
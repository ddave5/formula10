import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, {useState } from 'react'
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { darkInputStyle, lightInputStyle } from '../TextInput/InputStyle';
import { PasswordInputInterface } from '../../interfaces/PasswordInputInterface';

const PasswordInput = (
    {props} : 
    {props: PasswordInputInterface}) => {

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
        '.MuiButtonBase-root': {color: 'var(--color-font)'},
        '.css-13meb6w-MuiInputBase-input-MuiOutlinedInput-input:focus': {color: 'var(--color-font)'},
        '.css-13meb6w-MuiInputBase-input-MuiOutlinedInput-input': {color: 'var(--color-font)'}
    }

    const mergedsx = {
        ...(theme === "dark" ? passwordDarkInputStyle : passwordLightInputStyle),
        ...props.sx
    }
    
    return (
        <>
            <TextField 
                id={props.label} key={props.label}
                type={showPassword ? 'text' : 'password'} 
                placeholder={t(`passwordInput.${props.label}`)} 
                label={t(`passwordInput.${props.label}`)} 
                size='small' 
                className='text-2xl' 
                value={props.password} 
                onChange={(e) => props.setPassword(e.target.value)} 
                autoComplete='off'
                sx={mergedsx}
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
            {props.showError && props.validation?.map((item, index) => {
                return (
                    item.error && <span className='text-red-500 text-sm mb-2' key={index}>{t(item.errori18n)}</span>
                )
            })}
        </>
    )
}

export default PasswordInput
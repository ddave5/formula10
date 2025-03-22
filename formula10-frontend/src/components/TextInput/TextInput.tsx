import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { TextInputInterface } from '../../interfaces/TextInputInterface'
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';
import { darkInputStyle, lightInputStyle } from './InputStyle';

const TextInput = ({props} : {props: TextInputInterface}) => {

  const { t } = useTranslation();
  const {theme} = useTheme();

  useEffect(() => {
    if (props.validation === undefined || props.validation === null) return;
    if (props.isValid === undefined || props.isValid === null) return;
    props.validation.filter((validator) => validator.error).length === 0 ? props.isValid(true) : props.isValid(false);
  }, [props, props.validation]);

  return (
    <>
      <TextField id={props.id} required={props.isRequired} placeholder={t(props.i18n)} variant={props.variant} label={t(props.i18n)} size='small' className='sm:text-sm' value={props.value} onChange={(e) => props.setValue(e.target.value)} autoComplete='off'
                              sx={ theme === "dark" ? darkInputStyle : lightInputStyle}/>
      {props.showError && props.validation?.map((validator) => validator.error && <span className='text-red-500 text-sm mb-2'>{t(validator.errori18n)}</span>)}
    </>
  )
}

export default TextInput
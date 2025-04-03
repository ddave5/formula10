import { TextField } from '@mui/material'
import { TextInputInterface } from '../../interfaces/TextInputInterface'
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';
import { darkInputStyle, lightInputStyle } from './InputStyle';

const TextInput = ({props} : {props: TextInputInterface}) => {

  const { t } = useTranslation();
  const {theme} = useTheme();

  const mergedsx = {
    ...(theme === "dark" ? darkInputStyle : lightInputStyle),
    ...props.sx
}

  return (
    <>
      <TextField 
        id={props.id} key={props.id}
        required={props.isRequired} 
        placeholder={t(props.i18n)} 
        variant={props.variant} 
        label={t(props.i18n)} 
        size='small' disabled={props.disabled}
        className='sm:text-sm' 
        value={props.value} 
        onChange={(e) => props.setValue(e.target.value)} 
        autoComplete='off'
        sx={mergedsx}/>
      {props.showError && props.validation?.map((validator, index) => validator.error && <span className='text-red-500 text-sm mb-2' key={index}>{t(validator.errori18n)}</span>)}
    </>
  )
}

export default TextInput
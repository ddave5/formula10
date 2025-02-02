import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {

    const { t, i18n } = useTranslation();

    const language = i18n.language;
        let languages = [
            {'hu': t('navbar.hu')},
            {'en': t('navbar.en')}
        ]; 
    
        const changeLanguage = (event: SelectChangeEvent) => {
            i18n.changeLanguage(event.target.value);
            localStorage.setItem('language', event.target.value);
        }
    return (
        <FormControl size="small">
            <Select
                id="language-selector"
                value={language}
                onChange={changeLanguage}
                displayEmpty
                className='dark:bg-gray-800 bg-gray-100 dark:text-white text-black'
            >
                {languages.map((lang) => (
                    <MenuItem value={Object.keys(lang)[0]} key={Object.keys(lang)[0]}>{Object.values(lang)[0]}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default LanguageSelector
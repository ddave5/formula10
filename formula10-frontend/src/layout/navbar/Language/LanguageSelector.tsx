import { Divider} from '@mui/material';
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {

    const { i18n } = useTranslation();
    const changeLanguage = (value: string) => {
        i18n.changeLanguage(value);
        localStorage.setItem('language', value);
    }
    return (
        <div className='flex items-center'>
            <ReactCountryFlag countryCode="HU" svg onClick={() => changeLanguage('hu')}/>
            <Divider flexItem orientation="vertical" sx={{ mx: '.5rem' , backgroundColor: 'white',}} />
            <ReactCountryFlag countryCode="GB" svg  onClick={() => changeLanguage('en')}/>
        </div>
    )
}

export default LanguageSelector
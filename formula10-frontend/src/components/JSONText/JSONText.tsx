import { Divider } from '@mui/material';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../layout/navbar/Theme/ThemeContext';
import Loading from '../Loading/Loading';

const JSONText = ({documentName}: {documentName: string}) => {

    const { i18n } = useTranslation();
    const [rulesContent, setRulesContent] = useState<RulesContent | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { theme } = useTheme();
  
    useEffect(() => {
      const fetchRulesContent = async () => {
        const response = await fetch(`/content/${documentName}/${documentName}_${i18n.language}.json`); // Betöltjük a megfelelő JSON fájlt
        const data: RulesContent = await response.json();
        setRulesContent(data);
        setLoading(false);
      };
  
      fetchRulesContent();
    }, [i18n.language, documentName]); // Nyelv változáskor újratöltjük a tartalmat
  
    if (loading) {
      return <Loading isLoading={loading} />;
    }

    const lightMode = {'&.MuiDivider-root': {marginBottom: '2rem', width: '80%', margin: '2rem auto'}}
    const darkMode = {'&.MuiDivider-root': {marginBottom: '2rem', width: '80%', margin: '2rem auto', backgroundColor: 'var(--color-font)'}}

    return (
        <div className='p-6 flex justify-center'>
            {rulesContent && (
                <div className='w-2/3'>
                    <h1 className='text-4xl font-bold mb-8 text-center'>{rulesContent.title}</h1>
                    <p className='text-center text-xl'>{rulesContent.preContext}</p>
                    <Divider sx={theme === "dark" ? darkMode : lightMode}/> 
                    <div className='mb-4'>
                        {rulesContent.listElements?.map((listElement, index) => { return(
                            <div key={listElement.title} className='mb-8'>
                                <h2 className='text-xl font-bold mb-4'>{index + 1}. {listElement.title}</h2>
                                <p className='text-justify'>{listElement.context}</p>
                            </div>
                        )})}
                    </div>
                </div>
            )}
        </div>
    )
}

export default JSONText
import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const JSONText = ({documentName}: {documentName: string}) => {

    const { i18n } = useTranslation();
    const [rulesContent, setRulesContent] = useState<RulesContent | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchRulesContent = async () => {
        const response = await fetch(`/content/${documentName}/${documentName}_${i18n.language}.json`); // Betöltjük a megfelelő JSON fájlt
        const data: RulesContent = await response.json();
        setRulesContent(data);
        setLoading(false);
      };
  
      fetchRulesContent();
    }, [i18n.language]); // Nyelv változáskor újratöltjük a tartalmat
  
    if (loading) {
      return <p>Loading...</p>;
    }

    return (
        <div className='p-6 flex justify-center'>
            {rulesContent && (
                <div className='w-2/3'>
                    <h1 className='text-4xl font-bold mb-8 text-center'>{rulesContent.title}</h1>
                    <p className='text-center text-xl'>{rulesContent.preContext}</p>
                    <Divider sx={{'&.MuiDivider-root': {marginBottom: '2rem', width: '80%', margin: '2rem auto'}}}/> 
                    <div className='mb-4'>
                        {rulesContent.listElements?.map((listElement, index) => { return(
                            <div key={index} className='mb-8'>
                                <h2 className='text-xl font-bold mb-4'>{index + 1}. {listElement.title}</h2>
                                <p className='text-justify'>{listElement.context}</p>
                                {listElement.list && (
                                    <ol>
                                         {listElement.list?.map((listPoint, index) => { return(
                                            <li key={index} className='text-justify'>{listPoint}</li>
                                        )})}
                                    </ol>
                                )}
                            </div>
                        )})}
                    </div>
                </div>
            )}
        </div>
    )
}

export default JSONText
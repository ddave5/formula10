import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

interface RulesContent {
  title: string;
  content: string;
}

const Rules = () => {
  const { i18n } = useTranslation();
  const [rulesContent, setRulesContent] = useState<RulesContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRulesContent = async () => {
      const language = i18n.language === 'hu' ? 'hu' : 'en'; // Ellenőrizzük a nyelvet
      const response = await fetch(`/content/rules_${language}.json`); // Betöltjük a megfelelő JSON fájlt
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
    <div className='p-6'>
      {rulesContent && (
        <>
          <h1 className='text-2xl font-bold mb-4'>{rulesContent.title}</h1>
          <p className='text-lg'>{rulesContent.content}</p>
        </>
      )}
    </div>
  );
}

export default Rules
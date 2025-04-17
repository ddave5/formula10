import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { GoGoal } from "react-icons/go";
import { PiNumberTwoFill } from "react-icons/pi";
import { PiNumberFiveFill } from "react-icons/pi";
import { MdRule } from "react-icons/md";
import { TbGavel } from "react-icons/tb";
import { IoIosTrophy } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import Loading from '../../components/Loading/Loading';


const Rules = () => {
  const { i18n } = useTranslation();
  const [rulesContent, setRulesContent] = useState<RulesContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const iconList = [ <GoGoal key={0}/>, <><PiNumberTwoFill key={1}/><PiNumberFiveFill key={2}/></>, <MdRule key={3}/>, <TbGavel key={4}/>, <IoIosTrophy key={5}/>, <FaList key={6}/>, <IoMdContact key={7}/>];

  useEffect(() => {
    const fetchRulesContent = async () => {
      const language = i18n.language === 'hu' ? 'hu' : 'en'; // Ellenőrizzük a nyelvet
      const response = await fetch(`/content/rules/rules_${language}.json`); // Betöltjük a megfelelő JSON fájlt
      const data: RulesContent = await response.json();
      setRulesContent(data);
      setLoading(false);
    };

    fetchRulesContent();
  }, [i18n.language]); // Nyelv változáskor újratöltjük a tartalmat

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  return (
    <div className='p-6 flex justify-center'>
      {rulesContent && (
        <div className='lg:w-2/3 w-full'>
          <h1 className='text-2xl font-bold mb-8 text-center'>{rulesContent.title}</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
            {rulesContent.listElements.map((listElement, index) => { return(
              <div key={listElement.title} className='mb-4 border-2 border-gray-200 dark:border-gray-700 border-solid rounded-md p-4'>
                <div className='flex justify-center items-center mb-4 text-[120px] text-[--color-primary] dark:text-[--color-blue]'>{iconList[index]}</div>
                <h2 className='text-lg font-bold mb-6 text-center'>{listElement.title}</h2>
                <p className='text-justify'>{listElement.context}</p>
              </div>
            )})}
          </div>
        </div>
      )}
    </div>
  );
}

export default Rules
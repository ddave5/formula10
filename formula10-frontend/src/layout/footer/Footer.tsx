import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {

  const { t }  = useTranslation();

  //TODO Nézd meg kérlek a bottom részen maradást. Lehetőleg kerüld az absolute-ot.
  return (
    <footer className='flex items-center flex-col p-8 bg-[var(--color-primary)] text-[var(--color-font)] dark:bg-gray-700 mt-8  w-full' >
      <span className="self-center text-2xl title-font whitespace-nowrap dark:text-white mb-8">Formula 10</span>
      <div className='flex justify-between items-center flex-col lg:flex-row w-2/3 lg:w-full xl:w-3/4 xxl:w-2/3 mb-8'>
        <Link to="/contact" className='mb-2'> {t('footer.contact')} </Link>
        <Link to="/privacyPolicy" className='mb-2'> {t('footer.privacyPolicy')} </Link>
        <Link to="/termsOfUse" className='mb-2'> {t('footer.termsOfUse')} </Link>
        <Link to="/copyrightNotice" className='mb-2'> {t('footer.copyRightNotice')} </Link>
        <Link to="/legalNotice" className='mb-2'> {t('footer.legalNotice')} </Link>
        <Link to="/emailNotice" className='mb-2'> {t('footer.emailNotice')} </Link>
      </div>
      <div>
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}

export default Footer
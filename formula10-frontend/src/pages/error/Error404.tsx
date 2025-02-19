import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Error404 = () => {

  const {t} = useTranslation();

  return (
    <div className='w-full h-[80dvh] flex flex-col justify-center items-center'>
      <h1 className='text-[200px]'>404</h1>
      <p className='text-2xl mb-8'>{t('error.pageNotFound')}</p>
      <Link to="/" className='text-[var(--color-font-dark)]'>{t('error.backToHome')}</Link>
    </div>
  )
}

export default Error404
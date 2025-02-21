import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { IoMdCreate } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


const GroupMenu = () => {

  const { t } = useTranslation();

  const menuElementStyle= 'p-2 rounded-md bg-gray-200 hover:bg-gray-100 before:h-0 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200';

  return (
    <div className='grid grid-cols-[15%_85%]'>
        <div className='bg-gray-200 dark:bg-gray-700'>
          <div className='p-4 flex flex-col border-t-2 border-r-2 border-gray-300 dark:border-gray-800 border-solid'>
            <Link to="/groups/create" className={`${menuElementStyle} mb-1`}>< IoMdCreate/> {t('groupMenu.createGroup')}</Link>
            <Link to="/groups/join" className={`${menuElementStyle} `}>< MdGroup/> {t('groupMenu.joinGroup')}</Link>
          </div>
          <div className='p-4 flex flex-col border-y-2 border-r-2 dark:border-gray-800 border-solid'>
            <Link to="/groups/1" className={`${menuElementStyle} mb-1`}><FaFlagCheckered /> Group1</Link>
            <Link to="/groups/2" className={`${menuElementStyle} mb-1`}><FaFlagCheckered /> Group2</Link>
            <Link to="/groups/3" className={`${menuElementStyle} mb-1`}><FaFlagCheckered /> Group3</Link>
            <Link to="/groups/4" className={`${menuElementStyle} mb-1`}><FaFlagCheckered /> Group4</Link>
            <Link to="/groups/5" className={`${menuElementStyle} mb-1`}><FaFlagCheckered /> Group5</Link>
            <Link to="/groups/6" className={`${menuElementStyle} mb-1`}><FaFlagCheckered /> Group6</Link>
            <Link to="/groups/7" className={`${menuElementStyle} mb-1`}><FaFlagCheckered /> Group7</Link>
            <Link to="/groups/8" className={`${menuElementStyle} mb-1`}><FaFlagCheckered /> Group8</Link>
            <Link to="/groups/9" className={`${menuElementStyle} mb-1`}><FaFlagCheckered /> Group9</Link>
            <Link to="/groups/0" className={`${menuElementStyle}`}><FaFlagCheckered /> Group0</Link>
          </div>
        </div>
        <Outlet />
    </div>
  )
}

export default GroupMenu
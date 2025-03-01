import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { IoMdCreate } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/Store';
import Loading from '../../../components/Loading/Loading';
import { fetchGroupList } from '../../../redux/slices/GroupSlice';
import { useWindowWidth } from '@react-hook/window-size';
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from '@mui/material';

const GroupMenu = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const groups = useSelector((state: RootState) => state.groups.groups); // Redux store-ból olvassuk a csoportokat
  const loading = useSelector((state: RootState) => state.groups.loading); // Betöltési állapot
  const error = useSelector((state: RootState) => state.groups.error); // Hibaüzenet

  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const width = useWindowWidth();

  const menuElementStyle= 'p-2 rounded-md bg-gray-200 hover:bg-gray-100 before:h-0 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200';

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [showMenu]);

  useEffect(() => {
    if (user && groups.length === 0) {
      dispatch(fetchGroupList(user.id));
    }
  }, [user, groups.length, dispatch]);

  if (loading) {
      return <Loading isLoading={loading} />;
  }

  if (error) {
      return <div>{error}</div>;
  }

  return (
    <>
      {showMenu && (
        <div className='h-[100vh] w-full fixed top-0 z-50 flex flex-row-reverse backdrop-blur-sm ' onClick={() => setShowMenu(false)}>
          <div className='bg-gray-200 dark:bg-gray-700 w-1/2 sm:w-1/3 h-[100vh] '>
            <div className='p-4 flex flex-col border-t-2 border-r-2 border-gray-300 dark:border-gray-800 border-solid'>
              <Link to="/groups/create" className={`${menuElementStyle} mb-1`}>< IoMdCreate/> {t('groupMenu.createGroup')}</Link>
              <Link to="/groups/join" className={`${menuElementStyle} `}>< MdGroup/> {t('groupMenu.joinGroup')}</Link>
            </div>
            <div className='p-4 flex flex-col border-y-2 border-r-2 border-gray-300 dark:border-gray-800 border-solid h-full'>
              {groups.map((group) => (
                <Link to={`/groups/${group.id}`} className={`${menuElementStyle} mb-1`} key={group.id}><FaFlagCheckered /> {group.name}
                </Link>)
              )}
            </div>
          </div>
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-[25%_75%] xl:grid-cols-[20%_80%] 2xl:grid-cols-[15%_85%] h-full'>
        {/* Ipad and PC menu */}
        {width > 768 && 
          <div className='bg-gray-200 dark:bg-gray-700 h-full'>
            <div className='p-4 flex flex-col border-t-2 border-r-2 border-gray-300 dark:border-gray-800 border-solid'>
              <Link to="/groups/create" className={`${menuElementStyle} mb-1`}>< IoMdCreate/> {t('groupMenu.createGroup')}</Link>
              <Link to="/groups/join" className={`${menuElementStyle} `}>< MdGroup/> {t('groupMenu.joinGroup')}</Link>
            </div>
            <div className='p-4 flex flex-col border-y-2 border-r-2 border-gray-300 dark:border-gray-800 border-solid h-full'>
              {groups.map((group) => (
                <Link to={`/groups/${group.id}`} className={`${menuElementStyle} mb-1`} key={group.id}><FaFlagCheckered /> {group.name}
                </Link>)
              )}
            </div>
          </div>
        }
        {/* Mobile menu */}
        {width < 768 && 
          <>
            <div className='bg-gray-200 dark:bg-gray-700 flex justify-between items-center py-4 pl-4'>
              <p className='text-2xl font-bold title-font whitespace-nowrap dark:text-white text-center'>{t('groupMenu.group')}</p>
              <Button onClick={() => setShowMenu(!showMenu)}><RxHamburgerMenu /></Button>
            </div>
          </>
        }
        <Outlet/>
      </div>
    </>
  )
}

export default GroupMenu
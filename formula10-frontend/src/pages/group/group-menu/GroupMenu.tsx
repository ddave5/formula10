import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/Store';
import Loading from '../../../components/Loading/Loading';
import { fetchGroupList } from '../../../redux/slices/GroupSlice';
import { useWindowWidth } from '@react-hook/window-size';
import { RxHamburgerMenu } from "react-icons/rx";
import { Alert, Button, Snackbar } from '@mui/material';
import Menu from '../../../components/Menu/Menu';
import { useTheme } from '../../../layout/navbar/Theme/ThemeContext';

const GroupMenu = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const groups = useSelector((state: RootState) => state.groups.groups);
  const loading = useSelector((state: RootState) => state.groups.loading);
  const error = useSelector((state: RootState) => state.groups.error);

  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const width = useWindowWidth();

  const {theme} = useTheme();


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
          <Menu containerStyle='bg-gray-200 dark:bg-gray-500 w-1/2 sm:w-1/3 h-[100vh] border-r-2 border-gray-300 dark:border-gray-700 border-solid' groupList={groups} />
        </div>
      )}
      <div className='grid grid-cols-1 lg:grid-cols-[25%_75%] xl:grid-cols-[20%_80%] 2xl:grid-cols-[15%_85%] h-full'>
        {/* Ipad and PC menu */}
        {width > 1024 && 
          <Menu containerStyle='bg-gray-200 dark:bg-gray-500 border-r-2 border-gray-300 dark:border-gray-700 border-solid h-full' groupList={groups} />
        }
        {/* Mobile menu */}
        {width < 1024 && 
          <>
            <div className='bg-gray-200 dark:bg-gray-700 flex justify-between items-center py-4 pl-4'>
              <p className='text-2xl font-bold title-font whitespace-nowrap dark:text-white text-center'>{t('groupMenu.group')}</p>
              <Button onClick={() => setShowMenu(!showMenu)} sx={{ color: theme === 'dark' ? 'var(--color-font)' : 'var(--color-primary)', fontSize: '1.5rem' }}><RxHamburgerMenu /></Button>
            </div>
          </>
        }
        <Outlet/>
      </div>
    </>
  )
}

export default GroupMenu
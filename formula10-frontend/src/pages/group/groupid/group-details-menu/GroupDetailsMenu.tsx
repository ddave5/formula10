import React, { useEffect, useState } from 'react'
import {Outlet, useLocation } from 'react-router-dom'
import { useWindowWidth } from '@react-hook/window-size';
import Loading from '../../../../components/Loading/Loading';
import { Button } from '@mui/material';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GroupDTO } from '../../../../dto/group.dto';
import { getGroupById } from '../../../../services/groupService';
import Menu from '../../../../components/Menu/Menu';

const GroupDetailsMenu = () => {

  const [group, setGroup] = useState<GroupDTO>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const width = useWindowWidth();
  const location = useLocation();

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
    const loadGroupById = async () => {
      try {
        const groupId = location.pathname.split('/')[2];
        const group = await getGroupById(+groupId);
        setGroup(group);
      } catch (err) {
        console.log(err);
        setError('Failed to load group');
      } finally {
        setLoading(false);
      }
    }

    loadGroupById();
  }, [location.pathname]);

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
          <Menu containerStyle='bg-gray-200 dark:bg-gray-500 w-1/2 sm:w-1/3 h-[100vh]' group={group} leaveGroup={() => setShowMenu(false)} deleteGroup={() => setShowMenu(false)} />
        </div>
      )}
      <div className='grid grid-cols-1 lg:grid-cols-[25%_75%] xl:grid-cols-[20%_80%] 2xl:grid-cols-[15%_85%] h-full relative'>
        {/* Ipad and PC menu */}
        {width > 1024 && 
          <Menu containerStyle='bg-gray-200 dark:bg-gray-500 h-full relative' group={group} leaveGroup={() => setShowMenu(false)} deleteGroup={() => setShowMenu(false)} />
        }
        {/* Mobile menu */}
        {width < 1024 && 
          <>
            <div className='bg-gray-200 dark:bg-gray-500 flex justify-between items-center py-4 pl-4 h-fit'>
              <p className='text-2xl font-bold title-font whitespace-nowrap dark:text-white text-center'>{group?.name}</p>
              <Button onClick={() => setShowMenu(!showMenu)}><RxHamburgerMenu /></Button>
            </div>
          </>
        }
        <Outlet/>
      </div>
    </>
  )
}

export default GroupDetailsMenu
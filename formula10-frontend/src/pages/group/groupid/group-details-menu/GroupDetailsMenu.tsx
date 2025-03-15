import React, { useEffect, useState } from 'react'
import {Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useWindowWidth } from '@react-hook/window-size';
import Loading from '../../../../components/Loading/Loading';
import { Button } from '@mui/material';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GroupDTO } from '../../../../dto/group.dto';
import { deleteGroup, getGroupById } from '../../../../services/group.service';
import Menu from '../../../../components/Menu/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Store';
import { leaveGroup } from '../../../../services/groupmember.service';
import { removeGroup } from '../../../../redux/slices/GroupSlice';
import { useTranslation } from 'react-i18next';

const GroupDetailsMenu = () => {

  const [group, setGroup] = useState<GroupDTO>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [authority, setAuthority] = useState('');

  const user = useSelector((state: RootState) => state.auth.user);
  const userLoading = useSelector((state: RootState) => state.auth.loading);

  const width = useWindowWidth();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  
  const leaveGroupFn = async () => {
    const groupId = location.pathname.split('/')[2];
    const response = await leaveGroup(+groupId, user?.id || 0);

    if (response) {
      dispatch(removeGroup(+groupId));
      navigate('/groups', {
        state: {
          snackbarMessage: t('groupDetailsMenu.leaveSuccess'), 
          snackbarOpen: true 
        }
      });
    }
  }

  const deleteGroupFn = async () => {
    const groupId = location.pathname.split('/')[2];
    const response = await deleteGroup(+groupId);

    if (response) {
      dispatch(removeGroup(+groupId));
      navigate('/groups', { 
        state: { 
          snackbarMessage: t('groupDetailsMenu.deleteSuccess'), 
          snackbarOpen: true 
        } 
      });
    }
  }

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

        setAuthority( group.members.find(member => member.username === user?.username)?.role || '');
      } catch (err) {
        console.log(err);
        setError('Failed to load group');
      } finally {
        setLoading(false);
      }
    }

    loadGroupById();
  }, [location.pathname, user?.username]);

  if (loading || userLoading) {
      return <Loading isLoading={loading || userLoading} />;
  }

  if (error) {
      return <div>{error}</div>;
  }

  return (
    <>
      {showMenu && (
        <div className='h-[100vh] w-full fixed top-0 z-50 flex flex-row-reverse backdrop-blur-sm ' onClick={() => setShowMenu(false)}>
          <Menu containerStyle='bg-gray-200 dark:bg-gray-500 w-1/2 sm:w-1/3 h-[100vh]' 
          group={group} 
          leaveGroup={() => leaveGroupFn()} 
          deleteGroup={() => deleteGroupFn()} 
          authority={authority}/>
        </div>
      )}
      <div className='grid grid-cols-1 lg:grid-cols-[25%_75%] xl:grid-cols-[20%_80%] 2xl:grid-cols-[15%_85%] h-full relative'>
        {/* Ipad and PC menu */}
        {width > 1024 && 
          <Menu containerStyle='bg-gray-200 dark:bg-gray-500 h-full relative' 
          group={group} 
          leaveGroup={() => leaveGroupFn()} 
          deleteGroup={() => deleteGroupFn()} 
          authority={authority}/>
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
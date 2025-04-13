import { IconButton, MenuItem, Menu, Divider, MenuList } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaUser, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/AuthSlice';
import { clearGroups } from '../../../redux/slices/GroupSlice';
import Player from './Player/Player';
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";


const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const user = useSelector((state: any) => state.auth.user);
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (url: string) => {
    setAnchorEl(null);
    if (url) {
      navigate(url);
    }
  };

  const logOut = () => {
      dispatch(logout());
      dispatch(clearGroups());
      navigate('/');
    }

  return (
    <div className='flex items-center'>
      <IconButton onClick={handleClick} sx={{ color: 'var(--color-font)', padding: 0, fontSize: '1.2rem'}}>
        {user ? <Player /> : <FaUser /> }
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose('')}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {user && (
          <MenuList>
            <MenuItem disabled sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', }}>
              <p className='text-sm font-medium leading-none'>{t('navbar.welcome')}, {user.username}</p>
              <p className="text-xs leading-none text-muted-foreground mt-2">{user.email}</p>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleClose('/profile')}>
              <p className='flex items-center gap-2 '><FaUser /> {t('navbar.profile')}</p></MenuItem>
            <MenuItem onClick={logOut}>
              <p className='flex items-center gap-2 '><MdOutlineLogout />{t('navbar.logout')}</p>
            </MenuItem>
          </MenuList>
        )}
        {!user && (
          <MenuList>
            <MenuItem onClick={() => handleClose('/login')}>
            <p className='flex items-center gap-2 '><MdOutlineLogin /> {t('navbar.login')}</p></MenuItem>
            <MenuItem onClick={() => handleClose('/register')}>
            <p className='flex items-center gap-2 '><FaUserPlus /> {t('navbar.signUp')}</p></MenuItem>
          </MenuList>
        )}
      </Menu>
    </div>
  )
}

export default UserMenu;

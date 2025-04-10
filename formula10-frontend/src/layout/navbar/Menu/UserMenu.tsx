import { IconButton, MenuItem, Menu, Divider, MenuList } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/AuthSlice';
import { clearGroups } from '../../../redux/slices/GroupSlice';
import Player from './Player/Player';


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
            <MenuItem disabled>{user.username}</MenuItem>
            <Divider />
            <MenuItem onClick={() => handleClose('/profile')}>{t('navbar.profile')}</MenuItem>
            <MenuItem onClick={logOut}>{t('navbar.logout')}</MenuItem>
          </MenuList>
        )}
        {!user && (
          <MenuList>
            <MenuItem onClick={() => handleClose('/login')}>{t('navbar.login')}</MenuItem>
            <MenuItem onClick={() => handleClose('/register')}>{t('navbar.signUp')}</MenuItem>
          </MenuList>
        )}
      </Menu>
    </div>
  )
}

export default UserMenu;

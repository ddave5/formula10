import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getGroupList, joinGroup } from '../../../services/groupService';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { GroupDTO } from '../../../dto/group.dto';
import Loading from '../../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { useTheme } from '../../../layout/navbar/Theme/ThemeContext';

const JoinGroup = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const [groups, setGroups] = useState<GroupDTO[]>([]);
  const [myGroups, setMyGroups] = useState<GroupDTO[]>([]);
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [password, setPassword] = useState('');

  const [passwordCheck, setPasswordCheck] = useState(false);
  const [joinDone, setJoinDone] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState<GroupDTO | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();
  const { theme } = useTheme();

  const darkInputStyle = {
    '.css-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input' : {color: 'var(--color-font)'}, 
    '.MuiInputLabel-root': {color: 'var(--color-font)'}, 
    '.MuiOutlinedInput-notchedOutline' : {borderColor: 'var(--color-font)'}, 
    '&:hover .MuiOutlinedInput-notchedOutline' : {borderColor: 'var(--color-font)'}
  } 

  const lightInputStyle = {
    '.css-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input' : {color: 'var(--color-gray)'}, 
    '.MuiInputLabel-root': {color: 'var(--color-gray)'}, 
    '.MuiOutlinedInput-notchedOutline' : {borderColor: 'var(--color-gray)'}, 
    '&:hover .MuiOutlinedInput-notchedOutline' : {borderColor: 'var(--color-gray)'}
  }  

  const availabilityChecker = (group: GroupDTO) => {
    if (group.availability === 'PUBLIC') {
      join(group.id);
    } else {
      setSelectedGroup(group);
      setPasswordCheck(true);
    }
  }

  const join = async (groupId: number = selectedGroup?.id || 0) => {
    try {
      const data = await joinGroup( user?.id || 0, groupId, password);
      if (data) {
        setJoinDone(true);
      }
    } catch (err) {
      setError('Failed to join group');
    }
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
      const fetchGroups = async () => {
          try {
              const data = await getGroupList();
              setMyGroups(data.filter((group) => group.members.some((member) => member.id === user?.id)));
              setGroups(data);
          } catch (err) {
              setError('Failed to fetch groups');
          } finally {
              setLoading(false);
          }
      };
      
      fetchGroups();
    }, []);

  if (loading) {
      return <Loading isLoading={loading} />;
  }

  if (error) {
      return <div>{error}</div>;
  }

  return (
    <>
      {
        joinDone ? <SuccessPanel title={t('joinGroup.successTitle')} details={t('joinGroup.successDetails')} url={'/groups'} /> :
        <>
          <div className='flex flex-col mt-8'>
            <p className="text-4xl title-font whitespace-nowrap dark:text-white mb-12 text-center">{t('joinGroup.joinGroup')}</p>
            <TableContainer component={Paper} sx={{ padding: '1rem', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', width: '66%', margin: '1rem auto' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('joinGroup.groupName')}</TableCell>
                    <TableCell align="center">{t('joinGroup.availability')}</TableCell>
                    <TableCell align="center">{t('joinGroup.numberOfMembers')}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groups.map((group) => (
                    <TableRow
                      key={group.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {group.name}
                      </TableCell>
                      <TableCell align="center">{group.availability}</TableCell>
                      <TableCell align="center">{group.members.length}</TableCell>
                      <TableCell align="right">
                        {myGroups.some((myGroup) => myGroup.id === group.id) ? 
                          t('joinGroup.joined') : 
                          <Button onClick={() => availabilityChecker(group)} variant="contained">{t('joinGroup.join')}</Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Dialog
            open={passwordCheck}
            onClose={() => setPasswordCheck(false)}
            slotProps={{
              paper: {
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries((formData as any).entries());
                  setPasswordCheck(false);
                },
              },
            }}
          >
            <DialogTitle>{t('joinGroup.dialogTitle')}</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ marginBottom: '1rem' }}>
                {t('joinGroup.dialogDetails')}
              </DialogContentText>
              <TextField id='password' type={showPassword ? 'text' : 'password'} placeholder={t('joinGroup.password')} label={t('joinGroup.password')} size='small' className='text-2xl w-full' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off'
                       sx={ theme === "dark" ? darkInputStyle : lightInputStyle}
                       slotProps={{
                        "input": {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={() => setShowPassword((show) => !show)}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                              >
                                {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                       }}
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPasswordCheck(false)}>{t('joinGroup.cancel')}</Button>
              <Button onClick={() => join()}>{t('joinGroup.join')}</Button>
            </DialogActions>
          </Dialog>
        </>  
      }
    </>
  )
}

export default JoinGroup
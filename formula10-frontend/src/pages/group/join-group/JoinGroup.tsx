import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getGroupList, joinGroup } from '../../../services/group.service';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/Store';
import { GroupDTO } from '../../../dto/group.dto';
import Loading from '../../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { useTheme } from '../../../layout/navbar/Theme/ThemeContext';
import { addGroup } from '../../../redux/slices/GroupSlice';
import { darkInputStyle, lightInputStyle } from '../../../components/TextInput/InputStyle';

const JoinGroup = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const groups = useSelector((state: RootState) => state.groups.groups);
  const loading = useSelector((state: RootState) => state.groups.loading);
  const error = useSelector((state: RootState) => state.groups.error);

  const dispatch = useDispatch<AppDispatch>();

  const [allGroups, setAllGroups] = useState<GroupDTO[]>([]);
  const [password, setPassword] = useState('');

  const [passwordCheck, setPasswordCheck] = useState(false);
  const [joinDone, setJoinDone] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState<GroupDTO | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [allGroupsLoading, setAllGroupsLoading] = useState(true);

  // New states for pagination and filtering
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');

  const { t } = useTranslation();
  const { theme } = useTheme();

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
      const data = await joinGroup(user?.id || 0, groupId, password);
      if (data) {
        setJoinDone(true);
        dispatch(addGroup(data));
      }
    } catch (err) {
      console.log('Failed to join group');
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const closeDialog = () => {
    setPasswordCheck(false);
    setPassword('');
  }

  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const data = await getGroupList();
        setAllGroups(data);
      } catch (err) {
        console.log(err);
      } finally {
        setAllGroupsLoading(false);
      }
    };

    fetchAllGroups();
  }, [user]);

  const filteredGroups = allGroups.filter(group =>
    group.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginatedGroups = filteredGroups.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // reset to the first page
  };

  if (loading || allGroupsLoading) {
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
            <TextField 
              label={t('joinGroup.searchGroup')}
              variant="outlined"
              size="small"
              fullWidth
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              sx={{ margin: '1rem', maxWidth: '400px', alignSelf: 'center', ...theme === 'dark' ? darkInputStyle : lightInputStyle }}
            />
            <TableContainer component={Paper} sx={{ padding: '1rem', border: '1px solid #ccc', width: '66%', margin: '1rem auto', backgroundColor: theme === 'dark' ? 'var(--color-gray)' : 'white' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className='dark:text-[--color-font]'>{t('joinGroup.groupName')}</TableCell>
                    <TableCell align="center" className='dark:text-[--color-font]'>{t('joinGroup.availability')}</TableCell>
                    <TableCell align="center" className='dark:text-[--color-font]'>{t('joinGroup.numberOfMembers')}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedGroups.map((group) => (
                    <TableRow
                      key={group.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" className='dark:text-[--color-font]'>
                        {group.name}
                      </TableCell>
                      <TableCell align="center" className='dark:text-[--color-font]'>{group.availability}</TableCell>
                      <TableCell align="center" className='dark:text-[--color-font]'>{group.members.length}</TableCell>
                      <TableCell align="right" className='dark:text-[--color-font]'>
                        {groups.some((g) => g.id === group.id) ? 
                          t('joinGroup.alreadyMember') : 
                          <Button onClick={() => availabilityChecker(group)} variant="contained">{t('joinGroup.join')}</Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredGroups.length}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={t('joinGroup.rowsPerPage')}
                sx={{ 
                  color: theme === 'dark' ? 'var(--color-font)' : 'inherit',
                  '.MuiTablePagination-toolbar': {
                    color: theme === 'dark' ? 'var(--color-font)' : 'inherit',
                  },
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-input, .MuiTablePagination-displayedRows': {
                    color: theme === 'dark' ? 'var(--color-font)' : 'inherit',
                  },
                  '.MuiTablePagination-actions .MuiIconButton-root': {
                    color: theme === 'dark' ? 'var(--color-font)' : 'inherit',
                  }, 
                  }}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('joinGroup.of')} ${count !== -1 ? count : `more than ${to}`}`}
              />
            </TableContainer>
          </div>

          {/* Password dialog */}
          <Dialog
            open={passwordCheck}
            onClose={closeDialog}
            slotProps={{
              paper: {
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
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
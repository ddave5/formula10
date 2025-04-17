import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import type React from 'react'
import { useEffect, useState } from 'react'
import { getGroupList, joinGroup } from '../../../services/group.service';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/Store';
import type { GroupDTO } from '../../../dto/group.dto';
import Loading from '../../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel';
import { useTheme } from '../../../layout/navbar/Theme/ThemeContext';
import { addGroup } from '../../../redux/slices/GroupSlice';
import { darkInputStyle, lightInputStyle } from '../../../components/TextInput/InputStyle';
import eventBus from '../../../services/eventBus';
import PasswordInput from '../../../components/passwordInput/PasswordInput';
import { useWindowWidth } from '@react-hook/window-size';

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
  
  const [allGroupsLoading, setAllGroupsLoading] = useState(true);

  // New states for pagination and filtering
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');

  const { t } = useTranslation();
  const { theme } = useTheme();
  const width = useWindowWidth();

  const availabilityChecker = (group: GroupDTO) => {
    if (group.availability === 'PUBLIC') {
      join(group);
    } else {
      setSelectedGroup(group);
      setPasswordCheck(true);
    }
  }

  const join = async (group: GroupDTO) => {
    try {
      
      if (password === '' && group?.availability === 'PRIVATE') {
        eventBus.emit('error', {message: t('joinGroup.addPassword'), isDialog: false });
        return;
      }

      const data = await joinGroup(user?.id || 0, group.id, password);
      if (data) {
        eventBus.emit('success', {message: t('joinGroup.successJoining'), isDialog: false })
        setJoinDone(true);
        dispatch(addGroup(data));
      }
    } catch (err) {
      eventBus.emit('error', {message: t('joinGroup.wrongPassword') , isDialog: false });
    }
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
        eventBus.emit('error', {message: t('messages.errorFetching')});
      } finally {
        setAllGroupsLoading(false);
      }
    };

    fetchAllGroups();
  }, [t]);

  const filteredGroups = allGroups.filter(group =>
    group.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginatedGroups = filteredGroups.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setCurrentPage(0); 
  };

  if (loading || allGroupsLoading) {
      return <Loading isLoading={loading || allGroupsLoading} />;
  }

  if (error) {
      return <div>{error}</div>;
  }

  const pc = { padding: '1rem', border: '1px solid #ccc', width: '66%', margin: '1rem auto', backgroundColor: theme === 'dark' ? 'var(--color-gray)' : 'white' }
  const mobile = {border: '1px solid #ccc', width: 'calc(100% - .2rem)', margin: '1rem .1rem', overflow: 'hidden', backgroundColor: theme === 'dark' ? 'var(--color-gray)' : 'white' }

  return (
    <>
      {
        joinDone ? <SuccessPanel title={t('joinGroup.successTitle')} details={t('joinGroup.successDetails')} url={'/groups'} /> :
        <>
          <div className='flex flex-col mt-8'>
            <p className="text-2xl xl:text-4xl title-font whitespace-nowrap dark:text-white mb-12 text-center">{t('joinGroup.joinGroup')}</p>
            <TextField 
              label={t('joinGroup.searchGroup')}
              variant="outlined"
              size="small"
              fullWidth
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              sx={{ margin: '1rem', maxWidth: '400px', alignSelf: 'center', ...theme === 'dark' ? darkInputStyle : lightInputStyle }}
            />
            <TableContainer component={Paper} sx={width > 600 ? pc : mobile}>
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className='dark:text-[--color-font]'>{t('joinGroup.groupName')}</TableCell>
                    {width > 600 && (<TableCell align="center" className='dark:text-[--color-font]'>{t('joinGroup.availability')}</TableCell>) }
                    <TableCell align="center" className='dark:text-[--color-font]'>{t('joinGroup.numberOfMembers')}</TableCell>
                    <TableCell align="right"/>
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
                      {width > 600 && (<TableCell align="center" className='dark:text-[--color-font]'>{group.availability}</TableCell>)}
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
                  maxWidth: '100%',
                  overflowX: 'hidden'
                  }}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('joinGroup.of')} ${count !== -1 ? count : `more than ${to}`}`}
              />
            </TableContainer>
          </div>

          {/* Password dialog */}
          <Dialog
            open={passwordCheck}
            onClose={closeDialog}
            sx={{
              backdropFilter: 'blur(4px)'
            }}
            slotProps={{
              paper: {
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  setPasswordCheck(false);
                },
                sx: {
                  backgroundColor: theme === 'dark' ? 'var(--color-gray)' : 'white',
                  color: theme === 'dark' ? 'var(--color-font)' : 'inherit',
                }
              },
            }}
          >
            <DialogTitle>{t('joinGroup.dialogTitle')}</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ marginBottom: '1rem', color: theme === 'dark' ? 'var(--color-font)' : 'inherit' }}>
                {t('joinGroup.dialogDetails')}
              </DialogContentText>
              <PasswordInput props={{
                    password: password,
                    setPassword: setPassword,
                    label:'password',
                    sx: {width: '100%'}
                  }}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => closeDialog()}>{t('joinGroup.cancel')}</Button>
              <Button onClick={() => join(selectedGroup as GroupDTO)}>{t('joinGroup.join')}</Button>
            </DialogActions>
          </Dialog>
        </>  
      }
    </>
  )
}

export default JoinGroup
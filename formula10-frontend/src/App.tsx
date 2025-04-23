import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import i18n from 'i18next';
import Menu from './layout/navbar/Menu/UserMenu';
import Navbar from './layout/navbar/Navbar';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './redux/Store';
import { loadUserFromStorage } from './redux/slices/AuthSlice';
import eventBus from './services/eventBus';
import { showError } from './redux/slices/ErrorSlice';
import { getToken } from './services/token.service';
import Footer from './layout/footer/Footer';
import PrivacyPolicy from './layout/footer/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from './layout/footer/TermsOfUse/TermsOfUse';
import CopyrightNotice from './layout/footer/CopyrightNotice/CopyrightNotice';
import LegalNotice from './layout/footer/LegalNotice/LegalNotice';
import EmailNotice from './layout/footer/EmailNotice/EmailNotice';
import Rules from './pages/Rules/Rules';
import Error404 from './pages/error/Error404';
import GroupsHome from './pages/group/home/GroupsHome';
import GroupDetails from './pages/group/groupid/group-details/GroupDetails';
import CreateGroup from './pages/group/create-group/CreateGroup';
import Tip from './pages/group/groupid/tip/Tip';
import Members from './pages/group/groupid/members/Members';
import Archive from './pages/group/groupid/archive/Archive';
import Standing from './pages/group/groupid/standing/Standing';
import JoinGroup from './pages/group/join-group/JoinGroup';
import GroupDetailsMenu from './pages/group/groupid/group-details-menu/GroupDetailsMenu';
import GroupMenu from './pages/group/group-menu/GroupMenu';
import PasswordChange from './pages/login/PasswordChange/PasswordChange';
import Points from './pages/points/Points';
import NewsManagement from './pages/admin/newsManagement/NewsManagement';
import ProtectedRoute from './ProtectedRoute';
import ManageGroup from './pages/group/groupid/manage/ManageGroup';
import Profile from './pages/Profile/Profile';
import { GroupProvider } from './context/GroupContext';
import ForgotPassword from './pages/login/PasswordChange/ForgotPassword';
function App() {
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect( () => {
    const savedLanguage = localStorage.getItem('language') || 'hu';
    i18n.changeLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const token = getToken(); // Token ellenőrzése
    if (token) {
      dispatch(loadUserFromStorage()); // Csak akkor hívjuk meg, ha van token
    } // Token betöltése storage-ból
  }, [dispatch]);


  useEffect(() => {
    // Előfizetés a hibákra, amelyek az Axios által jönnek
    eventBus.on('error', (error: {message: string, isDialog: boolean}) => {
      dispatch(showError(error.message)); 
    });

    return () => {
      eventBus.off('error', dispatch);
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route index path="/" Component={Home} />
          <Route path='/menu' Component={Menu} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Registration} />
          <Route path='/forgotPassword' Component={ForgotPassword} />
          <Route path='/profile' Component={Profile} />

          <Route element={<ProtectedRoute />}>
            <Route path='/groups' Component={GroupMenu} >
              <Route index Component={GroupsHome} />
              <Route path='create' Component={CreateGroup} />
              <Route path='join' Component={JoinGroup} />
            </Route>

            <Route path='groups/:groupId' element={
              <GroupProvider>
                <GroupDetailsMenu />
              </GroupProvider>
            }>
                <Route index Component={GroupDetails} />
                <Route path='standing' Component={Standing} />
                <Route path='tip' Component={Tip} />
                <Route path='members' Component={Members} />
                <Route path='archive' Component={Archive} />
                <Route path='manage' Component={ManageGroup} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute roleRequired='ADMIN'/>}>
            <Route path='admin'>
              <Route path='newsManagement' Component={NewsManagement} />
            </Route>
          </Route>
          
          <Route path='/rules' Component={Rules} />
          <Route path='/points' Component={Points} />
          <Route path='/privacyPolicy' Component={PrivacyPolicy} />
          <Route path='/termsOfUse' Component={TermsOfUse} />
          <Route path='/copyrightNotice' Component={CopyrightNotice} />
          <Route path='/legalNotice' Component={LegalNotice} />
          <Route path='/emailNotice' Component={EmailNotice} />

          <Route path='*' element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

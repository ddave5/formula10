import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import i18n from 'i18next';
import Menu from './layout/navbar/Menu/Menu';
import Navbar from './layout/navbar/Navbar';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import { ErrorProvider } from './layout/ErrorContext/ErrorContext';
import ErrorDialog from './layout/ErrorContext/ErrorDialog';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/Store';
import { loadUserFromStorage } from './redux/slices/AuthSlice';
import eventBus from './services/eventBus';
import { showError } from './redux/slices/ErrorSlice';
import { getToken } from './services/tokenService';
import Footer from './layout/footer/Footer';
import PrivacyPolicy from './layout/footer/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from './layout/footer/TermsOfUse/TermsOfUse';
import CopyrightNotice from './layout/footer/CopyrightNotice/CopyrightNotice';
import LegalNotice from './layout/footer/LegalNotice/LegalNotice';
import EmailNotice from './layout/footer/EmailNotice/EmailNotice';
import Rules from './pages/Rules/Rules';
import Error404 from './pages/error/Error404';

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
    eventBus.on('error', (message: string) => {
      dispatch(showError(message)); 
    });

    return () => {
      eventBus.off('error', dispatch);
    };
  }, [dispatch]);

  return (
    <>
      <ErrorProvider>
        <ErrorDialog />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path='/menu' Component={Menu} />
            <Route path='/login' Component={Login} />
            <Route path='/register' Component={Registration} />
            <Route path='/rules' Component={Rules} />
            
            <Route path='/privacyPolicy' Component={PrivacyPolicy} />
            <Route path='/termsOfUse' Component={TermsOfUse} />
            <Route path='/copyrightNotice' Component={CopyrightNotice} />
            <Route path='/legalNotice' Component={LegalNotice} />
            <Route path='/emailNotice' Component={EmailNotice} />

            <Route path='*' element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </ErrorProvider>
    </>
  );
}

export default App;

import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import i18n from 'i18next';
import Menu from './layout/navbar/Menu/Menu';
import Navbar from './layout/navbar/Navbar';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import SuccessRegistration from './pages/successRegistration/SuccessRegistration';

function App() {

  useEffect( () => {
    const savedLanguage = localStorage.getItem('language') || 'hu';
    i18n.changeLanguage(savedLanguage);
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path='/menu' Component={Menu} />
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Registration} />
        <Route path='/success' Component={SuccessRegistration} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </>
  );
}

export default App;

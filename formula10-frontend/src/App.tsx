import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import i18n from 'i18next';
import Menu from './layout/navbar/Menu/Menu';
import Navbar from './layout/navbar/Navbar';

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
      </Routes>
    </>
  );
}

export default App;

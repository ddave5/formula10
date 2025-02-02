import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import i18n from 'i18next';
import Menu from './layout/navbar/Menu/Menu';

function App() {

  useEffect( () => {
    const savedLanguage = localStorage.getItem('language') || 'hu';
    i18n.changeLanguage(savedLanguage);
  }, [])

  return (
    <Router>
        <Routes>
            <Route path="/" Component={Home} />
            <Route path='/menu' Component={Menu} />
        </Routes>
    </Router>
  );
}

export default App;

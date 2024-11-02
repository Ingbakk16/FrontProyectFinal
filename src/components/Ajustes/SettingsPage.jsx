import React, { useContext } from 'react';
import { ThemeContext } from '../services/ThemeContext/Theme.context';
import Footer from '../footer/footer';
import Header from '../header/header';
import './SettingsPage.css';

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`settings-page ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="header">
        <Header />
      </div>
      <h2>Ajustes</h2>
      <div className="contenedor">
        <input type="checkbox" id="checkbox" onChange={toggleTheme} />
        <label htmlFor="checkbox" className="label"></label>
      </div>
      <span className="theme-label">
        {theme === "dark" ? "Modo Oscuro" : "Modo Claro"}
      </span>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default SettingsPage;

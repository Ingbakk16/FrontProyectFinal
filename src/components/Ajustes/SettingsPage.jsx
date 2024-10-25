import React, { useContext } from 'react';
import { Button } from "react-bootstrap";
import { ThemeContext } from '../services/ThemeContext/Theme.context';  
import Footer from '../footer/footer';

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`settings-page ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <h2>Ajustes</h2>
        <Button onClick={toggleTheme}>
            {theme === "dark" ? "Switch to Default" : "Switch to Dark Mode"}
        </Button>
      <Footer/>
    </div>
  );
};

export default SettingsPage;

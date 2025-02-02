import { useTheme } from './ThemeContext'; 
import Toggle from 'react-toggle'
import { MdDarkMode, MdSunny } from "react-icons/md";
import './Toggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const defaultChecked = theme === 'dark';

  return (
    <Toggle
        defaultChecked={defaultChecked}
        icons={{
            checked: <MdDarkMode />,
            unchecked: <MdSunny />,
        }}
        className='toggle'
        onChange={toggleTheme} 
    />
  );
};

export default ThemeToggle;
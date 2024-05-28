import { createContext, useState } from 'react';

const ThemeContext = createContext('dark');

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState('food1');
  const [minHeight, setMinHeight] = useState('min-height-100vh');
  return (
    <ThemeContext.Provider value={{ theme, setTheme, minHeight, setMinHeight }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
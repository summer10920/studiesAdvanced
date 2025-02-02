import { createContext, useContext } from 'react';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = createContext(themes.dark);

const MyContext = () => (
  <>
    <ThemeContext.Provider value={themes.dark}>
      <MyContextLv1 />
    </ThemeContext.Provider>
  </>
);

const MyContextLv1 = () => <MyContextLv2 />;

const MyContextLv2 = () => {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
};

export default MyContext;

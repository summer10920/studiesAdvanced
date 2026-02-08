import { createContext } from 'react';

// Theme（主題）
export const themes = {
  light: {
    name: 'light',
    foreground: '#000000',
    background: '#eeeeee',
    buttonBg: '#ffffff',
    buttonBorder: '#cccccc',
  },
  dark: {
    name: 'dark',
    foreground: '#ffffff',
    background: '#222222',
    buttonBg: '#333333',
    buttonBorder: '#555555',
  },
};

export const ThemeContext = createContext(themes.light);

// FontSize（巢狀選單字級）
// export const FontSizeContext = createContext(3);

// Todo（狀態與操作分離）
// export const TodoStateContext = createContext(null);
// export const TodoDispatchContext = createContext(null);

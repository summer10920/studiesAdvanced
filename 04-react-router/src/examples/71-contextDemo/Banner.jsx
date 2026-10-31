import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';

export default function Banner() {
  const theme = useContext(ThemeContext);
  return <p>主題 {theme}</p>;
}

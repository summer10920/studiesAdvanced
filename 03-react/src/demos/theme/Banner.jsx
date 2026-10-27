import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.js';

export default function Banner() {
  const theme = useContext(ThemeContext);
  return <p>主題 {theme}</p>;
}

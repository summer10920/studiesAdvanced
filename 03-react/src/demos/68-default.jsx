import { createContext, useContext } from 'react';

const ThemeContext = createContext('淺色');

function Banner() {
  const theme = useContext(ThemeContext);
  return <p>主題 {theme}</p>;
}

export default function DefaultDemo() {
  return <Banner />;
}

// TODO: 講義「預設值」。換你試試：把建立 context 的預設字串改成深色。畫面應變成主題深色，仍然不要加 Provider。
import { createContext, useContext } from 'react';

const ThemeContext = createContext('淺色');

function Banner() {
  const theme = useContext(ThemeContext);
  return <p>主題 {theme}</p>;
}

export default function DefaultDemo() {
  return <Banner />;
}

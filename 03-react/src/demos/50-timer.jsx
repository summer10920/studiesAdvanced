// TODO: 講義「清除函式」。換你試試：把間隔改成 2000。秒數應大約每兩秒加 1，清除函式留著。
import { useEffect, useState } from 'react';

export default function TimerDemo() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>秒數 {seconds}</p>;
}

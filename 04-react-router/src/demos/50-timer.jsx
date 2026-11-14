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

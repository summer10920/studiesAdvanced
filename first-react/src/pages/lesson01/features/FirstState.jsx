import { useState } from 'react';

export default function FirstState() {
  const [count, setCount] = useState(0); // 初始值為 0

  // console.log('rendered 渲染', count);

  // const updateCount = () => {
  //   setCount(count + 1); // 指定0+1給 count
  //   setCount(count + 5); // 指定0+5給 count
  // };
  const updateCount = () => {
    setCount((prevCount) => prevCount + 1); // 告知React前一個狀態值+1為新值
    setCount((prevCount) => prevCount + 5); // 告知React前一個狀態值+1為新值
  };

  return (
    <div>
      <p>count is {count}</p>
      {/* <button onClick={() => setCount(count + 1)}>點擊觸發狀態</button> */}
      <button onClick={() => console.log(123)}>普通點擊觸發不會發生狀態改變觸使得元件重新執行渲染為新虛擬DOM</button>
      <button onClick={() => updateCount()}>點擊觸發狀態</button>
    </div>
  );
}

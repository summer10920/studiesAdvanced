import { useState } from 'react';
import MenuItem from './MenuItem';
import { FontSizeContext } from '../../sharedContext';
import './index.css';

// 模擬巢狀選單資料
const menuData = [
  {
    name: 'Menu A',
    children: [
      { name: 'Menu A-1' },
      { name: 'Menu A-2' },
      {
        name: 'Menu A-3',
        children: [{ name: 'Menu A-3-I' }, { name: 'Menu A-3-II' }, { name: 'Menu A-3-III' }],
      },
    ],
  },
  {
    name: 'Menu B',
    children: [
      { name: 'Menu B-1' },
      {
        name: 'Menu B-2',
        children: [{ name: 'Menu B-2-I' }, { name: 'Menu B-2-II' }],
      },
      { name: 'Menu B-3' },
    ],
  },
  {
    name: 'Menu C',
    children: [{ name: 'Menu C-1' }, { name: 'Menu C-2' }],
  },
];

export default function MenuExample() {
  return (
    <div className="menu-example">
      <h1>📑 Context 進階：巢狀選單</h1>

      <div className="example-intro">
        <p>這個範例展示如何在遞迴元件中使用 Context，</p>
        <p>每一層的文字大小會自動遞減（3rem → 2rem → 1.33rem → ...）。</p>
      </div>

      {/* 🌟 提供初始字體大小 */}
      <FontSizeContext.Provider value={3}>
        <ul className="menu-list">
          {menuData.map((item) => (
            <MenuItem key={item.name} data={item} />
          ))}
        </ul>
      </FontSizeContext.Provider>

      <div className="explanation">
        <h3>💡 重點技巧</h3>
        <ul>
          <li>
            <strong>Context 巢套：</strong>
            子元件可以用新的 <code>Provider</code> 覆蓋父層的值
          </li>
          <li>
            <strong>遞迴元件：</strong>
            MenuItem 會渲染自己作為子元件（樹狀結構）
          </li>
          <li>
            <strong>動態計算：</strong>
            每一層讀取當前 Context 值，計算後提供新值給下一層
          </li>
        </ul>

        <h4>📐 字體大小計算：</h4>
        <div className="formula">
          <code>新字體大小 = 當前字體大小 ÷ 1.5</code>
        </div>
      </div>
    </div>
  );
}

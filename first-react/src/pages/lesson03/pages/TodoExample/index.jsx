import TaskAdd from './TaskAdd';
import TaskList from './TaskList';
import { useReducer } from 'react';

// 🌟 初始資料
const initState = [
  { id: 1, text: '去健身房', checked: false },
  { id: 2, text: '繳帳單', checked: true },
  { id: 3, text: '見 George', checked: false },
  { id: 4, text: '買雞蛋', checked: false },
  { id: 5, text: '讀一本書', checked: false },
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: state.length ? state[state.length - 1].id + 1 : 1, text: action.text, checked: false }];
    case 'DELETE':
      return state.filter((item) => item.id !== action.id);
    case 'TOGGLE_CHECKED':
      return state.map((item) => (item.id === action.id ? { ...item, checked: !item.checked } : item));
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function TodoExample() {
  const [todoList, dispatch] = useReducer(todoReducer, initState); // 先放著，後面會介紹 useReducer

  return (
    <div className="todo-example">
      <h1>Todo List：useReducer 範例</h1>

      {/* 輸入區域 */}
      <TaskAdd onAdd={(text) => dispatch({ type: 'ADD', text })} />

      {/* 待辦列表 */}
      <TaskList
        todoList={todoList}
        onDelete={(id) => dispatch({ type: 'DELETE', id })}
        onToggleChecked={(id) => dispatch({ type: 'TOGGLE_CHECKED', id })}
      />
    </div>
  );
}

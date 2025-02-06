import { useReducer } from 'react';
import style from './todoList.module.css';
import TaskAdd from './component/taskAdd';
import TaskList from './component/taskList';

const TodoList = () => {
  // reducer
  // ---------------------------------------------------------------
  const reducerFn = (state, action) => {
    switch (action.type) {
      case 'add todo': {
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            checked: false,
          },
        ];
      }
      case 'delete todo': {
        return state.filter((item) => item.id !== action.id);
      }
      case 'checked todo': {
        return state.map((item) => (item.id === action.item.id ? action.item : item));
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  };

  const initState = [
    { id: 1, text: 'Hit the gym', checked: false },
    { id: 2, text: 'Pay bills', checked: true },
    { id: 3, text: 'Meet George', checked: false },
    { id: 4, text: 'Buy eggs', checked: false },
    { id: 5, text: 'Read a book', checked: false },
    { id: 6, text: 'Organize office', checked: false },
  ];

  const [state, dispatch] = useReducer(reducerFn, initState);

  // dispatch
  // --------------------------------------------------------------
  // const handleAdd = (text) => {
  //   setList((data) => {
  //     return [
  //       ...data,
  //       {
  //         id: list[list.length - 1].id + 1,
  //         text: text,
  //         checked: false,
  //       },
  //     ];
  //   });
  // };
  const handleAdd = (text) => {
    dispatch({
      type: 'add todo',
      id: state[state.length - 1].id + 1,
      text: text,
      checked: false,
    });
  };

  // const handleDelete = (id) => {
  //   setList((data) => data.filter((item) => item.id !== id));
  // };
  const handleDelete = (id) => {
    dispatch({
      type: 'delete todo',
      id,
    });
  };

  // const handleChecked = (newItem) => {
  //   setList((data) =>
  //     data.map((item) => {
  //       return item.id === newItem.id ? newItem : item;
  //     })
  //   );
  // };
  const handleChecked = (newItem) => {
    dispatch({
      type: 'checked todo',
      item: newItem,
    });
  };

  return (
    <>
      <div className={style.header}>
        <h2>My To Do List</h2>
        <TaskAdd onAdd={handleAdd} />
      </div>
      <TaskList items={state} onDelete={handleDelete} onChecked={handleChecked} />
    </>
  );
};

export default TodoList;

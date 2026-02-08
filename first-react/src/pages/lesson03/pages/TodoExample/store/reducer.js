import { ADD_TODO, DELETE_TODO, TOGGLE_CHECKED } from './action';

export const initState = [
  { id: 1, text: '去健身房', checked: false },
  { id: 2, text: '繳帳單', checked: true },
  { id: 3, text: '見 George', checked: false },
  { id: 4, text: '買雞蛋', checked: false },
  { id: 5, text: '讀一本書', checked: false },
];

export function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { id: state.length ? state[state.length - 1].id + 1 : 1, text: action.text, checked: false }];
    case DELETE_TODO:
      return state.filter((item) => item.id !== action.id);
    case TOGGLE_CHECKED:
      return state.map((item) => (item.id === action.id ? { ...item, checked: !item.checked } : item));
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

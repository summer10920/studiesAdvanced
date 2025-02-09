import * as action from './actions.js';

// reducer
// ---------------------------------------------------------------
export const reducerFn = (state, { type, ...props }) => {
  switch (type) {
    case action.ADD_TODO: {
      return [...state, props.item];
    }
    case action.DELETE_TODO: {
      return state.filter((item) => item.id !== props.id);
    }
    case action.CHECKED_TODO: {
      return state.map((item) => (item.id === props.item.id ? props.item : item));
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export const initState = [
  { id: 1, text: 'Hit the gym', checked: false },
  { id: 2, text: 'Pay bills', checked: true },
  { id: 3, text: 'Meet George', checked: false },
  { id: 4, text: 'Buy eggs', checked: false },
  { id: 5, text: 'Read a book', checked: false },
  { id: 6, text: 'Organize office', checked: false },
];

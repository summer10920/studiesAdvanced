let notes = [
  { id: '1', title: '看海', done: false },
  { id: '2', title: '寫筆記', done: true },
];

export const listNotes = () => notes;

export const getNote = (id) => notes.find((item) => item.id === id) ?? null;

export const addNote = (title) => {
  const note = { id: String(Date.now()), title, done: false };
  notes = [note, ...notes];
  return note;
};

export const toggleNote = (id) => {
  notes = notes.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item,
  );
};

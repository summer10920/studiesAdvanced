/** @type {{ id: string, title: string, done: boolean }[]} */
let notes = [
  { id: '1', title: '看海', done: false },
  { id: '2', title: '寫筆記', done: true },
];

/**
 * 讀出目前全部筆記，回傳模組裡的同一份陣列。
 * @returns {{ id: string, title: string, done: boolean }[]}
 */
export const listNotes = () => notes;

/**
 * 依 id 找一筆。找不到時回傳 null。
 * @param {string} id
 * @returns {{ id: string, title: string, done: boolean } | null}
 */
export const getNote = (id) => notes.find((item) => item.id === id) ?? null;

/**
 * 依 id 更新標題。找到時回傳更新後的那一筆，沒有這筆時回傳 null。
 * @param {string} id
 * @param {string} title
 * @returns {{ id: string, title: string, done: boolean } | null}
 */
export const updateNote = (id, title) => {
  const current = notes.find((item) => item.id === id);
  if (!current) return null;
  const note = { ...current, title };
  notes = notes.map((item) => (item.id === id ? note : item));
  return note;
};

/**
 * 新增一筆並放在最前面。id 用目前時間的毫秒數。
 * @param {string} title
 * @returns {{ id: string, title: string, done: boolean }}
 */
export const addNote = (title) => {
  const note = { id: String(Date.now()), title, done: false };
  notes = [note, ...notes];
  return note;
};

/**
 * 把指定 id 的 done 翻轉。沒有這筆時陣列內容不變。
 * @param {string} id
 * @returns {void}
 */
export const toggleNote = (id) => {
  notes = notes.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item,
  );
};

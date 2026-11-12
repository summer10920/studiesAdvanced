const itemsUrl = 'https://jsonplaceholder.typicode.com/posts';

const readJson = async (response) => {
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};

let itemsCache = null;

const readLocalItems = async (signal) => {
  if (!itemsCache) {
    const response = await fetch('/data/items.json', { signal });
    itemsCache = await readJson(response);
  }
  return itemsCache;
};

export const getItems = async (signal) => {
  const items = await readLocalItems(signal);
  return items.map((item) => ({ ...item }));
};

export const getItem = async (id) => {
  const response = await fetch(itemsUrl + '/' + id);
  return readJson(response);
};

export const createItem = async (item) => {
  const response = await fetch(itemsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return readJson(response);
};

export const updateItem = async (id, item) => {
  const items = await readLocalItems();
  const index = items.findIndex((row) => String(row.id) === String(id));
  if (index >= 0) {
    items[index] = { ...items[index], ...item, id: items[index].id };
  }
  const response = await fetch(itemsUrl + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return readJson(response);
};

export const deleteItem = async (id) => {
  const response = await fetch(itemsUrl + '/' + id, { method: 'DELETE' });
  if (!response.ok) throw new Error(String(response.status));
  return true;
};

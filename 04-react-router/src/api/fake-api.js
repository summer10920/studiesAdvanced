const itemsUrl = 'https://jsonplaceholder.typicode.com/posts';

const readJson = async (response) => {
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};

export const getItems = async (signal) => {
  const response = await fetch('/data/items.json', { signal });
  return readJson(response);
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

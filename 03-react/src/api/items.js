const posts = 'https://jsonplaceholder.typicode.com/posts';

const readJson = async (response) => {
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};

export const getLocalItems = async (signal) => {
  const response = await fetch('/data/items.json', { signal });
  return readJson(response);
};

export const getPost = async (id) => {
  const response = await fetch(posts + '/' + id);
  return readJson(response);
};

export const createPost = async (post) => {
  const response = await fetch(posts, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return readJson(response);
};

export const updatePost = async (id, post) => {
  const response = await fetch(posts + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return readJson(response);
};

export const deletePost = async (id) => {
  const response = await fetch(posts + '/' + id, { method: 'DELETE' });
  if (!response.ok) throw new Error(String(response.status));
  return true;
};

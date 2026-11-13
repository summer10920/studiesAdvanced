const root = document.documentElement;
const button = document.querySelector('#theme-toggle');
const stored = localStorage.getItem('theme');
const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.classList.toggle('dark', stored ? stored === 'dark' : preferDark);

const paint = () => {
  button.textContent = root.classList.contains('dark') ? '切換亮色' : '切換深色';
};

paint();
button.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  paint();
});

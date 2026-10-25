import './style.css';

const navToggle = document.querySelector('#nav-toggle');
const siteNav = document.querySelector('#site-nav');

navToggle?.addEventListener('click', () => {
  const closed = siteNav.classList.toggle('hidden');
  navToggle.setAttribute('aria-expanded', String(!closed));
});

siteNav?.addEventListener('click', (event) => {
  if (!event.target.closest('a') || navToggle?.offsetParent === null) return;
  siteNav.classList.add('hidden');
  navToggle.setAttribute('aria-expanded', 'false');
});

const tourFilter = document.querySelector('#tour-filter');

tourFilter?.addEventListener('submit', (event) => {
  event.preventDefault();
  const place = tourFilter.place.value;
  const days = tourFilter.days.value;
  const cards = [...document.querySelectorAll('[data-tour]')];
  cards.forEach((card) => {
    const miss = (place && card.dataset.place !== place) || (days && card.dataset.days !== days);
    card.classList.toggle('hidden', miss);
  });
  document.querySelector('#tour-empty')?.classList.toggle('hidden', cards.some((card) => !card.classList.contains('hidden')));
});

tourFilter?.addEventListener('reset', () => {
  document.querySelectorAll('[data-tour]').forEach((card) => card.classList.remove('hidden'));
  document.querySelector('#tour-empty')?.classList.add('hidden');
});

const bookingForm = document.querySelector('#booking-form');
const tourId = new URLSearchParams(location.search).get('tourId');
if (tourId && bookingForm?.tourId) bookingForm.tourId.value = tourId;

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#booking-status')?.classList.remove('hidden');
});

const adminForm = document.querySelector('#admin-form');
const adminTable = document.querySelector('#admin-table');
const adminMode = document.querySelector('#admin-mode');
const adminStatus = document.querySelector('#admin-status');
const cells = { title: (value) => value, place: (value) => value, days: (value) => `${value} 天`, price: (value) => `NT$${Number(value).toLocaleString('zh-Hant')}` };

const fillAdmin = (row) => {
  [...adminForm.elements].forEach((field) => {
    if (field.name) field.value = row.dataset[field.name] ?? '';
  });
  adminMode.textContent = '編輯行程';
  adminStatus.textContent = '';
};

adminTable?.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  const row = button?.closest('tr');
  if (!row) return;
  if (button.dataset.action === 'edit') fillAdmin(row);
  if (button.dataset.action === 'delete') {
    row.remove();
    adminStatus.textContent = '這一列已從畫面上拿掉。重新整理會回到設計稿。';
  }
});

document.querySelector('#admin-new')?.addEventListener('click', () => {
  [...adminForm.elements].forEach((field) => {
    if (field.name) field.value = '';
  });
  adminMode.textContent = '新增行程';
  adminStatus.textContent = '';
  adminForm.id.focus();
});

adminForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(adminForm));
  if (!data.id || !data.title) {
    adminStatus.textContent = '編號和名稱要先填，畫面才更新。';
    return;
  }
  const body = adminTable.tBodies[0];
  let row = [...body.rows].find((item) => item.dataset.id === data.id);
  if (!row) {
    if (!body.rows.length) {
      adminStatus.textContent = '表格已經空了。重新整理再新增。';
      return;
    }
    row = body.rows[0].cloneNode(true);
    body.append(row);
  }
  Object.entries(data).forEach(([key, value]) => {
    row.dataset[key] = value;
    const cell = row.querySelector(`[data-cell="${key}"]`);
    if (cell) cell.textContent = cells[key]?.(value) ?? value;
  });
  adminMode.textContent = '編輯行程';
  adminStatus.textContent = '畫面已更新。重新整理會回到設計稿，沒有寫進檔案。';
});

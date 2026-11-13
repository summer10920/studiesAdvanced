export const reviews = [
  {
    id: 'r1',
    tourId: 'hualien-taroko',
    author: '林可',
    rating: 5,
    body: '太魯閣沒有被排進行程表以外的停靠點。',
  },
  {
    id: 'r2',
    tourId: 'taipei-beitou',
    author: '陳予安',
    rating: 5,
    body: '迪化街走得很慢，嚮導沒有把我們推進店裡。',
  },
  {
    id: 'r3',
    tourId: 'kyoto-nara',
    author: '周以寧',
    rating: 4,
    body: '伏見只排了兩間酒造，下午自己走回到宿。',
  },
  {
    id: 'r4',
    tourId: 'taitung-chishang',
    author: '何品',
    rating: 5,
    body: '池上的田沒有被排成打卡點，成功漁港是傍晚去的。',
  },
];

export const reasons = [
  {
    title: '每團 8 人',
    body: '人數少，嚮導叫得出名字。不會把兩台車的人併成一團。',
  },
  {
    title: '一天不排滿',
    body: '下午沒有行程。景點之間不靠購物站填時間。',
  },
  { title: '住下來', body: '同一趟行程盡量不每天換飯店，行李不必每天收。' },
];

const shot = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const themeLinks = [
  {
    theme: '城市',
    places: '大稻埕、鹽埕',
    image: shot('1598935898639-81586f7d2129'),
  },
  {
    theme: '海岸',
    places: '北海岸、九份',
    image: shot('1507525428034-b723cf961d3e'),
  },
  {
    theme: '山海',
    places: '花蓮、台東',
    image: shot('1464822759023-fed622ff2c3b'),
  },
  {
    theme: '古都',
    places: '台南府城、安平',
    image: shot('1633228491597-b39f823e0541'),
  },
  {
    theme: '離島',
    places: '金門聚落',
    image: shot('1505118380757-91f5f5632de0'),
  },
  {
    theme: '日本',
    places: '京都、奈良',
    image: shot('1526481280693-3bfa7568e0f3'),
  },
];

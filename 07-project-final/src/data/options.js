export const regions = ['台北', '基隆', '花蓮', '台東', '台南', '高雄', '金門', '京都'];

export const themes = ['城市', '海岸', '山海', '古都', '離島', '日本'];

export const dayOptions = [2, 3, 4, 5];

export const priceBands = [
  { value: '', label: '不限' },
  { value: 'lt10000', label: '一萬以下' },
  { value: '10000-20000', label: '一到兩萬' },
  { value: '20000-30000', label: '二到三萬' },
  { value: 'gt30000', label: '三萬以上' },
];

export const sortOptions = [
  { value: 'price-asc', label: '價格低到高' },
  { value: 'price-desc', label: '價格高到低' },
  { value: 'days-asc', label: '天數短到長' },
];

const shot = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const themeLinks = [
  { theme: '城市', places: '大稻埕、鹽埕', image: shot('1598935898639-81586f7d2129') },
  { theme: '海岸', places: '北海岸、九份', image: shot('1507525428034-b723cf961d3e') },
  { theme: '山海', places: '花蓮、台東', image: shot('1464822759023-fed622ff2c3b') },
  { theme: '古都', places: '台南府城、安平', image: shot('1633228491597-b39f823e0541') },
  { theme: '離島', places: '金門聚落', image: shot('1505118380757-91f5f5632de0') },
  { theme: '日本', places: '京都、奈良', image: shot('1526481280693-3bfa7568e0f3') },
];

export const reasons = [
  { title: '每團 8 人', body: '人數少，嚮導叫得出名字。不會把兩台車的人併成一團。' },
  { title: '一天不排滿', body: '上午走路，下午留白。景點之間不靠購物站填時間。' },
  { title: '住下來', body: '同一趟行程盡量不每天換飯店，行李不必每天收。' },
];

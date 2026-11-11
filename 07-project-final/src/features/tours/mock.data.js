import { themeLinks } from '../home/mock.data.js';

const shot = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

const stay = (nights, ride, tickets) => [nights, ride, tickets];

export const tours = [
  {
    id: 'taipei-beitou',
    title: '台北大稻埕與北投溫泉三日',
    region: '台北',
    theme: '城市',
    days: 3,
    price: 18600,
    cover: shot('1519320993082-43a535317ddc'),
    images: [
      shot('1519320993082-43a535317ddc'),
      shot('1613954100945-fb1a8a1ee41f'),
      shot('1470004914212-05527e49370b'),
    ],
    intro: '第一天沿迪化街走到大稻埕碼頭，第二天北投泡湯，下午不排景點。',
    highlights: [
      '每團 8 人',
      '迪化街只走路，不進購物站',
      '兩晚都住北投，不換飯店',
    ],
    itinerary: [
      {
        day: 1,
        title: '大稻埕',
        body: '下午從迪化街走到大稻埕碼頭。晚上住北投。',
      },
      { day: 2, title: '北投', body: '上午泡湯，下午不排景點。' },
      { day: 3, title: '返程', body: '早餐後送到捷運站。' },
    ],
    includes: stay('2 晚住宿', '當地車資與司機嚮導', '行程表所列門票'),
    excludes: ['往返台北的交通', '午餐與個人消費'],
    departures: [
      { id: '2026-12-04', date: '2026-12-04', capacity: 8 },
      { id: '2027-02-19', date: '2027-02-19', capacity: 8 },
    ],
    featured: true,
  },
  {
    id: 'keelung-jiufen',
    title: '基隆北海岸與九份兩日',
    region: '基隆',
    theme: '海岸',
    days: 2,
    price: 9200,
    cover: shot('1606833505861-303ed278f7f2'),
    images: [
      shot('1606833505861-303ed278f7f2'),
      shot('1677628987592-c3ad2f546fef'),
      shot('1476673160081-cf065607f449'),
    ],
    intro:
      '第一天只走北海岸幾個灣澳，第二天九份排上午，下午自己決定要不要再爬階梯。',
    highlights: ['每團 8 人', '北海岸與九份分開兩天', '不住在九份老街裡'],
    itinerary: [
      { day: 1, title: '北海岸', body: '只停幾個灣澳，傍晚回到基隆住。' },
      {
        day: 2,
        title: '九份',
        body: '上午上九份。下午自己決定要不要再走，傍晚送車站。',
      },
    ],
    includes: stay('1 晚住宿', '當地車資與司機嚮導', '行程表所列門票'),
    excludes: ['往返基隆的交通', '午餐與個人消費'],
    departures: [
      { id: '2026-12-11', date: '2026-12-11', capacity: 8 },
      { id: '2027-03-05', date: '2027-03-05', capacity: 8 },
    ],
    featured: false,
  },
  {
    id: 'hualien-taroko',
    title: '花蓮太魯閣與七星潭四日',
    region: '花蓮',
    theme: '山海',
    days: 4,
    price: 26800,
    cover: shot('1604214896221-b13d964b214a'),
    images: [
      shot('1604214896221-b13d964b214a'),
      shot('1433086966358-54859d0ed716'),
      shot('1559827260-dc66d52bef19'),
    ],
    intro: '第一天沿七星潭走路，第二天進太魯閣只排燕子口與九曲洞，下午留白。',
    highlights: ['每團 8 人', '太魯閣一日只走兩個步道', '住壽豐，不每天換飯店'],
    itinerary: [
      {
        day: 1,
        title: '抵達花蓮',
        body: '下午到花蓮，走七星潭海岸步道。晚上住壽豐。',
      },
      {
        day: 2,
        title: '太魯閣',
        body: '燕子口、九曲洞，不進錐麓古道。下午留白。',
      },
      { day: 3, title: '壽豐與海岸', body: '上午在地市場，下午自由行動。' },
      { day: 4, title: '返程', body: '早餐後送往花蓮火車站。' },
    ],
    includes: ['3 晚住宿', '4 人座與司機嚮導', '行程表所列門票'],
    excludes: ['往返花蓮的交通', '午餐與個人消費'],
    departures: [
      { id: '2026-12-18', date: '2026-12-18', capacity: 8 },
      { id: '2027-03-12', date: '2027-03-12', capacity: 8 },
    ],
    featured: true,
  },
  {
    id: 'taitung-chishang',
    title: '台東池上與成功海岸三日',
    region: '台東',
    theme: '山海',
    days: 3,
    price: 21400,
    cover: shot('1761549849498-8cf23a31329d'),
    images: [
      shot('1761549849498-8cf23a31329d'),
      shot('1500382017468-9049fed747ef'),
      shot('1471922694854-ff1b63b20054'),
    ],
    intro:
      '第一天在池上騎一段田邊的路，第二天去成功看漁港，不把兩個地方排在同一天。',
    highlights: ['每團 8 人', '池上與成功分開兩天', '兩晚都住池上'],
    itinerary: [
      { day: 1, title: '池上', body: '下午騎一段田邊的路。晚上住池上。' },
      { day: 2, title: '成功', body: '傍晚去成功漁港，不把田和海排在同一天。' },
      { day: 3, title: '返程', body: '早餐後送往台東火車站。' },
    ],
    includes: stay('2 晚住宿', '當地車資與司機嚮導', '行程表所列門票與單車'),
    excludes: ['往返台東的交通', '午餐與個人消費'],
    departures: [
      { id: '2027-01-15', date: '2027-01-15', capacity: 8 },
      { id: '2027-04-02', date: '2027-04-02', capacity: 8 },
    ],
    featured: true,
  },
  {
    id: 'tainan-anping',
    title: '台南府城與安平兩日',
    region: '台南',
    theme: '古都',
    days: 2,
    price: 8800,
    cover: shot('1677607223752-aa6ae7e582ae'),
    images: [
      shot('1677607223752-aa6ae7e582ae'),
      shot('1528183429752-a97d0bf99b5a'),
      shot('1552465011-b4e21bf6e79a'),
    ],
    intro: '早上走孔廟與赤崁一帶，下午把時間留給安平，不把小吃排成路線。',
    highlights: ['每團 8 人', '小吃不排成路線', '一晚住府城'],
    itinerary: [
      { day: 1, title: '府城', body: '早上走孔廟與赤崁一帶。晚上住府城。' },
      { day: 2, title: '安平', body: '下午把時間留給安平，傍晚送車站。' },
    ],
    includes: stay('1 晚住宿', '當地車資與司機嚮導', '行程表所列門票'),
    excludes: ['往返台南的交通', '午餐、小吃與個人消費'],
    departures: [
      { id: '2026-11-28', date: '2026-11-28', capacity: 8 },
      { id: '2027-02-26', date: '2027-02-26', capacity: 8 },
    ],
    featured: false,
  },
  {
    id: 'kaohsiung-qijin',
    title: '高雄港都與旗津三日',
    region: '高雄',
    theme: '城市',
    days: 3,
    price: 14200,
    cover: shot('1496564203457-11bb12075d90'),
    images: [
      shot('1496564203457-11bb12075d90'),
      shot('1621848296279-7751546e9acc'),
      shot('1650039871209-8cbaa62f0821'),
    ],
    intro: '第一天只看駁二與哈瑪星，第二天渡輪去旗津走路，第三天早上再送車站。',
    highlights: ['每團 8 人', '駁二與旗津分開', '兩晚都住鹽埕'],
    itinerary: [
      { day: 1, title: '駁二與哈瑪星', body: '只看駁二與哈瑪星。晚上住鹽埕。' },
      { day: 2, title: '旗津', body: '渡輪去旗津走路，下午留白。' },
      { day: 3, title: '返程', body: '早上送車站。' },
    ],
    includes: stay('2 晚住宿', '當地車資、渡輪與司機嚮導', '行程表所列門票'),
    excludes: ['往返高雄的交通', '午餐與個人消費'],
    departures: [
      { id: '2027-01-08', date: '2027-01-08', capacity: 8 },
      { id: '2027-03-19', date: '2027-03-19', capacity: 8 },
    ],
    featured: false,
  },
  {
    id: 'kinmen-villages',
    title: '金門聚落與戰地三日',
    region: '金門',
    theme: '離島',
    days: 3,
    price: 16800,
    cover: shot('1593759057907-b3fd6244741b'),
    images: [
      shot('1593759057907-b3fd6244741b'),
      shot('1510414842594-a61c69b5ae57'),
      shot('1475924156734-496f6cac6ec1'),
    ],
    intro: '第一天金城與模範街，第二天只走一個聚落，戰地景點不連續排滿。',
    highlights: ['每團 8 人', '戰地景點不連續排滿', '兩晚都住金城'],
    itinerary: [
      { day: 1, title: '金城', body: '下午走模範街。晚上住金城。' },
      { day: 2, title: '一個聚落', body: '只走一個聚落，戰地景點不接著排。' },
      { day: 3, title: '返程', body: '早餐後送往機場。機票不含在團費。' },
    ],
    includes: stay('2 晚住宿', '島上車資與司機嚮導', '行程表所列門票'),
    excludes: ['往返金門的機票', '午餐與個人消費'],
    departures: [
      { id: '2027-01-22', date: '2027-01-22', capacity: 8 },
      { id: '2027-04-16', date: '2027-04-16', capacity: 8 },
    ],
    featured: false,
  },
  {
    id: 'kyoto-nara',
    title: '京都嵐山、伏見與奈良五日',
    region: '京都',
    theme: '日本',
    days: 5,
    price: 52800,
    cover: shot('1493976040374-85c8e12f0c0e'),
    images: [
      shot('1493976040374-85c8e12f0c0e'),
      shot('1478436127897-769e1b3f0f36'),
      shot('1632923754832-60642c12a7ed'),
    ],
    intro: '嵐山、伏見、奈良各一天，中間留一天在市內走。四晚不換飯店。',
    highlights: ['每團 8 人', '四晚不換飯店', '不含國際機票'],
    itinerary: [
      {
        day: 1,
        title: '抵達京都',
        body: '下午在飯店附近走路。四晚都住同一間。',
      },
      { day: 2, title: '嵐山', body: '嵐山走一天，傍晚回宿。' },
      { day: 3, title: '市內', body: '這天不排景點，自己走。' },
      { day: 4, title: '伏見', body: '只排兩間酒造，下午自己走回宿。' },
      {
        day: 5,
        title: '奈良與返程',
        body: '上午奈良，下午自行前往機場。國際機票不含。',
      },
    ],
    includes: ['4 晚住宿', '當地嚮導', '行程表列出的交通與門票'],
    excludes: ['國際機票', '新幹線以外你自己加的交通', '午餐與個人消費'],
    departures: [
      { id: '2027-04-06', date: '2027-04-06', capacity: 8 },
      { id: '2027-11-02', date: '2027-11-02', capacity: 8 },
    ],
    featured: true,
  },
];

export const regions = [
  '台北',
  '基隆',
  '花蓮',
  '台東',
  '台南',
  '高雄',
  '金門',
  '京都',
];

export const themes = themeLinks.map((item) => item.theme);

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

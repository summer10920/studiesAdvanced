// 全域變數宣告區
const
  fetchPath = 'db.json';

let
  nationalHoliday = [],
  pallet = {},
  booked = [];


// 初始化作業規劃
const init = () => {
  fetch('db.json').then(res => res.json()).then(json => {
    // console.log(json.booked);
    // booked = json.booked;
    // pallet = json.pallet;
    // nationalHoliday = json.nationalHoliday;
    ({ nationalHoliday, pallet, booked } = json);
    calendarService();
  });
  // console.log('api還沒回來所以空的', nationalHoliday);
}

// 執行初始化
init();

//正式跑服務
const calendarService = () => {
  let theDay = dayjs();

  const
    today = dayjs(),
    objL = {
      title: '左邊',
      listBox: '',
      thisDate: theDay
    },
    objR = {
      title: '右邊',
      listBox: '',
      thisDate: theDay.add(1, 'M')
    },
    listMaker = (obj) => { // 製造萬年曆，專門改寫title跟list，方便print直接拿去印
      // 將傳入obj 經過處理，寫好
      // obj.title = '七月 2023';
      // obj.listBox = '<li></li><li></li><li></li><li></li>';

      /* 如果第一天是禮拜幾 = > 前面有 ? 空格
      
      0~>7 => 6
      1 => 0
      2 => 1
      3 => 2
      ...
      6 => 5

      */

      const
        firstDay = obj.thisDate.date(1).day(),
        totalDay = obj.thisDate.daysInMonth();

      // if(firstDay==0) firstDay=7;
      // first =6 , for run 5 次
      for (let i = 1; i < (firstDay || 7); i++) // 空格
        obj.listBox += '<li class="JsCal"></li>';


      for (let i = 1; i <= totalDay; i++) { // 該月有多少天
        obj.listBox += `<li class="JsCal">${i}</li>`;
      }

      return obj;
    },
    listPrint = () => { // 列印輸出
      document.querySelector('.leftDayList').innerHTML = listMaker(objL).listBox;
      document.querySelector('.rightDayList').innerHTML = listMaker(objR).listBox;
      
      // console.log(loki.title, objL.title);
    };

  //執行列印
  listPrint();
}
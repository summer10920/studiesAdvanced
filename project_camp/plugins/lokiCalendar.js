// (function () {

// dayjs 初始化
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_isSameOrBefore);

//全域變數宣告區 - 任何的初始變數與套件宣告都放置於此
//-------------------------------------------------------------
let
  nationalHoliday = [],
  pallet = {},
  booked = [];



//初次執行項目 - 任何第一次執行的工作
//-------------------------------------------------------------
async function init() {
  const res = await fetch('./db.json', { method: 'GET' });
  const data = await res.json();
  // nationalHoliday = data.nationalHoliday;
  // pallet = data.pallet;
  // booked = data.booked;
  ({ nationalHoliday, pallet, booked } = data);

  const service = calenderService();  // 規劃成閉包，回傳一個物件方法
  service.print(); // 透過這個物件操作閉包內的方法去執行內部功能

  // 規劃左右 click 事件，去觸發日期改變，再算一次
  document.querySelector('a[href="#prevCtrl"]').addEventListener('click', (e) => {
    e.preventDefault();
    service.sub();
  });
  document.querySelector('a[href="#nextCtrl"]').addEventListener('click', (e) => {
    e.preventDefault();
    service.add();
  });
}

init(); // 擱置一下，待會等await觸發再回來處理


//服務的fn - 所有的方法都整理一起
//-------------------------------------------------------------
const calenderService = () => {
  let theDay = dayjs();

  const
    today = dayjs(),
    objL = {
      listBox: '',
      title: '',
      thisDate: theDay
    },
    objR = {
      listBox: '',
      title: '',
      thisDate: theDay.add(1, 'month')
    },
    changeMonth = (num) => {
      theDay = theDay.add(num, 'month');
      objL.thisDate = theDay;
      objR.thisDate = theDay.add(1, 'month');

      objL.listBox = '';
      objR.listBox = '';
      listPrint();
    },
    selectHandler = (node) => {
      // 負責處理使用者點擊可選日期的動作
      console.log(node.textContent);
    },
    listMaker = (obj) => {
      // 負責將指定的obj，利用obj.thisDate產生對應的listBox與title並覆蓋原本obj

      //1. 算出來第一天是星級幾 (週日0 ~ 週六6)，方便我們算出要塞多少空白日
      const firstDay = obj.thisDate.date(1).day();
      for (let i = 1; i < (firstDay || 7); i++) obj.listBox += '<li class="JsCal"></li>';

      //2. 算出來這個月總共有幾天
      const totalDays = obj.thisDate.daysInMonth(); // 31
      for (let i = 1; i <= totalDays; i++) {
        let className = 'JsCal';
        const theDayFormatStr = obj.thisDate.date(i).format('YYYY-MM-DD');  // ex: '2025-12-25'

        // 4-1. 先把i轉成dayjs物件，來判斷是不是早於today物件
        // ex: today.isSameOrBefore(tomorrow) ==> true
        if (obj.thisDate.date(i).isSameOrBefore(today)) className += ' delDay';
        else {
          className += ' selectDay';
          // 4-2. 反之，才去評估是否為考慮為假日費用
          /*
          method 1
          // const isHoliday = obj.thisDate.date(i).day() === 0 || obj.thisDate.date(i).day() === 6;
  
          method 2
          f = 0, isHoliday => (0,1)+7*n === i ===  0,1,7,8,14,15,21,22,28,29
          f = 1, isHoliday => (6,7)+7*n === i ===  6,7,13,14,20,21,27,28
          f = 2, isHoliday => (5,6)+7*n === i ===  5,6,12,13,19,20,26,27
          f = 3, isHoliday => (4,5)+7*n === i ===  4,5,11,12,18,19,25,26
          f = 4, isHoliday => (3,4)+7*n === i ===  3,4,10,11,17,18,24,25,31
          f = 5, isHoliday => (2,3)+7*n === i ===  2,3,9,10,16,17,23,24,30
          f = 6, isHoliday => (1,2)+7*n === i ===  1,2,8,9,15,16,22,23,29,30
  
          當i 從 1 ~ 31，根據 firstDay是多少，判斷是不是紅字
          (i+firstDay) 當被七除後的餘數為0 = 代表周六
          (i+firstDay) 當被七除後的餘數為1 = 代表周日
  
          另外:國定假日從 db.json 取得，透過 array.includes() 來判斷指定字串('YYYY-MM-DD') 是否存在於 nationalHoliday 陣列中
          */

          const isHoliday = (i + firstDay) % 7 < 2 || nationalHoliday.includes(theDayFormatStr);
          if (isHoliday) className += ' holiday';


          // 4-3. 再來分析一下當天是否客滿，透過 booked 陣列來判斷指定日的滿售情況
          const checkDateBooked = booked.find((item) => item.date === theDayFormatStr);

          // if (checkDateBooked) { //當天有人訂，但不確定是否客滿
          //   /*
          //   const sellTotal
          //     = checkDateBooked.sellout.aArea
          //     + checkDateBooked.sellout.bArea
          //     + checkDateBooked.sellout.cArea
          //     + checkDateBooked.sellout.dArea;
          //   if (pallet.count === sellTotal) className += ' fullDay';
          //   */

          //   const isFullDay = Object.values(checkDateBooked.sellout).reduce((acc, cur) => acc + cur, 0) === pallet.count;
          //   if (isFullDay) className += ' fullDay';
          // }
          if (checkDateBooked && Object.values(checkDateBooked.sellout).reduce((acc, cur) => acc + cur, 0) === pallet.count) className += ' fullDay';
        }


        obj.listBox += `<li class="${className}" data-date="${theDayFormatStr}">${i}</li>`;
      }

      //3. 更新標題包含月份年分
      obj.title = `${obj.thisDate.year()} ${dayjs.monthsShort()[obj.thisDate.month()]}`;

      return obj;

    },
    listPrint = () => {
      // 負責DOM操作，把產生的清單印到畫面上
      listMaker(objL);
      document.querySelector('.leftDayList').innerHTML = objL.listBox;
      document.querySelector('.leftBar>h4').innerHTML = objL.title;

      document.querySelector('.rightDayList').innerHTML = listMaker(objR).listBox;
      document.querySelector('.rightBar>h4').innerHTML = objR.title;

      document.querySelectorAll('.selectDay').forEach(node => {
        node.addEventListener('click', () => selectHandler(node));
      });


      // const loki = document.createElement('div');
      // loki.id = 'lokiDebug';
      // loki.innerHTML = `<strong>Debug Info:</strong>`;
      // // console.log(theDay);
      // loki.myDateObj = theDay;

      // document.querySelector('.calendar').appendChild(loki);

    }

  // function changeMonth(num) {
  //   console.log('changeMonth', num);
  // }


  return {
    print: () => listPrint(),
    add: () => {
      changeMonth(1);
      // will add 1 month
    },
    sub: () => {
      changeMonth(-1);
      // will sub 1 month
    }
  }
}

// })();
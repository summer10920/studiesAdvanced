dayjs.locale('zh-tw');
dayjs.extend(dayjs_plugin_isSameOrBefore);
dayjs.extend(dayjs_plugin_isBetween);

// 宣告全域變數區
let
  apiPath = './db.json',
  booked = [],
  nationalHoliday = [],
  pallet = {},
  myCalendar = null,
  tableData = { // 表格資料，到時候提供 tableMaker 輸出畫面，若要更新value，就對這裏修改
    totalPrice: 999, //總價格
    normalCount: 1, //平日幾晚
    holidayCount: 5, //價日幾晚
    pallet: { //營位資料 => 標題名稱、可賣數量、預約日金、小計、訂購數
      aArea: { title: '河畔 × A 區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      bArea: { title: '山間 × B 區', sellCount: 6, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      cArea: { title: '平原 × C 區', sellCount: 7, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      dArea: { title: '車屋 × D 區', sellCount: 8, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 }
    }
  };

// 初始化作業
const init = () => {
  // 安排工作打API
  fetch('./db.json', { method: 'GET' })
    .then(response => response.json())
    .then(json => {
      // booked = json.booked;
      // pallet = json.pallet;
      // nationalHoliday = json.nationalHoliday;
      ({ booked, pallet, nationalHoliday } = json);

      myCalendar = runCalendarService(); // 你創造一個服務原生函式，他提供一些method，像是 print, add, sub

      myCalendar.print(); // 對這個原生函式調用 print，產生DOM

      //規劃DOM事件
      document.querySelector('a[href="#nextCtrl"]').onclick = (e) => {  // 差，用HTML屬性 click 來綁定 JS 函式
        e.preventDefault();
        myCalendar.add();
      };
      document.querySelector('a[href="#prevCtrl"]').addEventListener('click', (e) => { // 優，用JS來規劃event
        e.preventDefault();
        myCalendar.sub();
      });

      myCalendar.tableRefresh();
    });

}

const runCalendarService = () => {
  // 宣告區，注意這裡變成只有service可以讀到的變數或fn，所以console.log不會印出
  let theDay = dayjs(); // 今天的時間物件，透過第三方套件獲取
  let
    calLeft = {
      title: '',
      listBox: '',
      thisDate: theDay, // 今天時間，當作當月的代表日 (time object)
    },
    calRight = {
      title: '',
      listBox: '',
      thisDate: theDay.add(1, 'month'), // 下個月時間，當作次月的代表日 (time object)
    };
  const
    today = dayjs(),
    userChooseDays = [null, null],
    changeMonth = (num) => { // 先歸零，重新計算該有的 title 跟 listBox
      theDay = theDay.add(num, 'M'); // 今天的時間物件，透過第三方套件獲取
      calLeft = {
        title: '',
        listBox: '',
        thisDate: theDay, // 改變該月份代表日
      };
      calRight = {
        title: '',
        listBox: '',
        thisDate: theDay.add(1, 'M'), // 改變下月份代表日，用大 M 等價 month
      };
    },
    chooseList = (node) => { // 負責將現有DOM規劃 selectHead, selectFoot, selectConnect
      // console.log(node.dataset.date);
      if (!userChooseDays[0] && !userChooseDays[1]) { // 情況一：[null,null]
        node.classList.add('selectHead');
        userChooseDays[0] = node;  // [1st,null]
      } else if (userChooseDays[0] && !userChooseDays[1]) { // 情況二：[1st,null]
        node.classList.add('selectFoot');
        userChooseDays[1] = node;  // [1st,2nd]

        // dayjs('2024-12-18').isSameOrBefore('2024-12-21') === true
        const sec2fst = dayjs(userChooseDays[1].dataset.date).isSameOrBefore(userChooseDays[0].dataset.date);
        if (sec2fst) {
          // 把1st跟2nd對調，回歸到正常選擇順序(className修正，陣列位置對調)
          userChooseDays[0].classList.replace('selectHead', 'selectFoot');
          userChooseDays[1].classList.replace('selectFoot', 'selectHead');

          [userChooseDays[0], userChooseDays[1]] = [userChooseDays[1], userChooseDays[0]]; // es6 解構技巧，做swap
        }

        // 補上 selectConnect，找到應該介於這兩天之內的日子
        document.querySelectorAll('li.selectDay').forEach(item => {
          // item 有沒有介於 userChooseDays[0] 跟 userChooseDays[1] 之間
          // dayjs("2024-12-20").isBetween("2024-12-01", "2024-12-31") === true;
          const isBetween = dayjs(item.dataset.date).isBetween(
            userChooseDays[0].dataset.date,
            userChooseDays[1].dataset.date
          );

          if (isBetween) item.classList.add('selectConnect');
        });

        tableMaker(); // user都選好了，開始整理新 table

      } else { // 情況三: [1st,2nd]

        userChooseDays[0].classList.remove('selectHead'); // 取消原本視覺 head
        node.classList.add('selectHead');
        userChooseDays[0] = node;  // [1st,null]

        userChooseDays[1].classList.remove('selectFoot'); // 取消原本視覺 foot
        userChooseDays[1] = null;  // [null,null]

        //取消原本 selectConnect
        document.querySelectorAll('li.selectConnect').forEach(item => item.classList.remove('selectConnect'));
      }
      // console.log(userChooseDays);
    },
    listMaker = (obj) => { // 調整萬年曆物件，調整完畢後，返回修改後的物件
      // const firstDay = obj.thisDate.date(1).day();
      const firstDay = obj.thisDate.startOf('month').day(); // 該月第一天禮拜幾
      const totalDay = obj.thisDate.daysInMonth(); // 該月有幾天

      // 1 = mon, 2 = tue, 3 = wed, 4 = thu, 5 = fri, 6 = sat, 0(7) = sun
      for (let i = 1; i < (firstDay || 7); i++) { // 控制產生多少空白日
        obj.listBox += `<li class="JsCal"></li>`;
      }

      for (let i = 1; i <= totalDay; i++) { // 控制產生多少日
        let classStr = 'JsCal'; // 將 class 獨立為一個變數，有必要可以追加 class name

        // 過期判定
        const tempDay = obj.thisDate.date(i);  // 每次回圈的數字轉換為當月指定日的time object.
        const tempDayStr = tempDay.format('YYYY-MM-DD'); // 將 time object 轉換為字串, ex: '2024-12-02'

        if (tempDay.isSameOrBefore(today)) classStr += ' delDay'; // 透過isSameOrBefore功能，該日跟今天比較，符合相同日或早於為 true，代表過期
        else { // 沒過期，才考慮追加以下class可能
          // 假日判定，包含六日或國定假日
          const isNationalHoliday = nationalHoliday.includes(tempDayStr);
          if (((firstDay + i) % 7 < 2) || isNationalHoliday) classStr += ' holiday';

          // 滿帳? 訂滿的日子為，某次迴圈下，例如目前為 2024-12-02，透過booked find比對有沒有找到 booked.date 跟 2024-12-02 一樣
          const checkBookObject = booked.find((bookObj) => bookObj.date === tempDayStr); // 找到就吐回來，沒找到會 undefined
          if (
            checkBookObject  // 當天有出現在booked 裡面
            && // 接著，同時
            (pallet.count === Object.values(checkBookObject.sellout).reduce((prv, cur) => prv + cur, 0)) // 總和等於總售出
          ) classStr += ' fullDay';

          // 可以選擇的日子 select Day
          classStr += ' selectDay';
        }

        obj.listBox += `<li class="${classStr}" data-date="${tempDayStr}">${i}</li>`;
      }

      // method 1
      // obj.title = `${obj.thisDate.year()}年 ${obj.thisDate.month() + 1}月`;

      // method 2
      // const monthToString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // obj.title = `${monthToString[obj.thisDate.month()]} ${obj.thisDate.year()}`;

      // method 3
      const twMonth = window.dayjs_locale_zh_tw.months;
      obj.title = `${twMonth[obj.thisDate.month()]} ${obj.thisDate.year()}`;

      return obj;
    },
    listPrint = () => { // 準備輸出到DOM
      // console.log(listMaker(calLeft).listBox);
      const newCalLeft = listMaker(calLeft); // 把乾淨的calc物件丟進去得到更新後的calc物件，拿來使用
      listMaker(calRight); // 也可不使用return obj 來操作DOM，因為 listMarker直接修改指定物件內容。所以原本的物件就被更新，也可以直接用原本obj變數來操作DOM

      document.querySelector('.leftDayList').innerHTML = newCalLeft.listBox;
      document.querySelector('.rightDayList').innerHTML = calRight.listBox; // 故意不用listMaker(calRight)返回的obj

      document.querySelector('.leftBar>h4').innerHTML = newCalLeft.title;
      document.querySelector('.rightBar>h4').innerHTML = calRight.title; // 故意不用listMaker(calRight)返回的obj

      // 畫面都更新後，考慮這些持有 selectDay 的日子，具備 Event 可以選擇
      document.querySelectorAll('.selectDay').forEach((item) => {
        item.onclick = () => myCalendar.choose(item);
      })
    },
    tableMaker = () => {
      console.log('整理 tableData');
      // tablePrint();
    },
    tablePrint = () => {
      document.querySelectorAll('#selectPallet select').forEach(nodeSelect => {
        const palletName = nodeSelect.name;

        //td > select > option 可賣數的下拉選單
        const countOption = tableData.pallet[palletName].sellCount
        let optStr = '';
        for (let i = 0; i <= countOption; i++)
          optStr += `<option value="${i}">${i}</option>`;
        nodeSelect.innerHTML = optStr;
        // if (countOption === 0) nodeSelect.disabled = true;
        nodeSelect.disabled = countOption === 0; // 針對count為0，直接 select 為 disabled

        // select < td ~ td(sellInfo位置)
        const tdSellInfo = nodeSelect.parentElement.previousElementSibling;
        tdSellInfo.innerHTML = tableData.pallet[palletName].sellInfo;

        // td(selectInfo) ~ td > label > span
        // max.previousElementSibling.children.item(1).children.item(0).innerHTML=99
        const tdRemain = tdSellInfo.previousElementSibling.querySelector('span');
        tdRemain.textContent = countOption;

        document.querySelector('#selectPallet h3').textContent = `
        $${tableData.totalPrice} / ${tableData.normalCount}晚平日，${tableData.holidayCount}晚假日
        `;

      });
    }

  // listPrint();
  return {
    print: () => listPrint(), // 外面的人可以控制 service 何時才要輸出萬年曆
    add: () => {
      changeMonth(1); // 改變 thisDate 月份
      listPrint(); // 在輸出一次
    },
    sub: () => {
      changeMonth(-1); // 改變 thisDate 月份
      listPrint(); // 在輸出一次
    },
    choose: item => {
      // 如果在某個詭異(head跟foot同一天)情況，忽略這次的動作
      // 詭異情況 => item.classList 持有 selectHead，以及當下的2nd還沒有選擇
      if (item.classList.contains('selectHead') && !userChooseDays[1]) return;
      chooseList(item);
      // 不再這個詭異情況可以做
      // if (!true) chooseList(item);
    },
    tableRefresh: () => tablePrint()
  };
}


init();
// console.log(today);

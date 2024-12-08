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
    totalPrice: 0, //總價格
    normalCount: 0, //平日幾晚
    holidayCount: 0, //價日幾晚
    pallet: { //營位資料 => 標題名稱、可賣數量、預約日金、小計、訂購數
      aArea: { title: '河畔 × A 區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      bArea: { title: '山間 × B 區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      cArea: { title: '平原 × C 區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      dArea: { title: '車屋 × D 區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 }
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

      document.querySelector('#selectPallet button').disabled = true;


      //規劃DOM事件
      document.querySelector('a[href="#nextCtrl"]').onclick = (e) => {  // 差，用HTML屬性 click 來綁定 JS 函式
        e.preventDefault();
        myCalendar.add();
      };
      document.querySelector('a[href="#prevCtrl"]').addEventListener('click', (e) => { // 優，用JS來規劃event
        e.preventDefault();
        myCalendar.sub();
      });

      const nodeSelects = document.querySelectorAll('select');  // 四個下拉選單 [改變選項]的事件
      nodeSelects.forEach(nodeSelect => { // 每個下拉選單個別發生事件時，都要重0計算總價
        nodeSelect.onchange = (e) => {
          tableData.totalPrice = 0;
          nodeSelects.forEach(item => { // 總價就是 當下畫面的4組相加 (下拉數量 * 小計 sumPrice)
            tableData.totalPrice += parseInt(item.value) * tableData.pallet[item.name].sumPrice;

            // 更新 tableData 的 四組 orderCount，方便下一步驟可以直接獲取當下的選擇情況(不用再 DOM去找 select value)。
            tableData.pallet[item.name].orderCount = parseInt(item.value);
          });

          // 事件最後，要更新畫面上的總價格，但不需要整個tablePrint(會大更新)，只需要更新html上面的小範圍就好
          document.querySelector('#selectPallet h3').textContent = `
            $${tableData.totalPrice} / ${tableData.normalCount}晚平日，${tableData.holidayCount}晚假日
          `;

          // 如果0元訂單，就不開放立即預約的按鈕
          document.querySelector('#selectPallet button').disabled = tableData.totalPrice === 0;
        }
      });

      document.querySelector('#selectPallet button').onclick = (e) => {   // 點擊[立即預約]的按鈕
        //將tableData 想辦法整理到彈窗html上，接著呼喊 orderOffcanvas 出現
        const orderOffcanvas = new bootstrap.Offcanvas('.offcanvas'); //左側談窗的bootstrap建構函式，可以操作動作
        const nodeOffcanvas = document.querySelector('#orderForm'); // 左側談窗的html元素
        let liStr = '';

        // 將 tableData 四組資料跑出來
        for (const key in tableData.pallet) {
          if (tableData.pallet[key].orderCount === 0) continue;

          // 如果走到這，代表有選擇1以上，接著我們整合到 liStr
          liStr += `
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">${tableData.pallet[key].title}</div>
                <div>
                  ${tableData.pallet[key].sellInfo}
                </div>
              </div>
              <span class="badge bg-warning rounded-pill">x <span class="fs-6">${tableData.pallet[key].orderCount}</span>帳</span>
            </li>
          `;
        }

        nodeOffcanvas.querySelector('ol').innerHTML = liStr;
        nodeOffcanvas.querySelector('.card-header.h5').textContent = document.querySelector('#selectPallet h3').textContent;
        orderOffcanvas.show();
      }

      // offcanvas [提交訂單]的事件
      // document.querySelector('#orderForm').onsubmit = (e) => {   // method 1
      document.forms.orderForm.onsubmit = (e) => {  // method 2
        e.preventDefault(); // 阻擋 html from 遇到 submit 會發生指向action動作，這時候要阻擋預設行為


        // 1. 客製化表單資料，除了原本form 3組，多手動加2組
        const sendData = new FormData(e.target);

        // 手動兩個表單欄位，擴增到此sendData。就不需要在html上面做隱藏欄位。
        // const selectDate = ["2024-12-11", "2024-12-12"];
        const selectDate = [...document.querySelectorAll('li.selectHead, li.selectConnect')].map(i => i.dataset.date);
        sendData.append('selectDate', JSON.stringify(selectDate)); // value 必須是一個JSON字串，html表單沒有object(array)這種值

        // ex: const sellout = { "aArea": 2, "bArea": 2, "cArea": 0, "dArea": 4 };  //目標產生這樣的JSON字串塞入FormData
        const sellout = {}; // 初始空陣列，慢慢塞回去
        // ['aArea', 'bArea', 'cArea', 'dArea'].forEach(key => { // method 1
        Object.keys(tableData.pallet).forEach(key => {  // method 2
          sellout[key] = tableData.pallet[key].orderCount
        })
        sendData.append('selectDate', JSON.stringify(sellout)); // value 必須是一個JSON字串，html表單沒有object這種值

        // 雖然透過console.log看不到formData內容，但可以用此方法檢查
        // for (const [key, value] of sendData) {
        //   console.log(key, value);
        // }

        // 2. 驗證表單有效性
        if (!e.target.checkValidity()) e.target.classList.add('was-validated'); // 使用 bootstrap 的驗證功能
        else {
          // 3. 送出表單
          fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: sendData,
            // body: JSON.stringify({ userName: 1, password: 2 }),
            // headers: { 'Content-Type': 'application/json' }
          }).then(response => response.json())
            .then(res => {
              if (res.id) {
                alert('感謝您的預約，您的訂單編號為:' + res.id);
                document.location.reload();
              }
            });
        }
      };


      // userName: 訪客姓名
      // userPhone: 聯絡手機
      // userMail: 123@123
      // selectDate: ["2024-12-11","2024-12-12"]
      // sellout: {"aArea":2,"bArea":2,"cArea":0,"dArea":4}



      myCalendar.tableRefresh(); // 網頁載入的第一次 tablePrint
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
    InitTableDataStr = JSON.stringify(tableData), // 轉為普通字串，脫離物件導向觀念
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
      // 負責翻新 全域變數的tableData
      tableData = JSON.parse(InitTableDataStr); // 利用字串轉物件，會整個產生一個新的物件，絕對跟原本的物件不一樣。

      //1. 修正 sellCount，先取得total總數，之後再根據訂單一個個減少
      for (const key in tableData.pallet) { // 獲得四組pallet名字，回頭對 tableData 修改 sellCount
        tableData.pallet[key].sellCount = pallet[key].total; // 10
      }

      //2. 去得知user 選啥 AB 日期
      document.querySelectorAll('li.selectHead, li.selectConnect').forEach(nodeLi => {
        // console.log(nodeLi.dataset.date); // 2024-12-13
        for (const key in tableData.pallet) { // 獲取四個 pallet 名字
          // const hasOrder = booked.find(bookItem => {
          //   return bookItem.date === nodeLi.dataset.date;
          // });
          const hasOrder = booked.find(bookItem => bookItem.date === nodeLi.dataset.date); // arrow fn is more faster

          // 2-1. 如果後端有找到當日的訂單，更新房況剩餘數
          if (hasOrder) {
            // 在連續的訂單日子，可以賣給客人的房數必須是這些剩餘房況的最小值
            tableData.pallet[key].sellCount = Math.min(tableData.pallet[key].sellCount, pallet[key].total - hasOrder.sellout[key]);
          }

          // 2-2.如果房況剩餘數的結論為:房況有剩，提供該key的 sellInfo 販售資訊 (日期 /每帳價格)；沒剩就顯示已售完
          if (tableData.pallet[key].sellCount) {
            // const dayPrice = nodeLi.classList.contains('holiday') ? pallet[key].holidayPrice : pallet[key].normalPrice; //method 1
            const dayPrice = pallet[key][nodeLi.classList.contains('holiday') ? 'holidayPrice' : 'normalPrice']; //method 2

            // console.log(nodeLi.dataset.date, dayPrice); // 日期
            tableData.pallet[key].sellInfo += `<div>${nodeLi.dataset.date} (${dayPrice})</div>`;
            tableData.pallet[key].sumPrice += dayPrice;
          } else {
            tableData.pallet[key].sellInfo = `<div>已售完</div>`;
            tableData.pallet[key].sumPrice = 0;
          }
        }

        // 2-3. 根據 user 選的日期，判斷有沒有class holiday，疊加假日或平日數量
        // nodeLi.classList.contains('holiday') ? tableData.holidayCount++ : tableData.normalCount++; //method 1
        tableData[nodeLi.classList.contains('holiday') ? 'holidayCount' : 'normalCount']++; //method 2
      });
      tablePrint(); // 因為user choose A B 日期，觸發的 tablePrint (這裡會對全域變數的 tableData 進行刷新畫面輸出)
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

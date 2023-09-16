//dayjs init
dayjs.locale('zh-tw');
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_isSameOrBefore); //宣告
dayjs.extend(dayjs_plugin_isBetween); //宣告

//全域變數宣告區
let
  fetchPath = 'db.json.php',
  nationalHoliday = [],
  booked = [],
  pallet = {},
  calendarCtrl = null,
  tableData = { //初始的表格資料
    totalPrice: 0, // 總價
    normalCount: 0, // 平日入住數
    holidayCount: 0, // 平日入住數
    pallet: { //營位資料 => 名稱、可賣數量、營位資訊、小計、訂購數
      aArea: { title: '河畔 × A區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      bArea: { title: '山間 × B區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      cArea: { title: '平原 × C區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      dArea: { title: '車屋 × D區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 }
    }
  };

//初次執行項目
const init = () => {
  fetch(fetchPath).then(response => response.json()).then(json => {
    ({ nationalHoliday, booked, pallet } = json);

    calendarCtrl = calendarService(); //calendarService提供一個函式物件
    calendarCtrl.print();

    document.querySelector('a[href="#nextCtrl"]').onclick = (event) => { //綁定event
      event.preventDefault();
      calendarCtrl.add();
    }
    document.querySelector('a[href="#prevCtrl"]').onclick = (event) => { //綁定event
      event.preventDefault();
      calendarCtrl.sub();
    }

    calendarCtrl.tableRefresh();


    const allSelect = document.querySelectorAll('form select'); //找到所有select
    allSelect.forEach(node => { //跑批次
      node.onchange = function () { //設定event，只要發生change就做以下事情
        tableData.totalPrice = 0; //總價歸0重新計算
        allSelect.forEach(item => { //對所有的select value與小計相乘疊加回總價去
          tableData.totalPrice += tableData.pallet[item.name].sumPrice * item.value
          tableData.pallet[item.name].orderCount = Number(item.value);//同時記住買了幾個營位數
        }
        );

        // 跑完迴圈後，將總價輸出到畫面上
        document.querySelector('form>h3').textContent = `$${tableData.totalPrice} / ${tableData.normalCount}晚平日，${tableData.holidayCount}晚假日`;
      }
    });

    const offcanvas = new bootstrap.Offcanvas(document.querySelector('.offcanvas'));
    document.querySelector('#selectPallet button').onclick = () => {
      liStr = '';
      for (const key in tableData.pallet) {
        if (tableData.pallet[key].orderCount == 0) continue;
        liStr += `
          <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">${tableData.pallet[key].title} </div>
                <div>
                  ${tableData.pallet[key].sellInfo}
                </div>
              </div>
              <span class="badge bg-warning rounded-pill">x <span class="fs-6">${tableData.pallet[key].orderCount}</span> 帳</span>
          </li>
        `;
      }

      document.querySelector('.offcanvas ol').innerHTML = liStr;
      document.querySelector('.offcanvas .card-header').textContent = document.querySelector('form>h3').textContent;
      document.querySelector('.offcanvas button[type="submit"]').disabled = !liStr;
      offcanvas.show();
    }

    document.forms.orderForm.onsubmit = function (event) {
      event.preventDefault();

      const sendData = new FormData(this);
      const selectDateAry = [...document.querySelectorAll('li.selectHead, li.selectConnect')].map(e => e.dataset.date);
      sendData.append('selectDate', JSON.stringify(selectDateAry));

      const sellout = {};
      Object.keys(tableData.pallet).forEach(key => sellout[key] = tableData.pallet[key].orderCount);
      sendData.append('sellout', JSON.stringify(sellout));

      // for (var pair of sendData.entries())
      //   console.log(pair[0] + ', ' + pair[1]);

      if (!this.checkValidity()) this.classList.add('was-validated');
      else {
        // fetch post
        // fetch('https://jsonplaceholder.typicode.com/posts', {
        fetch('/function?do=newOrder', {
          method: 'POST',
          body: sendData,
          // headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then((res) => res.json()).then((data) => {
            if (data) {
              alert('感謝您的預約！期待見面');
              // document.location.href = '/';
            }
          })
      }
    };
  });
}

//執行
init();

//Service
const calendarService = () => {
  let
    theDay = dayjs(),
    today = dayjs(),
    objL = {    //改成let
      listBox: '',
      title: '',
      thisDate: theDay,
    },
    objR = {    //同理
      listBox: '',
      title: '',
      thisDate: theDay.add(1, 'M'),
    };

  const
    chooseDays = [null, null], // 初始已選陣列
    defaultTableDataStr = JSON.stringify(tableData), //深層複製，純資料可行。
    changeMonth = count => {
      theDay = theDay.add(count, 'M');
      objL = {  //obj回到乾淨狀態下，使得listMaker可以重新賦予
        listBox: '',
        title: '',
        thisDate: theDay,
      };
      objR = {  //同理
        listBox: '',
        title: '',
        thisDate: theDay.add(1, 'month'),
      };
    },
    listMaker = obj => {
      const
        firstDay = obj.thisDate.date(1).day(),
        totalDay = obj.thisDate.daysInMonth();

      for (let i = 1; i < (firstDay || 7); i++) {
        obj.listBox += `<li class="JsCal"></li>`;
      }

      for (let i = 1; i <= totalDay; i++) {
        let classStr = 'JsCal';
        const dateStr = obj.thisDate.date(i).format('YYYY-MM-DD'); //搬移時機，使得listBox可以使用

        if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期
        else {
          if ((i + firstDay) % 7 < 2 || nationalHoliday.includes(dateStr)) classStr += ' holiday'; //是否周末或國定日

          const checkDay = booked.find(item => item.date == dateStr);
          if (checkDay && !(pallet.count - Object.values(checkDay.sellout).reduce((preVal, num) => preVal + num, 0))) //滿帳
            classStr += ' fullDay';

          classStr += ' selectDay';
        }
        obj.listBox += `<li class="${classStr}" data-date="${dateStr}">${i}</li>`;
      }

      obj.title = `${dayjs.months()[obj.thisDate.month()]} ${obj.thisDate.year()}`;
      return obj;
    },
    listPrint = () => {
      document.querySelector('.leftDayList').innerHTML = listMaker(objL).listBox;
      document.querySelector('.rightDayList').innerHTML = listMaker(objR).listBox;

      //替換文字
      document.querySelector('.leftBar>h4').textContent = objL.title;
      document.querySelector('.rightBar>h4').textContent = objR.title;

      //賦予selectDay可點擊，
      document.querySelectorAll('.selectDay').forEach((item) => {
        item.onclick = () => calendarCtrl.choose(item); // 每次點選將執行給該函式並傳送 item 自己
      })
    },
    chooseList = item => {
      // console.log(item);
      if (!chooseDays[0] && !chooseDays[1]) { //[null,null] => first click
        chooseDays[0] = item; //存入
        chooseDays[0].classList.add('selectHead');
      } else if (chooseDays[0] && !chooseDays[1]) {  //[item,null]=> second click
        chooseDays[1] = item; //存入

        const foot2head = dayjs(item.dataset.date).isSameOrBefore(dayjs(chooseDays[0].dataset.date)); //目前item是否早於先前點的日子，代表foot->head
        if (foot2head) {
          chooseDays[0].classList.replace('selectHead', 'selectFoot');
          chooseDays[1].classList.add('selectHead');
          [chooseDays[0], chooseDays[1]] = [chooseDays[1], chooseDays[0]];
        } else chooseDays[1].classList.add('selectFoot');

        //add selectConnect between head and foot
        document.querySelectorAll('li.selectDay').forEach(item => {
          if (dayjs(item.dataset.date).isBetween(chooseDays[0].dataset.date, chooseDays[1].dataset.date))
            item.classList.add('selectConnect');
        });

        tableMaker();

      } else { //[item,item] => third click
        document.querySelectorAll('li.selectConnect').forEach(
          item => item.classList.remove('selectConnect')
        );

        chooseDays[0].classList.remove('selectHead');
        chooseDays[1].classList.remove('selectFoot');
        chooseDays[1] = null;

        chooseDays[0] = item;
        chooseDays[0].classList.add('selectHead');
      }
    },
    tableMaker = () => {
      tableData = JSON.parse(defaultTableDataStr); //將字串轉為物件存入，此時物件會整個翻新包含記憶體位置也會與先前的不同
      for (const key in tableData.pallet) //取得 key=[a ~ d]Area
        tableData.pallet[key].sellCount = pallet[key].total; //將數量改回原總數，隨減去已賣數，剩餘就是可售數

      document.querySelectorAll('li.selectHead, li.selectConnect').forEach(node => { //尋找欲入住當晚的日子，不含離營日

        for (const key in tableData.pallet) { //每一個入住日都要檢查該日期是否出現在後端給的booked內

          const hasOrder = booked.find(item => item.date == node.dataset.date);
          if (hasOrder)
            //N天只要找最低可售數就好，因此原總數減去booked的某日已售，就是sellCount剩餘數，而與目前剩餘數取小再回存sellCount。
            tableData.pallet[key].sellCount = Math.min(tableData.pallet[key].sellCount, pallet[key].total - hasOrder.sellout[key]);

          //如果可售數不是0，我們才有要顯示更多細節可以賣。只要沒房就不需要賣給客人了(顯示販售資訊)。
          if (tableData.pallet[key].sellCount) { //該日該營位若可售

            // 確認當日哪種日子價格，小計到tableData，並塞入販售價格資訊。
            const dayPrice = pallet[key][node.classList.contains('holiday') ? 'holidayPrice' : 'normalPrice'];
            tableData.pallet[key].sumPrice += Number(dayPrice);
            tableData.pallet[key].sellInfo += `<div>${node.dataset.date}(${dayPrice})</div>`;
          }
        }

        tableData[node.classList.contains('holiday') ? 'holidayCount' : 'normalCount']++;
      });
      tablePrint();
    },
    tablePrint = () => {
      document.querySelectorAll('form select').forEach(node => {
        const palletName = node.name; //ex: aArea

        //td>select>option 可賣數量
        const count = tableData.pallet[palletName].sellCount; //option 數量
        let optionStr = '';
        for (let i = 0; i <= count; i++) optionStr += `<option value="${i}">${i}</option>`;
        node.innerHTML = optionStr;
        node.disabled = !count; //如果為0，禁用此

        //td>div 預約日金 
        const palletInfo = node.parentElement.previousElementSibling; //select=>上層=>前一格=td
        palletInfo.innerHTML = count == 0 ? '' : tableData.pallet[palletName].sellInfo; // 如果是0，div也可不要輸出了

        //td>label>剩餘span組 
        palletInfo.previousElementSibling.children.item(1).children.item(0).textContent = count;
      });

      //h3 文字
      document.querySelector('form>h3').textContent = `$0 / ${tableData.normalCount}晚平日，${tableData.holidayCount}晚假日`;
    };

  return {
    print: () => listPrint(),
    add: () => { //如果add，就是要求增加一個月，使得theDay可以 + 1。再進行 listPrint
      changeMonth(1);
      listPrint();
    },
    sub: () => {
      changeMonth(-1); //同理
      listPrint();
    },
    choose: item => {
      if (item.classList.contains('selectHead') && !chooseDays[1]) return;
      chooseList(item); //轉提供
    },
    tableRefresh: () => tablePrint()
  }
}
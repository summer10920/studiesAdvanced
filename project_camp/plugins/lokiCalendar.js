// (function () {

// dayjs 初始化
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_isSameOrBefore);
dayjs.extend(dayjs_plugin_isBetween);

//全域變數宣告區 - 任何的初始變數與套件宣告都放置於此
//-------------------------------------------------------------
let
  nationalHoliday = [],
  pallet = {},
  booked = [],
  tableData = {
    // 訂房的表格資料
    totalPrice: 0,
    normalCount: 0,
    holidayCount: 0,
    pallet: {
      aArea: { title: '河畔 × A 區', storeCount: 10, sellInfo: '', sumPrice: 0, orderCount: 0 },
      bArea: { title: '山間 × B 區', storeCount: 10, sellInfo: '', sumPrice: 0, orderCount: 0 },
      cArea: { title: '平原 × C 區', storeCount: 10, sellInfo: '', sumPrice: 0, orderCount: 0 },
      dArea: { title: '車屋 × D 區', storeCount: 10, sellInfo: '', sumPrice: 0, orderCount: 0 }
    }
  };



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

  // 左半部的萬年曆
  // ------------------------------------------------------------
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

  //右半部的表格清單
  // ------------------------------------------------------------
  service.tableRefresh();

  //規劃USER互動事件 - 選擇帳數時候
  // ------------------------------------------------------------
  const allSelect = document.querySelectorAll('form select');

  // 當任何的SELECT改變時
  document.querySelector('#selectPallet button').disabled = true; // 預設按鈕為不可點
  allSelect.forEach(select => {
    select.addEventListener('change', () => {
      // console.log(tableData.pallet);
      tableData.totalPrice = 0;

      // 試圖再從四個SELECT抓出VALUE跟當下的小計相乘後加入總計totalPrice，也記錄orderCount
      allSelect.forEach(s => {
        // console.log(parseInt(s.value), tableData.pallet[s.name].sumPrice);
        const orderCount = parseInt(s.value);
        tableData.totalPrice += orderCount * tableData.pallet[s.name].sumPrice;
        tableData.pallet[s.name].orderCount = orderCount;
      });

      //最後，隨著使用者每次的變化，將最新的總計更新到畫面上
      const { totalPrice, normalCount, holidayCount } = tableData;
      document.querySelector('form h3').textContent = `$${totalPrice} / ${normalCount}晚平日，${holidayCount}晚假日`;

      // 如果價格是0，不給預約
      document.querySelector('#selectPallet button').disabled = !totalPrice;
    });
  });


  // 規劃 offcanvas 的開關(按下預約按鈕時)
  // ------------------------------------------------------------
  const bookingCanvas = new bootstrap.Offcanvas('.offcanvas');
  document.querySelector('#selectPallet button').addEventListener('click', () => {
    // 刷新預約單的資訊(ol>li*有預定的營位)
    let liStr = '';
    for (const key in tableData.pallet) {
      const { title, sellInfo, orderCount } = tableData.pallet[key];
      if (!orderCount) continue; //跳過沒有訂的營位

      liStr += `
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">${title}</div>
          <div>${sellInfo}</div>
        </div>
        <span class="badge bg-warning rounded-pill">x <span class="fs-6">${orderCount}</span>帳</span>
      </li>`;
    }

    document.querySelector('.offcanvas .h5').textContent = document.querySelector('form h3').textContent;
    document.querySelector('.offcanvas ol').innerHTML = liStr;
    bookingCanvas.show();
  })

  // 規劃預約表單送出事件
  // ------------------------------------------------------------
  document.forms.orderForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // 將瀏覽器預定的轉向提交行為取消，我們要自己設計提交做法

    // 先檢查USER 表單資料驗證輸入
    if (!e.target.checkValidity()) {
      e.target.classList.add('was-validated');
      return;
    }

    // 通過驗證，準備要送出表單資料
    e.target.classList.remove('was-validated');
    const formData = new FormData(e.target);

    // 根據伺服器要求，提供入住日 YYYY-MM-DD 陣列 ex:
    // "selectDate":["2022-12-07","2022-12-08"],
    // 手動的產生符合格式的陣列，加入表單資料內
    const [startDate, endDate] = service.getChooseDates();
    const dateList = [];
    for (let i = startDate; i.isBefore(endDate, 'day'); i = i.add(1, 'day')) {
      dateList.push(i.format('YYYY-MM-DD'));
    }

    formData.append('selectDate', JSON.stringify(dateList));

    // 根據伺服器要求，提供四個營位下單數量 ex:
    // "sellout":{"aArea":0,"bArea":0,"cArea":4,"dArea":0},
    // 手動的產生符合格式的物件，加入表單資料內
    const { aArea, bArea, cArea, dArea } = tableData.pallet;
    formData.append('sellout', JSON.stringify({
      aArea: aArea.orderCount,
      bArea: bArea.orderCount,
      cArea: cArea.orderCount,
      dArea: dArea.orderCount,
    }));

    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', body: formData,
      });

      // console.log(res);
      if (!res.ok) throw new Error('送出訂單失敗');

      const { id } = await res.json();
      if (id) {
        alert(`感謝您的預約！您的預約單號為 No.${id}，期待見面`);
        document.location.href = '/';
      }
    } catch (err) {
      console.error('送出訂單失敗：', err);
      alert('系統發生錯誤，請稍後再試');
    }
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
    chooseDates = [null, null],
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
      switch (true) {
        case !chooseDates[0] && !chooseDates[1]:
          // 當前沒有選擇任何日期 => [null, null] => first click => to [date, null]
          chooseDates[0] = node;
          node.classList.add('selectHead');
          break;

        case chooseDates[0] && !chooseDates[1]:
          // 先檢查當下第一格日期是否和點擊的日期是否相同，成立就不要做任何事情，直接 return
          if (chooseDates[0] === node) return;

          // 當下只有選第一個日期 => [date, null] => second click => to [date,date]
          chooseDates[1] = node;

          // 如果第二日期比第一個日期還早，除了交換兩日還要調整 class
          if (dayjs(chooseDates[0].dataset.date).isAfter(dayjs(chooseDates[1].dataset.date))) {
            chooseDates[0].classList.replace('selectHead', 'selectFoot');
            chooseDates[1].classList.add('selectHead');
            [chooseDates[0], chooseDates[1]] = [chooseDates[1], chooseDates[0]];

          } else node.classList.add('selectFoot');

          // 此時[date,date]，要算中間的 selectConnect
          document.querySelectorAll('.selectDay').forEach(n => dayjs(n.dataset.date).isBetween(chooseDates[0].dataset.date, chooseDates[1].dataset.date) && n.classList.add('selectConnect'));

          tableMarker();
          break;

        default:
          // 都有日期 => [date, date] => third click => to [newDate, null]
          chooseDates[0].classList.remove('selectHead');
          chooseDates[1].classList.remove('selectFoot');
          // remove selectConnect
          document.querySelectorAll('.selectConnect').forEach(node => {
            node.classList.remove('selectConnect');
          });

          chooseDates[0] = node;
          chooseDates[1] = null;
          node.classList.add('selectHead');
          break;
      }

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

        // 試圖從chooseDates 補上該有的 selectHead, selectFoot, selectConnect class
        const [startDateStr, endDateStr] = chooseDates.map(item => item?.dataset.date);
        const curDateStr = node.dataset.date;

        if (startDateStr && endDateStr && dayjs(curDateStr).isBetween(startDateStr, endDateStr))
          node.classList.add('selectConnect');
        if (startDateStr === curDateStr) {
          // 由於原本的html因為重新生成，舊的node已經不存在了，所以要重新將新的node塞回去，才能讓selectHandler動作可以執行 remove className
          chooseDates[0] = node;
          node.classList.add('selectHead');
        }
        if (endDateStr === curDateStr) {
          // 同理由塞回去
          chooseDates[1] = node;
          node.classList.add('selectFoot');
        }
      });


      console.log(chooseDates);
    },
    tableMarker = () => {
      // 初始化 tableData 預設的可賣情況
      tableData.normalCount = 0;
      tableData.holidayCount = 0;
      for (const key in tableData.pallet) {
        tableData.pallet[key].storeCount = pallet[key].total; // 將db.json 中的各營位總數初始化到最大可賣數
        tableData.pallet[key].sellInfo = '';
        tableData.pallet[key].sumPrice = 0;
      }
      const [startDate, endDate] = chooseDates.map(item => dayjs(item.dataset.date));
      let current = startDate;
      while (current.isBefore(endDate, 'day')) { // 根據選定的範圍抽批次取出YYYY-MM-DD值
        const curFormat = current.format('YYYY-MM-DD');
        // const isHoliday = current.day() === 0 || current.day() === 6 || nationalHoliday.includes(curFormat);
        const isHoliday = (current.day() + 1) % 7 < 2 || nationalHoliday.includes(curFormat);
        for (const key in tableData.pallet) {  // key=aArea, bArea, cArea, dArea
          const hasOrder = booked.find(item => item.date === curFormat); //資料庫若有訂單，試圖更新該營位的可賣數
          if (hasOrder) {
            //可賣數更新:當天的該營位剩餘可賣數 = 該營位總數 - 當日該營位已賣數
            const currentStoreCount = pallet[key].total - hasOrder.sellout[key];
            tableData.pallet[key].storeCount = Math.min(tableData.pallet[key].storeCount, currentStoreCount);
          }
          // 若有可售數，那就更新可賣資訊
          if (tableData.pallet[key].storeCount) {
            const price = isHoliday ? pallet[key].holidayPrice : pallet[key].normalPrice;
            tableData.pallet[key].sellInfo += `<div>${curFormat}(${price})</div>`;
            tableData.pallet[key].sumPrice += price;
          }
        }
        isHoliday ? tableData.holidayCount++ : tableData.normalCount++;
        current = current.add(1, 'day');
      }
      tablePrint();
    },
    tablePrint = () => {
      document.querySelectorAll('form select').forEach(select => { // 批次處理四種營位資訊
        const { storeCount, sellInfo } = tableData.pallet[select.name]; // 透過名稱找到指定物件並解構

        // 產生 option
        let optionsList = '';
        for (let i = 0; i <= storeCount; i++) optionsList += `<option value="${i}">${i}</option>`;
        select.innerHTML = optionsList;
        select.disabled = !storeCount;

        // 更新DIV資訊
        const palletInfoDiv = select.parentElement.previousElementSibling;
        palletInfoDiv.innerHTML = storeCount ? sellInfo : '';

        // 更新庫存數
        palletInfoDiv.previousElementSibling.querySelector('span').textContent = storeCount;
      });

      const { totalPrice, normalCount, holidayCount } = tableData;
      document.querySelector('form h3').textContent = `$${totalPrice} / ${normalCount}晚平日，${holidayCount}晚假日`;
    };

  return {
    print: () => listPrint(),
    add: () => {
      changeMonth(1);
      // will add 1 month
    },
    sub: () => {
      changeMonth(-1);
      // will sub 1 month
    },
    tableRefresh: () => tablePrint(),
    getChooseDates: () => chooseDates.map(item => dayjs(item.dataset.date))
  }
}

// })();
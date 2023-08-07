dayjs.locale('zh-tw'); //指定lang
dayjs.extend(dayjs_plugin_localeData); // plugin 擴展給 dayjs
dayjs.extend(dayjs_plugin_isSameOrBefore); // plugin 擴展給 dayjs
dayjs.extend(dayjs_plugin_isBetween); // plugin 擴展給 dayjs

// 全域變數宣告區
const
  fetchPath = 'db.json';

let
  nationalHoliday = [],
  pallet = {},
  booked = [],
  calendarCtrl = null;


// 初始化作業規劃
const init = () => {
  fetch('db.json').then(res => res.json()).then(json => {
    // console.log(json.booked);
    // booked = json.booked;
    // pallet = json.pallet;
    // nationalHoliday = json.nationalHoliday;
    ({ nationalHoliday, pallet, booked } = json);
    // calendarService();
    calendarCtrl = calendarService();
    calendarCtrl.print();

    document.querySelector('a[href="#prevCtrl"]').onclick = event => {
      event.preventDefault();
      calendarCtrl.sub();
    };
    document.querySelector('a[href="#nextCtrl"]').addEventListener('click', event => {
      event.preventDefault();
      calendarCtrl.add();
    });

  });
  // console.log('api還沒回來所以空的', nationalHoliday);
}

// 執行初始化
init();

//正式跑服務
const calendarService = () => {
  // Service 內的區間變數
  let
    theDay = dayjs(),
    objL = {
      title: '',
      listBox: '',
      thisDate: theDay
    },
    objR = {
      title: '',
      listBox: '',
      thisDate: theDay.add(1, 'M')
    };

  const
    today = dayjs(),
    /*****
     * 評估select n次 => chooseDays [checkIn,checkOut] => 第幾次 select
     * [null,null] => 第一次 select => [1st,null]
     * [1st,null] => 第二次 select => [1st,2nd]
     * [2nd,null] => 第二次 select is checkIn => [2nd,1st] => [1st,2nd]
     * [1st,2nd] => 第三次 select, reset => [null,null] => [3rd==>new 1st,null]
     */
    chooseDays = [null, null],
    changeMonth = (count) => {
      /***
       * 根據1或-1，調整區間變數theDay，因為dayJS特性只會clone，所以自己覆蓋回去。
       * // console.log(theDay.add(count, 'M'));
       * // console.log(theDay);
       */
      theDay = theDay.add(count, 'M'); // 已翻新時間物件
      objL = {
        title: '',
        listBox: '',
        thisDate: theDay
      };
      objR = {
        title: '',
        listBox: '',
        thisDate: theDay.add(1, 'M')
      };
    },
    chooseList = (item) => {
      // if (item.classList.contains('selectHead')) return;
      // console.log(item.dataset.date);
      // console.log(chooseDays);
      if (!chooseDays[0] && !chooseDays[1]) { //第一次select === [null,null]
        chooseDays[0] = item;
        item.classList.add('selectHead');
      } else if (chooseDays[0] && !chooseDays[1]) { // 第二次 select === [!null,null]
        chooseDays[1] = item;

        const needSwap = dayjs(item.dataset.date).isSameOrBefore(chooseDays[0].dataset.date);
        if (needSwap) { //反了嗎?
          chooseDays[0].classList.replace('selectHead', 'selectFoot');
          chooseDays[1].classList.add('selectHead');
          // const big = chooseDays[0];
          // chooseDays[0] = chooseDays[1];
          // chooseDays[1] = big;
          [chooseDays[0], chooseDays[1]] = [chooseDays[1], chooseDays[0]];
        } else {
          item.classList.add('selectFoot');
        }
        /*****
         *  此時畫面上已經畫出頭尾了，我們要加身體
        ******/
        document.querySelectorAll('li.selectDay').forEach(item => {
          if (item.dataset.date, dayjs(item.dataset.date).isBetween(chooseDays[0].dataset.date, chooseDays[1].dataset.date))
            item.classList.add('selectConnect');
        });

      } else { // 第三次select === [!null,!null] => [!null,null] 
        chooseDays[0].classList.remove('selectHead');
        chooseDays[1].classList.remove('selectFoot');
        document.querySelectorAll('li.selectConnect').forEach(item => item.classList.remove('selectConnect'));

        chooseDays[0] = item;
        item.classList.add('selectHead');
        chooseDays[1] = null;
      }
    },
    listMaker = (obj) => { // 製造萬年曆，專門改寫title跟list，方便print直接拿去印
      {/*******
      將傳入obj 經過處理，寫好
      obj.title = '七月 2023';
      obj.listBox = '<li></li><li></li><li></li><li></li>';

      如果第一天是禮拜幾 = > 前面有 ? 空格
      
      0~>7 => 6
      1 => 0
      2 => 1
      3 => 2
      ...
      6 => 5

    */}

      const
        firstDay = obj.thisDate.date(1).day(),
        totalDay = obj.thisDate.daysInMonth();

      // if(firstDay==0) firstDay=7;
      // first =6 , for run 5 次
      for (let i = 1; i < (firstDay || 7); i++) // 空格
        obj.listBox += '<li class="JsCal"></li>';


      for (let i = 1; i <= totalDay; i++) { // 該月有多少天
        let classStr = 'JsCal';
        const dateStr = obj.thisDate.date(i).format('YYYY-MM-DD');

        {/***********
        * 將i換成時間物件，利用isSameOrBefore去判斷比today早會是布林 true
        * console.log(obj.thisDate.date(i));
        // console.log(obj.thisDate.date(i).isSameOrBefore(today));
        */}

        if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期日 delDay
        else { // 沒過期
          classStr += ' selectDay'; //沒過期可以選，不管有無客滿都讓他選(可能退房日或跨日，很難顧及)，之後再來處理給不給訂。

          {/******
           * 方式一，轉為時間物件詢問周幾來判斷
           * console.log(obj.thisDate.date(i).day(),`=>${i}號`);
           * 
           * 方式二，推理i值判斷
           * 是否為假日=> 每月1號是禮拜幾(index) 推理出該月的哪些i值會是假日
           * 1號 = 週日(0)，i=0,1,7,8,..... is holiday
           * 1號 = 週一(1)，i=6,7,13,14,..... is holiday
           * 1號 = 週二(2)，i=5,6,12,13,..... is holiday
           * 1號 = 週五(5)，i=2,3,9,10,..... is holiday
           * 1號 = 週六(6)，i=6,7,13,14,..... is holiday

           * 1號 = 某週(x)，(x+(i=1~31) => 0,1,7,8,14,15..... is holiday
           * x=2  => (2+5),(2+6),(2+12),(2+13) => 7,8,14,15....
           * x=3  => (3+4),(3+5),(3+11),(3+12) => 7,8,14,15....
           * 
           * 1號 = 某週(x)，(x+(i=?)=>除7之餘數 0,1 ..... is holiday
           * (firstDay + i)%7<2 ? 'holiday':'normalDay'
           * 
           * console.log(`第一天是周${firstDay}，i=${i}號，經過計算餘數為${(i+firstDay)%7}`,(i+firstDay)%7<2);
           * if ((firstDay + i) % 7 < 2) classStr += ' holiday';

           * 增加判斷國定假日，從全域變數之陣列如果存在某日就是holiday
        */}
          if ((firstDay + i) % 7 < 2 || nationalHoliday.includes(dateStr)) classStr += ' holiday';


          // 售完 fullDay
          const checkDay = booked.find(item => item.date == dateStr);  // 每天的YYYY-MM-DD 有沒有出現在booked陣列內的date
          {/* if (checkDay) {
          *   //判斷是否滿帳 = > pallet all total 40 vs each pallet total sum is 40 at target day
          *   //判斷是否滿帳 = > pallet.count - (sellout.aArea + sellout.bArea + sellout.cArea + sellout.dArea)= 0 ? true : false
          *   // console.log(pallet.count);
          *   // console.log('checkDay.sellout turn to val-array', Object.values(checkDay.sellout));
          *   // Object.values(checkDay.sellout).reduce((prev, item) => prev + item, 0);
          *   // console.log(Object.values(checkDay.sellout).reduce((prev, item) => prev + item, 0));
          *   // console.log(pallet.count - Object.values(checkDay.sellout).reduce((prev, item) => prev + item, 0));
          *   if(!(pallet.count - Object.values(checkDay.sellout).reduce((prev, item) => prev + item, 0))) console.log(`${i}日是滿帳`);
          * }
          */}
          if (checkDay && !(pallet.count - Object.values(checkDay.sellout).reduce((prev, item) => prev + item, 0))) classStr += ' fullDay';

        }
        obj.listBox += `<li class="${classStr}" data-date="${dateStr}">${i}</li>`;
      }

      {/*****************
       * 嘗試產生舉例 "八月 2023"，對dayjs時間物件 抽取出所要的組合再把title替換
       * 讓 listPrint 時可以透過 DOM 換掉標題文字
       * 
       * console.log(obj.thisDate.month());
       * console.log(dayjs.months()[obj.thisDate.month()]);
       * console.log(obj.thisDate.year());
    */}

      obj.title = `${dayjs.months()[obj.thisDate.month()]} ${obj.thisDate.year()}`;
      return obj;
    },
    listPrint = () => { // 列印輸出
      document.querySelector('.leftDayList').innerHTML = listMaker(objL).listBox;
      document.querySelector('.rightDayList').innerHTML = listMaker(objR).listBox;

      document.querySelectorAll('.selectDay').forEach(item => {
        // item.onclick = () => chooseList(item);
        item.onclick = () => calendarCtrl.choose(item);
      });

      // console.log(loki.title, objL.title);
      document.querySelector('.leftBar>h4').textContent = objL.title;
      document.querySelector('.rightBar>h4').textContent = objR.title;
    };


  {/****
    //直接執行列印
    // listPrint();
   * 取消原本Service自我執行listPrint，改由提供部分method給外部操作
   * 透過return 物件將相關動作對自己的service做連動轉派
   * 這是關包觀念，簡單來說外面不需知道內部狀況，內部變數不會跑掉一直keep記憶體內
  */}

  return { // 透過物件提供一系列外部操作讓內部做執行，外面不需要知道內部的變數或函式
    print: () => listPrint(), //外面print，轉派成為裡面的listPrint
    add: () => {
      changeMonth(1);
      listPrint();
    },
    sub: () => {
      changeMonth(-1);
      listPrint();
    },
    choose: item => {
      // if (item.classList.contains('selectHead') && !chooseDays[1]) return;
      // chooseList(item);
      if (!(item.classList.contains('selectHead') && !chooseDays[1])) chooseList(item);

    }
  }
}
(function () {
  dayjs.locale('zh-tw'); //指定lang
  dayjs.extend(dayjs_plugin_localeData); // plugin 擴展給 dayjs
  dayjs.extend(dayjs_plugin_isSameOrBefore); // plugin 擴展給 dayjs
  dayjs.extend(dayjs_plugin_isBetween); // plugin 擴展給 dayjs

  // 全域變數宣告區
  // const fetchPath = 'db.json';
  let
    nationalHoliday = [],
    pallet = {},
    booked = [],
    calendarCtrl = null,
    tableData = {
      totalPrice: 0,
      normalCount: 0,
      holidayCount: 0,
      pallet: {
        aArea: { title: '河畔 × A 區', sellout: 0, sellInfo: '', sumPrice: 0, orderCount: 0 },
        bArea: { title: '山間 × B 區', sellout: 0, sellInfo: '', sumPrice: 0, orderCount: 0 },
        cArea: { title: '平原 × C 區', sellout: 0, sellInfo: '', sumPrice: 0, orderCount: 0 },
        dArea: { title: '車屋 × D 區', sellout: 0, sellInfo: '', sumPrice: 0, orderCount: 0 },
      }
    };

  // main 服務的內容
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
      tableDataInitStr = JSON.stringify(tableData), // 避免淺拷貝問題，透過JSON處理成字串，需要再轉物件，會在MEM另儲存(內容有複製等同深拷貝)
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

          //完成萬年曆的頭尾選擇，可以開始規畫表格的內容。
          tableMaker();

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
      },
      tableMaker = () => {
        //規劃table所需要的資料，對變數tableData做修改，然後利用tablePrint做DOM操作顯示
        // 先恢復資料 tableData 歸零，再開始統計做累加，tableDataInitStr重新覆蓋給tableData (string to object)
        tableData = JSON.parse(tableDataInitStr);
        for (const key in tableData.pallet) {
          // console.log(key);
          // console.log(tableData.pallet[key].sellout, pallet[key].total);
          tableData.pallet[key].sellout = pallet[key].total; //調整到最大可銷售數 10
        }

        //根據客戶選了哪幾天，想知道這幾天還剩多少可以賣=> 該 pallet 的 total 跑批次 減去 已賣出的數量 = 剩下可賣的
        document.querySelectorAll('li.selectHead, li.selectConnect').forEach(node => { //找畫面上被選到的head 跟 body
          //以選中的天為單位 ex'2023-08-22' ，批次處理，檢查這一天08/22 的四個營位booked狀況，翻新tableData的四個營位資訊

          const hasOrder = booked.find(item => {  // 確認這些選中的目前單一日子有沒有在訂單內
            return node.dataset.date === item.date;
          });

          /****  可以併到下面的固定次數迴圈，減少代碼執行量
           *  if (hasOrder) { // 有訂單的話，去計算四個營位的可銷售數
           *    for (const key in tableData.pallet) {
           *      tableData.pallet[key].sellout = Math.min(tableData.pallet[key].sellout, pallet[key].total - hasOrder.sellout[key]);
           *      // {{目前tableData.pallet[key].sellout}} vs {{pallet[key].total - hasOrder.sellout[key]}} 取最小值 
           *      // 存回 {{目前tableData.pallet[key].sellout}}
           *      console.log(key, tableData.pallet[key].sellout);
           *    }
           *  }
           *  //沒訂單，代表可銷售數目前處於沒人買，保持目前最大值10不用規劃
           ****/

          //將每個日子的info記錄起來存入到 tableData 四個營位，利於 tablePrint 渲染
          for (const key in tableData.pallet) {
            if (hasOrder)
              tableData.pallet[key].sellout = Math.min(tableData.pallet[key].sellout, pallet[key].total - hasOrder.sellout[key]);

            const dayPrice = node.classList.contains('holiday') ? pallet[key].holidayPrice : pallet[key].normalPrice;
            // console.log(dayPrice, node.dataset.date, key);
            tableData.pallet[key].sumPrice += dayPrice;
            tableData.pallet[key].sellInfo += `<div>${node.dataset.date}(${dayPrice})</div>`;
          }

          // node.classList.contains('holiday') ? tableData.holidayCount++ : tableData.normalCount++;
          tableData[node.classList.contains('holiday') ? 'holidayCount' : 'normalCount']++;
        });

        tablePrint(); // 將異動後的tableData渲染成畫面
      },
      tablePrint = () => { //將 tableData 做成畫面上的渲染
        // console.log('print');
        document.querySelectorAll('form#selectPallet select').forEach(node => {
          const palletName = node.name; //  node.name 找到這個MEM位置，讀到一個 string
          // console.log(tableData.pallet[palletName].title);   //想要從object內根據變數來找到位置，可以用[string]來替代物件導向(點什麼點什麼)

          //更新帳數 => select>option 有幾組 => 可賣數量
          const count = tableData.pallet[palletName].sellout;
          let optionHtml = '';
          for (let i = 0; i <= count; i++) optionHtml += `<option value="${i}">${i}</option>`;
          node.innerHTML = optionHtml;
          // if (count === 0) node.disabled = true;
          // node.disabled = count === 0;
          node.disabled = !count;

          //更新"日期 /每帳價格" => select > parent > 前面 td 兄弟
          const palletInfo = node.parentElement.previousElementSibling;
          palletInfo.innerHTML = !count ? '' : tableData.pallet[palletName].sellInfo;

          //剩餘 0 組 => select > parent > 前面 td 兄弟 > 前面 td 兄弟 > children > children
          // console.log(palletInfo.previousElementSibling.children[1].children.item(0).textContent);
          // console.log(node.parentElement.parentElement.querySelector('span').textContent);
          node.parentElement.parentElement.querySelector('span').textContent = count;
        });

        // 標題寫入 form#selectPallet > h3
        document.querySelector('form#selectPallet>h3').textContent = `$${tableData.totalPrice} / ${tableData.normalCount}晚平日，${tableData.holidayCount}晚假日`;
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
      },
      tableRefresh: () => tablePrint()
    }
  }

  // 初始化作業規劃
  const init = () => {
    calendarCtrl = calendarService();  // calendarService 需提早 const，才能在 init 成立 calendarCtrl
    calendarCtrl.tableRefresh(); // 透過 calendarCtrl 更新 table 做 DOM 渲染(View)

    document.querySelector('form#selectPallet button').disabled = true;

    fetch('db.json').then(res => res.json()).then(json => {

      ///////////////////////////////////////////////////////////// 第一：資料存到全域變數
      // console.log(json.booked);
      // booked = json.booked;
      // pallet = json.pallet;
      // nationalHoliday = json.nationalHoliday;
      ({ nationalHoliday, pallet, booked } = json);
      // calendarService();
      ///////////////////////////////////////////////////////////// 第二：初始列印
      calendarCtrl.print();
      ///////////////////////////////////////////////////////////// 第三：event 規劃區
      // 左月曆按鈕
      document.querySelector('a[href="#prevCtrl"]').onclick = event => {
        event.preventDefault();
        calendarCtrl.sub();
      };
      // 右月曆按鈕
      document.querySelector('a[href="#nextCtrl"]').addEventListener('click', event => {
        event.preventDefault();
        calendarCtrl.add();
      });
      // 設定四個選單的互動
      const allSelect = document.querySelectorAll('form#selectPallet select');
      allSelect.forEach(selectNode => {
        selectNode.onchange = function () {
          // console.log(this.value,this.name);
          //將四個select的value與name湊出小計存到tableData.totalPrice
          // console.log(this.value * tableData.pallet[this.name].sumPrice);
          tableData.totalPrice = 0; //每次都是當下四個 pallet 相加，所以這裡獨立歸零計算
          allSelect.forEach(item => {
            tableData.totalPrice += item.value * tableData.pallet[item.name].sumPrice;
          });
          tableData.pallet[selectNode.name].orderCount = Number(selectNode.value);
          // calendarCtrl.tableRefresh(); // 只有h3局部修改，若這裡直接大畫面渲染會洗到select內容導致跑掉。所以小異動直接寫就好
          document.querySelector('form#selectPallet>h3').textContent = `$${tableData.totalPrice} / ${tableData.normalCount}晚平日，${tableData.holidayCount}晚假日`;
          document.querySelector('form#selectPallet button').disabled = !tableData.totalPrice;
        }
      })

      //設定預約動作的左畫布彈出，當按下預約觸發 DOM 規劃與 offCanvas 顯示
      const offcanvas = new bootstrap.Offcanvas(document.querySelector('.offcanvas'));
      document.querySelector('form#selectPallet button').onclick = () => {
        /***********
         * <li class="list-group-item d-flex justify-content-between align-items-start">
         *     <div class="ms-2 me-auto">
         *       <div class="fw-bold">河畔 × A區 </div>
         *       <div>
         *         <div></div><div>2023-08-17(1000)</div><div>2023-08-18(1000)</div><div>2023-08-19(1500)</div>
         *       </div>
         *     </div>
         *     <span class="badge bg-warning rounded-pill">x <span class="fs-6">2</span> 帳</span>
         * </li>
         */
        let listStr = '';
        for (const key in tableData.pallet) {
          if (tableData.pallet[key].orderCount === 0) continue;
          listStr += `
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

        document.querySelector('.offcanvas ol').innerHTML = listStr;
        document.querySelector('.offcanvas h5.card-header').textContent = document.querySelector('form#selectPallet>h3').textContent;
        // document.querySelector('.offcanvas button[type="submit"]').disabled = !listStr;
        document.querySelector('.offcanvas button[type="submit"]').disabled = tableData.totalPrice === 0;
        offcanvas.show();
      }

      // 取消HTML提交的動作，改為自己JS處理另做提交
      document.forms.orderForm.onsubmit = function (event) {
        event.preventDefault(); // 取消html預設的事件動作

        if (!this.checkValidity()) this.classList.add('was-validated'); // 檢查form的驗證是否正常，false時透過bootstrap指定class來顯示驗證效果
        else {
          const sendData = new FormData(this);

          const selectDateAry = [...document.querySelectorAll('li.selectHead,li.selectConnect')].map(item => item.dataset.date);
          sendData.append('selectDate', JSON.stringify(selectDateAry)); //JS物件(陣列也是)要先轉成JSON才能放到formData傳遞出去

          // const sellout = {
          //   aArea: 0,
          //   bArea: 0,
          //   cArea: 0,
          //   dArea: 0
          // };
          // Object.keys(tableData.pallet).forEach(key => {
          //   sellout[key] = tableData.pallet[key].orderCount;
          // });
          const sellout = {};
          Object.keys(tableData.pallet).forEach(key => sellout[key] = tableData.pallet[key].orderCount);
          sendData.append('sellout', JSON.stringify(sellout));

          // for (const pair of sendData.entries()) { //驗證需要從entries()取得，沒辦法從 手動 console看到這裡的內容，只能用for of 跑出來看
          //   console.log(pair);
          // }

          //利用API到指定的後端，把 formData 送交出去，透過 ES6 fetch 進行 POST 傳送
          fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: sendData,
          }).then(response => {
            return response.json();
          }).then(data => {
            if (data && data.id) {
              alert('感謝預約!期待相見');
              // document.location.href = '/';
              this.reset();
              offcanvas.hide();
            }
          });
        }
      };
    });
    // console.log('api還沒回來所以空的', nationalHoliday);
  }

  // 執行初始化
  init();
})();
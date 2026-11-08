//---------------------------------------------------- public variables  (公用變數區)
const fetchPath = "./db.json";
let nationalHoliday, pallet, booked;
let calendarCtrl;
const tableData = {
  //初始的表格資料
  totalPrice: 0, // 總價
  normalCount: 0, // 平日入住數
  holidayCount: 0, // 平日入住數
  pallet: {
    //營位資料 => 標題名稱、可賣數量、預約日金、小計、訂購數
    aArea: {
      title: "河畔 × A 區",
      sellCount: 5,
      sellInfo: "<div></div>",
      sumPrice: 0,
      orderCount: 0,
    },
    bArea: {
      title: "山間 × B 區",
      sellCount: 0,
      sellInfo: "<div></div>",
      sumPrice: 0,
      orderCount: 0,
    },
    cArea: {
      title: "平原 × C 區",
      sellCount: 0,
      sellInfo: "<div></div>",
      sumPrice: 0,
      orderCount: 0,
    },
    dArea: {
      title: "車屋 × D 區",
      sellCount: 0,
      sellInfo: "<div></div>",
      sumPrice: 0,
      orderCount: 0,
    },
  },
};

//---------------------------------------------------- init (初始化區)
dayjs.locale("zh-tw");
dayjs.extend(dayjs_plugin_localeData); // 擴充當地語言資料
dayjs.extend(dayjs_plugin_isSameOrBefore); // 擴充isSameOrBefore功能
dayjs.extend(dayjs_plugin_isBetween); // 擴充isBetween功能

fetchData();

//---------------------------------------------------- private methods (私有方法區)
async function fetchData() {
  const response = await fetch(fetchPath, { method: "GET" });
  const json = await response.json();
  ({ nationalHoliday, pallet, booked } = json);

  calendarCtrl = calendarService();
  calendarCtrl.print();
  calendarCtrl.refresh();

  // 綁定切換月份按鈕
  document.querySelector(".ctrlBtn").addEventListener("click", (e) => {
    e.preventDefault();
    calendarCtrl.swap(e.target.closest("a").getAttribute("href"));
  });

  // 選擇日期
  document.querySelector(".calendar").addEventListener("click", (e) => {
    e.preventDefault();
    const sltDay = e.target.closest(".selectDay");
    sltDay && calendarCtrl.choose(sltDay);
  });
}

const calendarService = () => {
  let theDay = dayjs();
  const today = dayjs();
  const objL = {
    listBox: "",
    title: "",
    thisDate: theDay,
  };
  const objR = {
    listBox: "",
    title: "",
    thisDate: theDay.add(1, "month"),
  };

  const chooseDays = [null, null];

  const listMaker = (obj) => {
    const firstDay = dayjs(obj.thisDate).startOf("month").day(); // 0
    const totalDay = dayjs(obj.thisDate).daysInMonth(); // 30

    /* step1. firstDay => 跑幾次for
    1 => 0
    2 => 1
    3 => 2
    4 => 3
    5 => 4
    6 => 5
    0 or 7 => 6
    */
    for (let i = 1; i < (firstDay || 7); i++) {
      obj.listBox += `<li class="JsCal"></li>`;
    }

    /* step2. 跑幾次帶值日子 */
    for (let i = 1; i <= totalDay; i++) {
      let className = "JsCal";
      const currentDate = obj.thisDate.date(i);
      const currentDateYMD = currentDate.format("YYYY-MM-DD");

      //----------------------------- A. 計算class外觀
      // 1. 是否過期
      if (currentDate.isSameOrBefore(today)) className += " delDay";
      else {
        className += " selectDay";

        // 2-1. 是否假日或國定日 =>
        // 方式一:星期六日, dayjs().day() === 6 or 0
        // const getDay = currentDate.day();
        // if (getDay === 6 || getDay === 0 || ...isNationalHoliday...) className += " holiday";

        // 方式二:用1號在周幾, 推算 i 是否為假日
        /**
         * 1號的 day 值 => 0,  i === 1,7,8,14,15,21,22,28,29
         * 1號的 day 值 => 1,  i === 6,7,13,14,20,21,27,28
         * 1號的 day 值 => 2,  i === 5,6,12,13,19,20,26,27
         * 1號的 day 值 => 3,  i === 4,5,11,12,18,19,25,26
         * 1號的 day 值 => 4,  i === 3,4,10,11,17,18,24,25
         * 1號的 day 值 => 5,  i === 2,3,9,10,16,17,23,24
         * 1號的 day 值 => 6,  i === 1,2,8,9,15,16,22,23
         * 1號的 day 值 => x,  (x+i)%7 === 0 or 1 都是紅字
         * firstDay => x,  (x+i)%7 < 2 都是紅字
         */
        if ((firstDay + i) % 7 < 2 || nationalHoliday.includes(currentDateYMD))
          className += " holiday";

        // 2-2. 是否客滿(滿帳)
        const currentBook = booked.find((item) => item.date === currentDateYMD);
        currentBook &&
          Object.values(currentBook.sellout).reduce((a, c) => a + c, 0) ===
            pallet.count &&
          (className += " fullDay");
      }

      //----------------------------- B. 插入 li
      obj.listBox += `<li class="${className}" data-date="${currentDateYMD}">${i}</li>`;
    }

    /* bonus:step3 把上紀錄的 chooseList 補回去 */

    obj.title = `${dayjs.months()[obj.thisDate.month()]} ${obj.thisDate.year()}`;

    // return obj;
  };

  const listPrint = () => {
    listMaker(objL);
    listMaker(objR);

    document.querySelector(".leftDayList").innerHTML = objL.listBox;
    document.querySelector(".rightDayList").innerHTML = objR.listBox;
    document.querySelector(".leftBar>h4").innerHTML = objL.title;
    document.querySelector(".rightBar>h4").innerHTML = objR.title;

    // document.querySelectorAll('.selectDay').forEach(item => {
    //   item.addEventListener('click', () => {
    //     console.log(item.innerText);
    //   })
    // })
  };

  const chooseList = (node) => {
    const [fst, sec] = chooseDays;
    switch (true) {
      case !fst && !sec: // [null,null] , 1st choose
        chooseDays[0] = node;
        node.classList.add("selectHead");
        break;
      case fst && !sec: // [1st,null], 2nd choose, 要注意是否故意反著選
        if (node === fst) return; // 可讀性高, 雖然慢了幾行才發現可忽略不做
        chooseDays[1] = node;

        // 判斷是否為 [2nd,1st] => dayjs(2nd).isSameOrBefore(dayjs(1st)) ?
        is2before1 = dayjs(node.dataset.date).isSameOrBefore(
          dayjs(chooseDays[0].dataset.date),
        );
        if (is2before1) {
          // 成立
          chooseDays[0].classList.replace("selectHead", "selectFoot"); // 1st class 改 FOOT
          chooseDays[1].classList.add("selectHead"); // 2nd class 加 HEAD
          [chooseDays[1], chooseDays[0]] = [chooseDays[0], chooseDays[1]]; // [2nd,1st] => [1st,2nd]
        } else chooseDays[1].classList.add("selectFoot"); // 如預期的 2nd class 加 FOOT

        // 規劃 selectConnect
        document.querySelectorAll(".calendar li.selectDay").forEach((item) => {
          console.log(item);
          const isBetween = dayjs(item.dataset.date).isBetween(
            chooseDays[0].dataset.date,
            chooseDays[1].dataset.date,
          );
          isBetween && item.classList.add("selectConnect");
        });

        break;
      default: // [!null,!null], 3rd choose => 清空, 做成 [1st,null]
        chooseDays.forEach((item) =>
          item.classList.remove("selectHead", "selectFoot"),
        );
        document
          .querySelectorAll("li.selectConnect")
          .forEach((item) => item.classList.remove("selectConnect"));

        node.classList.add("selectHead");
        chooseDays[0] = node;
        chooseDays[1] = null;
        break;
    }
  };

  const changeMonth = (count) => {
    theDay = theDay.add(count, "month");
    objL.listBox = "";
    objL.thisDate = theDay;
    objR.listBox = "";
    objR.thisDate = theDay.add(1, "month");
  };

  const tableMaker = () => {
    // 更新全域變數內的 tableData
    console.log("tableMaker");
  };

  const tablePrint = () => {
    // 把全域變數內的 tableData 印在畫面
    document.querySelectorAll("#selectPallet select").forEach((node) => {
      const palletName = node.name;
      const count = tableData.pallet[palletName].sellCount;
    });
  };

  return {
    print: listPrint,
    swap: (v) => {
      changeMonth(v === "#prevCtrl" ? -1 : 1);
      listPrint();
    },
    choose: (node) => {
      // if (node === chooseDays[0] && !chooseDays[1]) return; // 提早發現不用做, 但判斷多些
      chooseList(node);
    },
    refresh: tablePrint,
  };
};

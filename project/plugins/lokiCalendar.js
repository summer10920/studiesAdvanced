//---------------------------------------------------- public variables  (公用變數區)
const fetchPath = "./db.json";
let nationalHoliday, pallet, booked;

//---------------------------------------------------- init (初始化區)
dayjs.locale("zh-tw");
dayjs.extend(dayjs_plugin_localeData); // 擴充當地語言資料
dayjs.extend(dayjs_plugin_isSameOrBefore); // 擴充isSameOrBefore功能

fetchData();

//---------------------------------------------------- private methods (私有方法區)
async function fetchData() {
  const response = await fetch(fetchPath, { method: "GET" });
  const json = await response.json();
  ({ nationalHoliday, pallet, booked } = json);

  calendarService();
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

  const listMaker = (obj) => {
    // console.log(objL, objR);
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
      obj.listBox += `<li class="${className}">${i}</li>`;
    }

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
  };

  listPrint();
};

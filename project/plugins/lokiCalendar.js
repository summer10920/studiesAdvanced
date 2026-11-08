//---------------------------------------------------- public variables  (公用變數區)
const fetchPath = "./db.json";
let nationalHoliday, pallet, booked;

//---------------------------------------------------- init (初始化區)
dayjs.locale("zh-tw");
dayjs.extend(window.dayjs_plugin_localeData);

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
      obj.listBox += `<li class="JsCal">${i}</li>`;
    }

    obj.title = `${dayjs.months()[obj.thisDate.month()]} ${obj.thisDate.year()}`;

    return obj;
  };

  const listPrint = () => {
    document.querySelector(".leftDayList").innerHTML = listMaker(objL).listBox;
    document.querySelector(".rightDayList").innerHTML = listMaker(objR).listBox;

    document.querySelector(".leftBar>h4").innerHTML = objL.title;
    document.querySelector(".rightBar>h4").innerHTML = objR.title;
  };

  listPrint();
};

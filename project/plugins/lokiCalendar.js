//---------------------------------------------------- public variables  (公用變數區)
const fetchPath = "./db.json";
let nationalHoliday, pallet, booked;

//---------------------------------------------------- init (初始化區)
fetchData();

//---------------------------------------------------- private methods (私有方法區)
async function fetchData() {
  const response = await fetch(fetchPath, { method: "GET" });
  const json = await response.json();
  ({ nationalHoliday, pallet, booked } = json);
}

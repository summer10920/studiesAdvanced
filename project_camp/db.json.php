<?php
require_once('./function.php');
header("Content-Type: application/json");

//初始JSON資料 (string)
$dbJSONStr = '{
  "success": true,
  "nationalHoliday": [
    "2023-01-02",
    "2023-01-20",
    "2023-01-23",
    "2023-01-24",
    "2023-01-25",
    "2023-01-26",
    "2023-01-27",
    "2023-02-27",
    "2023-02-28",
    "2023-04-03",
    "2023-04-04",
    "2023-04-05",
    "2023-06-22",
    "2023-06-23",
    "2023-09-29",
    "2023-10-09",
    "2023-10-10",
    "2024-01-01",
    "2024-01-02"
  ],
  "pallet": {
    "count": 40,
    "aArea": {
      "total": 5,
      "normalPrice": 1000,
      "holidayPrice": 1500
    },
    "bArea": {
      "total": 10,
      "normalPrice": 1100,
      "holidayPrice": 1600
    },
    "cArea": {
      "total": 10,
      "normalPrice": 1200,
      "holidayPrice": 1700
    },
    "dArea": {
      "total": 10,
      "normalPrice": 2000,
      "holidayPrice": 2500
    }
  },
  "booked": [
    {
      "date": "2023-12-12",
      "sellout": {
        "aArea": 1,
        "bArea": 1,
        "cArea": 1,
        "dArea": 1
      }
    },
    {
      "date": "2023-12-13",
      "sellout": {
        "aArea": 2,
        "bArea": 2,
        "cArea": 10,
        "dArea": 2
      }
    },
    {
      "date": "2023-12-14",
      "sellout": {
        "aArea": 3,
        "bArea": 3,
        "cArea": 3,
        "dArea": 3
      }
    },
    {
      "date": "2023-12-25",
      "sellout": {
        "aArea": 10,
        "bArea": 10,
        "cArea": 10,
        "dArea": 10
      }
    },
    {
      "date": "2023-12-16",
      "sellout": {
        "aArea": 10,
        "bArea": 10,
        "cArea": 10,
        "dArea": 10
      }
    }
  ]
}';

//轉換可以處理的暫時性陣列
$dbJSONAry = json_decode($dbJSONStr, true);

/////////////////////////////////////////pallet 相關處理 start
//利用陣列特性，做你想要的修改
// {
//   "count": 40,
//   "aArea": {
//       "total": 5,
//       "normalPrice": 1000,
//       "holidayPrice": 1500
//   },
//   "bArea": {
//       "total": 10,
//       "normalPrice": 1100,
//       "holidayPrice": 1600
//   },
//   "cArea": {
//       "total": 10,
//       "normalPrice": 1200,
//       "holidayPrice": 1700
//   },
//   "dArea": {
//       "total": 10,
//       "normalPrice": 2000,
//       "holidayPrice": 2500
//   }
// }
// $pallet = [
//   "count" => 100,
//   "aArea" => [
//     "total" => 10,
//     "normalPrice" => 1000,
//     "holidayPrice" => 1500
//   ],
//   "bArea" => [
//     "total" => 20,
//     "normalPrice" => 2100,
//     "holidayPrice" => 1600
//   ],
//   "cArea" => [
//     "total" => 10,
//     "normalPrice" => 2200,
//     "holidayPrice" => 1700
//   ],
//   "dArea" => [
//     "total" => 20,
//     "normalPrice" => 3000,
//     "holidayPrice" => 2500
//   ]
// ];
// $dbJSONAry['pallet'] = $pallet;
$rows = getPallet(); // 從SQL拿回來的所有pallet資料
$pallet = [
  "count" =>  array_sum(array_column($rows, 'total')),
];

foreach ($rows as $row) {
  $pallet[$row['name']] = [
    "total" => $row['total'],
    "normalPrice" => $row['normalPrice'],
    "holidayPrice" => $row['holidayPrice'],
  ];
}
/////////////////////////////////////////pallet 相關處理 end
/////////////////////////////////////////holiday 相關處理 start
// [
//   "2023-01-02",
//   "2023-01-20",
//   "2023-01-23",
//   "2023-01-24",
//   "2023-01-25",
//   "2023-01-26",
//   "2023-01-27",
//   "2023-02-27",
//   "2023-02-28",
//   "2023-04-03",
//   "2023-04-04",
//   "2023-04-05",
//   "2023-06-22",
//   "2023-06-23",
//   "2023-09-29",
//   "2023-10-09",
//   "2023-10-10",
//   "2024-01-01",
//   "2024-01-02"
// ]
// $nationalHoliday = []; //初始化一個空陣列準備疊加
// $rows = getHoliday(); // 從 DB 撈取所有今年之後的資料，會以年份作為陣列回傳(因為資料庫的設計是這樣)
// foreach ($rows as $row) {
//   $tmp = explode("\r\n", $row['date']); // 想辦法將日期字串轉成陣列，而且斷行符號為 \r\n可以拿來當作陣列分割的符號，但注意這裡一定要雙引號才不會被當作普通文字做判定
//   $nationalHoliday = array_merge($nationalHoliday, $tmp); //將結果陣列不斷的跟我們初始的陣列合併，等跑完foreach就會是所有data的總和陣列
// }
/////////////////////////////////////////holiday 相關處理 end
/////////////////////////////////////////booked 相關處理 start
$rows = getDaily();
$booked = array_map(function ($row) {
  // {
  //   "date": "2023-12-12",
  //   "aArea": 1,
  //   "bArea": 1,
  //   "cArea": 1,
  //   "dArea": 1
  // },
  // 變成
  // {
  //   "date": "2023-12-12",
  //   "sellout": {
  //     "aArea": 1,
  //     "bArea": 1,
  //     "cArea": 1,
  //     "dArea": 1
  //   }
  // },
  return [
    'date' => $row['date'],
    'sellout' => [
      'aArea' => $row['aArea'],
      'bArea' => $row['bArea'],
      'cArea' => $row['cArea'],
      'dArea' => $row['dArea'],
    ]
  ];
}, $rows);


/////////////////////////////////////////booked 相關處理 end

$dbJSONAry['pallet'] = $pallet;
$dbJSONAry['nationalHoliday'] = geHolidayAry(); // 蓋回去原本的db資料。
$dbJSONAry['booked'] = $booked; // 蓋回去原本的db資料。

//暫時性陣列轉回 JSON資料文字並顯示在這份文件上
echo $dbJSONStr = json_encode($dbJSONAry, JSON_PRETTY_PRINT);

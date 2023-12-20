<?php

/***
 * 可添加這兩行，如果發生http 500而無法出現錯誤資訊
 * error_reporting(E_ALL);  
 * ini_set('display_errors', 1);
 ***/
session_save_path('tmp'); //修改 tmp 路徑
session_start(); //open session


// PDO Connect CRUD
class lokiSQL {
  private $db;
  public $prefix_name = '_loki_';

  public function __construct() {
    $this->db = new PDO("mysql:host=127.0.0.1;dbname=php_11201_project;charset=utf8", "loki", "test", null);
  }

  public function lokiSelect($tb, $wh) {  //提供資料表名稱跟條件，我能操作 SQL-Select 回傳
    return $this->db->query("SELECT * FROM " . $this->prefix_name . $tb . " WHERE " . $wh)->fetchAll(); //將PDO操作返回給fn
  }

  public function lokiInsert($tb, $valAry) { //提供資料表名稱跟value陣列，產生insert 完整語法
    // echo $str = "INSERT INTO `_loki_order_list` VALUES (" . implode(",", $valAry) . ")";
    return $this->db->query("INSERT INTO " . $this->prefix_name . $tb . " VALUES (" . implode(",", $valAry) . ")"); //將PDO操作返回給fn
  }

  public function lokiUpdate($tb, $setAry, $id) { //提供資料表名稱跟value陣列，產生insert 完整語法
    //UPDATE `_loki_order_list` SET `del`=1 WHERE `id`=" . $id;
    //UPDATE `_loki_pallet` SET `total` = '4', `normalPrice` = '400', `holidayPrice` = '150' WHERE `_loki_pallet`.`id` = 4;
    return $this->db->query("UPDATE " . $this->prefix_name . $tb . " SET " . implode(',', $setAry) . " WHERE id=" . $id); //將PDO操作返回給fn
  }

  public function lokiQuery($queryStr) {
    return $this->db->query($queryStr);
  }
}

///////////// custom function
$sql = new lokiSQL();  // 物件包，可以試著去執行一些SQL動作(select)

// 檢查帳號並存入session
function checkUserSaveSession($acc, $pwd) {
  global $sql;
  if (isset($_SESSION['admin'])) return true; //如果存在就直接回傳 true，不用再驗證設定 SESSION
  // $sql->lokiSelect('user', 'name="' . $acc . '" AND password="' . $pwd . '" AND active=1'); //從$sql找到 fn 試圖取回該fn返還的東西
  // SELECT * FROM _loki_user WHERE name='admin' AND password ='1234' AND active=1
  // exit();
  $check = !!$sql->lokiSelect('user', 'name="' . $acc . '" AND password="' . $pwd . '" AND active=1');  // !!將變數快速轉換成boolean，方便判斷

  // if ($check) $_SESSION['admin'] = $acc;

  if ($check) {
    date_default_timezone_set('Asia/Taipei');
    $token = md5($acc . $pwd . strtotime('now')); // 產生的代碼令牌

    $setTokenSQL = 'UPDATE ' . $sql->prefix_name . 'user SET token="' . $token . '", expire=DATE_ADD(NOW(), INTERVAL 10 MINUTE) WHERE name="' . $acc . '"';
    $result = $sql->lokiQuery($setTokenSQL)->queryString;
    if ($result) $_SESSION['admin'] = ['account' => $acc, 'token' => $token];
    else exit('sql fail');
  }



  return $check;
}


// 取得訂單資料，採資料表陣列方式返還
function getOrderList() {
  global $sql;
  return $sql->lokiSelect('order_list', 'del=0');
}

// 新增訂單資料，並試著將 query 的內容返還
function saveOrder($sqlFieldAry) {
  global $sql;
  return $sql->lokiInsert('order_list', $sqlFieldAry)->queryString;
}

function deleteOrder($id) {
  global $sql;
  return $sql->lokiUpdate('order_list', ['del=1'], $id)->queryString;
}


function getPallet() {
  global $sql;
  return $sql->lokiSelect('pallet', 1);
}

function updatePallet($setAry, $id) {
  global $sql;
  return $sql->lokiUpdate('pallet', $setAry, $id)->queryString;
}

function getHoliday() {
  // check year of holiday first
  global $sql;

  // -- 使用 php 創造這三句語法給SQL執行，讓SQL自己判斷是否需要新增指令年分
  // INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+0 WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year = YEAR(CURRENT_DATE())+0);
  // INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+1 WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year = YEAR(CURRENT_DATE())+1);
  // INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+2 WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year = YEAR(CURRENT_DATE())+2);
  for ($i = 0; $i < 3; $i++) {
    // $sqlCode = 'INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+' . $i . ' WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year = YEAR(CURRENT_DATE())+' . $i . ')';
    $sqlCode = 'INSERT INTO ' . $sql->prefix_name . 'holiday (year) SELECT YEAR(CURRENT_DATE())+' . $i . ' WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year = YEAR(CURRENT_DATE())+' . $i . ')';
    $sql->lokiQuery($sqlCode);
  }

  return $sql->lokiSelect('holiday', 'year>=YEAR(CURRENT_DATE()) ORDER BY year');
}

function updateHoliday($setAry, $id) {
  global $sql;
  return $sql->lokiUpdate('holiday', $setAry, $id)->queryString;
}

function geHolidayAry() {  // 這裡筆記沒有，上課臨時決可以抽成fn多地方使用。
  // $nationalHoliday = []; //初始化一個空陣列準備疊加
  // $rows = getHoliday(); // 從 DB 撈取所有今年之後的資料，會以年份作為陣列回傳(因為資料庫的設計是這樣)
  // foreach ($rows as $row) {
  //   $tmp = explode("\r\n", $row['date']); // 想辦法將日期字串轉成陣列，而且斷行符號為 \r\n可以拿來當作陣列分割的符號，但注意這裡一定要雙引號才不會被當作普通文字做判定
  //   $nationalHoliday = array_merge($nationalHoliday, $tmp); //將結果陣列不斷的跟我們初始的陣列合併，等跑完foreach就會是所有data的總和陣列
  // }
  // return $nationalHoliday;
  $tmpAry = []; //初始化一個空陣列準備疊加
  foreach (getHoliday() as $row)
    $tmpAry = array_merge($tmpAry, explode("\r\n", $row['date'])); //將結果陣列不斷的跟我們初始的陣列合併，等跑完foreach就會是所有data的總和陣列
  return $tmpAry;
}

function getDaily() {
  global $sql;
  // SELECT * FROM _loki_daily_state WHERE date>=DATE(CURRENT_DATE()) ORDER BY date
  return $sql->lokiSelect('daily_state', 'date>=DATE(CURRENT_DATE()) ORDER BY date');
}

function checkHoliday($date) { // 給我一個日期，我幫判斷是否是周六周六國定假日回傳boolean
  //整理出所有國定假日之陣列
  $holidayAry = geHolidayAry();
  $dayWeek = date("D", strtotime($date)); // 查出是星期幾，準備判定是否周六周日要算貴價格

  $isHoliday = $dayWeek == 'Sat' || $dayWeek == 'Sun' || in_array($date, $holidayAry);
  return $isHoliday;
}


function checkPermission($name) {
  global $sql;
  // SELECT * FROM _loki_user WHERE expire<NOW() and name='admin';
  // $life = $sql->lokiSelect('user', 'expire<NOW() and name="' . $_SESSION['admin']['account'] . '"'); //是否有時間已過期
  $life = $sql->lokiSelect('user', 'expire<NOW() and name="' . $name . '"'); //是否有時間已過期

  if (count($life)) { //有找到代表有過期
    unset($_SESSION['admin']);
    exit("
      <script>
        alert('連線逾時，請重新作業。');
        document.location.href = './login.php';
      </script>
    ");
  }


  $tokenIsset = $sql->lokiSelect('user', 'token="' . $_SESSION['admin']['token'] . '"'); //檢查token對不對
  if (count($tokenIsset)) {  //token 是認識的，幫你延長SQL expire 壽命
    $setTokenSQL = 'UPDATE ' . $sql->prefix_name . 'user SET expire=DATE_ADD(NOW(), INTERVAL 10 MINUTE) WHERE name="' . $_SESSION['admin']['account'] . '"';
    $sql->lokiQuery($setTokenSQL);
    // $sql->update('user', 'expire=DATE_ADD(NOW(), INTERVAL 10 MINUTE)', 'name="' . $tokenIsset[0]['name'] . '"')->queryString;
  } else { //token不認識，代表某人某台電腦用你的帳號登入，資料庫的token重新被別人綁走。清除 session，顯示重複登入，登出，踢回 login
    unset($_SESSION['admin']);
    exit("
      <script>
        alert('帳號重複登入，請重新作業。');
        document.location.href = './login.php';
      </script>
    ");
  }
}

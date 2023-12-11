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

/*{
// 檢查帳號並存入session
// function checkUserSaveSession($acc, $pwd) {
//   global $sql;

//   if (isset($_SESSION['admin'])) return true; //如果存在就直接回傳 true，不用再驗證設定 SESSION
//   // $sql->lokiSelect('user', 'name="' . $acc . '" AND password="' . $pwd . '" AND active=1'); //從$sql找到 fn 試圖取回該fn返還的東西
//   // SELECT * FROM _loki_user WHERE name='admin' AND password ='1234' AND active=1
//   // exit();
//   $check = !!$sql->lokiSelect('user', 'name="' . $acc . '" AND password="' . $pwd . '" AND active=1');  // !!將變數快速轉換成boolean，方便判斷
//   if ($check) $_SESSION['admin'] = $acc;
//   return $check;
// }

// var_dump(checkUserSaveSession('admin', '1234')); //demo測試給同學看
}*/

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

function updateHoliday($setAry,$id){
  global $sql;
  return $sql->lokiUpdate('holiday', $setAry, $id)->queryString;
}
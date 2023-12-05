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
  private
    $db,
    $prefix_name = '_loki_';

  public function __construct() {
    $this->db = new PDO("mysql:host=127.0.0.1;dbname=php_11201_project;charset=utf8", "loki", "test", null);
  }
  public function lokiSelect($tb, $wh) {  //提供資料表名稱跟條件，我能操作 SQL-Select 回傳
    return $this->db->query("SELECT * FROM " . $this->prefix_name . $tb . " WHERE " . $wh)->fetchAll(); //將PDO操作返回給fn
  }
}

///////////// custom function
$sql = new lokiSQL();  // 物件包，可以試著去執行一些SQL動作(select)

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

// 取得訂單資料，採資料表陣列方式返還
function getOrderList() {
  global $sql;
  return $sql->lokiSelect('order_list', 1);
}


// api todo
if (isset($_GET['do'])) {
  switch ($_GET['do']) {
    case 'newOrder':
      print_r($_POST);
      // Array
      // (
      //     [userName] => 22
      //     [userPhone] => 22
      //     [userMail] => 22@22
      //     [selectDate] => ["2023-12-24"]
      //     [sellout] => {"aArea":1,"bArea":0,"cArea":0,"dArea":0}
      // )


      // $sql = "INSERT INTO _loki_order_list VALUES (null,'Name','Phone',....,)";

      break;
  }
}

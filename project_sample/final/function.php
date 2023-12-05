<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
session_save_path('tmp');
session_start();
// echo $_SERVER['REQUEST_URI'];
class lokiSQL {
  private
    $db,
    $prefix_name = '_loki_';

  public function __construct() {
    $this->db = new PDO("mysql:host=127.0.0.1;dbname=php_project_sample;charset=utf8", "root", "", null);
  }

  public function select($tb, $wh) {
    return $this->db->query("SELECT * FROM " . $this->prefix_name . $tb . " WHERE " . $wh)->fetchAll();
  }

  public function insert($tb, $sqlCode) {  //提供資料表名稱跟value陣列，能操作 SQL-INSERT
    return $this->db->query('INSERT INTO ' . $this->prefix_name . $tb . ' VALUES (' . implode(',', $sqlCode) . ')');
  }

  public function update($tb, $set, $wh) {  //提供資料表名稱跟value陣列，能操作 SQL-INSERT
    // echo 'UPDATE ' . $this->prefix_name . $tb . ' SET ' . $set . ' WHERE ' . $wh;
    return $this->db->query('UPDATE ' . $this->prefix_name . $tb . ' SET ' . $set . ' WHERE ' . $wh);
    // UPDATE _loki_order_list SET del=1 WHERE id=5
  }

  public function query($sqlCode) {  //提供資料表名稱跟value陣列，能操作 SQL-INSERT
    return $this->db->query($sqlCode);
    // UPDATE _loki_order_list SET del=1 WHERE id=5
  }
}

///////////// custom function
$sql = new lokiSQL();

function checkUserSaveSession($acc, $pwd) {
  global $sql;
  // if (isset($_SESSION['admin'])) return true; //如果存在就直接回傳true，不用再驗證設定SESSION
  $check = !!$sql->select('user', 'name="' . $acc . '" AND password="' . $pwd . '" AND active=1');

  if ($check) {
    date_default_timezone_set('Asia/Taipei');
    $token = md5($acc . $pwd . strtotime('now'));
    $result = $sql->update('user', 'token="' . $token . '", expire=DATE_ADD(NOW(), INTERVAL 5 MINUTE)', 'name="' . $acc . '"')->queryString;
    if ($result) $_SESSION['admin'] = $token;
    else exit('sql fail');
  }

  return $check;
}

function getOrderList() {
  global $sql;
  return $sql->select('order_list', 'del=0');
}

function saveOrder($sqlCode) {
  global $sql;
  return $sql->insert('order_list', $sqlCode)->queryString; //如果SQL指令成功，可以捕獲到這個String
}

function delOrder($id) {
  // print_r($_GET);
  global $sql;

  foreach ($_GET['date'] as $date) {
    // UPDATE _loki_daily_state SET aArea = aArea + 1, bArea=bArea+2, cArea=cArea+3 WHERE date = '2023-02-01'
    $areaUpdate = implode(', ', array_map(
      function ($value, $key) {
        return '' . $key . ' = ' . $key . ' - ' . $value; //aArea = aArea + 1
      },
      $_GET['pallet'],
      array_keys($_GET['pallet'])
    ));
    // echo 'UPDATE _loki_daily_state SET ' . $areaUpdate . ' WHERE date = "' . $date . '"';
    $sql->query('UPDATE _loki_daily_state SET ' . $areaUpdate . ' WHERE date = "' . $date . '"');
  }

  return $sql->update('order_list', 'del=1', 'id=' . $id)->queryString;
  // UPDATE _loki_order_list SET del=1 WHERE id=5
}

function getPallet() {
  global $sql;
  return $sql->select('pallet', 1);
}

function updatePallet($id, $set) {
  global $sql;
  return $sql->update('pallet', $set, 'id=' . $id)->queryString;
}

function getHoliday() {
  global $sql;

  // INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+3 WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year=YEAR(CURRENT_DATE())+3)
  for ($i = 0; $i < 3; $i++) {
    $checkYear = 'INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+' . $i . ' WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year=YEAR(CURRENT_DATE())+' . $i . ')';
    $sql->query($checkYear);
  }
  return $sql->select('holiday', 'year>=YEAR(CURRENT_DATE()) ORDER BY year');
}

function updateHoliday($id, $set) {
  global $sql;
  return $sql->update('holiday', $set, 'id=' . $id)->queryString;
}

function getDaily() {
  global $sql;
  return $sql->select('daily_state', 'date>=DATE(CURRENT_DATE()) ORDER BY date');
}

function getDaily_table() {
  $dailyDB = getDaily();
  $palletDB = getPallet();
  $namePrice = [];
  foreach ($palletDB as $row)
    $namePrice[$row['name']] = [$row['normalPrice'], $row['holidayPrice']];

  $table_head = array_column($palletDB, 'total');
  $table_body = array_map(function ($row) use ($namePrice) {
    $row['holiday'] = checkHoliday($row['date']);
    // $price = +checkHoliday($row['date']);
    $row['total'] =
      $row['aArea'] * $namePrice['aArea'][+$row['holiday']] +
      $row['bArea'] * $namePrice['bArea'][+$row['holiday']] +
      $row['cArea'] * $namePrice['cArea'][+$row['holiday']] +
      $row['dArea'] * $namePrice['dArea'][+$row['holiday']];
    return $row;
  }, $dailyDB);

  return [$table_head, $table_body];
}

function checkHoliday($date) {
  $holidayAry = [];
  foreach (getHoliday() as $row)
    $holidayAry = array_merge($holidayAry, explode("\r\n", $row['date']));

  $day = date("D", strtotime($date));
  return $day == 'Sat' || $day == 'SUN' || in_array($date, $holidayAry) ? true : false;
}

function checkPermission() {
  global $sql;
  $life = $sql->select('user', 'expire<NOW() and name="admin"'); //是否有時間已過期

  if (count($life)) { //有找到代表有過期
    unset($_SESSION['admin']);
    exit("
      <script>
        alert('連線逾時，請重新作業。');
        document.location.href = './login';
      </script>
    ");
  }

  $tokenIsset = $sql->select('user', 'token="' . $_SESSION['admin'] . '"');
  if (count($tokenIsset))  //token不變，延長壽命
    $sql->update('user', 'expire=DATE_ADD(NOW(), INTERVAL 5 MINUTE)', 'name="' . $tokenIsset[0]['name'] . '"')->queryString;
  else { //token 已改變，清除session，顯示重複登入，登出，踢回login
    unset($_SESSION['admin']);
    exit("
      <script>
        alert('帳號重複登入，請重新作業。');
        document.location.href = './login';
      </script>
    ");
  }
}


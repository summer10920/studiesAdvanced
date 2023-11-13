<?php
$pdo_mySQL = new PDO(
  'mysql:host=127.0.0.1;dbname=php_11201;charset=utf8',
  'loki',
  'test'
);

// $sqlCode = 'SELECT * FROM animal';
// $pdo_mySQL->query($sqlCode);
$pdo_result = $pdo_mySQL->query('SELECT * FROM animal'); //還回來還是一個 PDO 物件，裡面也包含了要取回的DATA結果
// var_dump($result);

// print_r($pdo_result->fetch()); //PDO物件底下有一個工具 fetch() ，可以撈取一筆資料
// echo '<hr>';
// print_r($pdo_result->fetch()); //PDO物件底下有一個工具 fetch() ，可以撈取一筆資料
// echo '<hr>';
// print_r($pdo_result->fetch()); //PDO物件底下有一個工具 fetch() ，可以撈取一筆資料
// echo '<hr>';
// var_dump($pdo_result->fetch());
// print_r($pdo_result->fetch()); //PDO物件底下有一個工具 fetch() ，可以撈取一筆資料

// method 1::透過while不斷的fetch()抽取判定有沒有拿到東西$row，有就把$row印出來
// while ($row = $pdo_result->fetch()) {
//   print_r($row); //PDO物件底下有一個工具 fetch() ，可以撈取一筆資料
//   echo '<hr>';
// }

//method 2::透過fetchAll() 一口氣拿回來
// print_r($pdo_result->fetchAll());
// $rows = $pdo_result->fetchAll();
// foreach ($rows as $row) {
//   print_r($row);
//   echo '<hr>';
// }

//method 2 fast:::一氣合成，從指令,取回,抽取全部
$rows = $pdo_mySQL->query('SELECT * FROM animal')->fetchAll();
foreach ($rows as $row) {
  print_r($row);
  echo '<hr>';
}


/// SQL injection 注碼攻擊說明與防範
// 略，等專題教完請提醒Loki回頭示範
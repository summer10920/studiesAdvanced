<?php
//提供資料庫連線的 PDO 物件包
$pdo_mySQL = new PDO(
  'mysql:host=127.0.0.1;dbname=php_11201;charset=utf8',
  'loki',
  'test'
);
// var_dump($pdo_mySQL);

//建立資料表
$sqlCode = '
  CREATE TABLE php_11201.animal (
    id INT UNSIGNED AUTO_INCREMENT,
    name TEXT,
    weight INT,
    info TEXT,
    date DATETIME,
    PRIMARY KEY(id)
  );
';
//INSERT
$sqlCode = '
  INSERT INTO animal VALUES 
    (null,"河馬",75,"肥肥粉紅",NOW()),
    (null,"浣熊",15,"美國小偷刻板印象",NOW()),
    (null,"斑馬",125,"過馬路要小心",NOW());
';
//UPDATE
$sqlCode = 'UPDATE animal SET weight=333 WHERE id=3;';
//DELETE
$sqlCode='DELETE FROM animal WHERE id=1';

// $pdo_mySQL->query('CREATE TABLE php_11201.animan.....')
$pdo_mySQL->query($sqlCode);

// $sqlDrop='DROP TABLE animal';
// $pdo_mySQL->query($sqlDrop);

<?php
$ary = ["2023-12-15", "2023-12-18"];
echo $aryStr = serialize($ary);
echo '<br>';
// $reverse=unserialize($aryStr);
// print_r($reverse);

$jsonString = '{"aArea":2,"bArea":3,"cArea":4,"dArea":0}';
$obj = json_decode($jsonString);
echo $objStr = serialize($obj);
// $reverse=unserialize($objStr);
// print_r($reverse);





// echo 'INSERT INTO `booked` VALUES (\'2023-12-13\', \'2023-12-14\');'.$ary;

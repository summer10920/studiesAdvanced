<?php
$ary = ["2023-02-21", "2023-02-22", "2023-02-23"];
$aryStr = serialize($ary);

$json = '{"aArea":1,"bArea":2,"cArea":3,"dArea":4}';
$obj = json_decode($json);
$objStr = serialize($obj);

echo '<b>array in sql:</b><br> ' . $aryStr;
echo "<br>";
echo '<b>object in sql:</b><br> ' . $objStr;

echo "<hr>";
echo 'array in php::';
print_r(unserialize(($aryStr)));
echo "<br>";
echo 'json in php::';
print_r(unserialize(($objStr)));

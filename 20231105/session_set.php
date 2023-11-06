<h1>hello world, 指定 SESSION 超全域變數!!</h1>
<?php
session_start(); // 載入我們的 session pool，才能set or get

$_SESSION['name']='loki'; // 指定一個 name=loki放入session陣列
$_SESSION['pwd']='1234'; // 指定一個 name=loki放入session陣列


print_r($_SESSION);
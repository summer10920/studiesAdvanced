<?php
// 抹除登入的資訊
session_start();
// unset($_SESSION['logged']);
session_unset(); // clear all
session_destroy(); // 銷毀
header('location:session_login.php');
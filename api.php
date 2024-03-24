<?php
switch ($_GET['do']) {
  case 'login':
    echo '<script>alert("進行登入驗證中....")</script>';
    if ($_POST['acc'] === 'loki' && $_POST['pwd'] === '1234') {
      echo '<script>alert("登入成功")</script>';
    } else {
      echo '<script>alert("登入失敗")</script>';
    }
    break;
  case 'signup':
    echo '<script>alert("進行註冊會員....")</script>';
    echo '<script>alert("註冊成功")</script>';
    break;
}

echo '<script>history.go(-1)</script>';
// print_r($_FILES);

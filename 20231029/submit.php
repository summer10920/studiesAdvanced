<?php
// echo $_GET['who']; // loki5566

// if (!empty($_GET['who']))  // 存在且有東西
//   echo '歡迎註冊, ' . $_GET['who'] . ' 大大!!';
// elseif (isset($_GET['who'])) { //存在且無值
//   echo '帳號不可為空';
// } else {
//   header('location:./form.php');
//   echo 'bye';
// }


// // print_r($_POST);
// if (!empty($_POST['who']))  // 存在且有東西
//   echo '歡迎註冊, ' . $_POST['who'] . ' 大大!!';
// elseif (isset($_POST['who'])) { //存在且無值
//   echo '帳號不可為空';
// } else {
//   header('location:./form.php');
//   echo 'bye';
// }

// print_r($_GET);
// print_r($_POST);
if ($_GET['todo'] === 'signup') {
  if (!empty($_POST['who']))  // 存在且有東西
    echo '歡迎註冊, ' . $_POST['who'] . ' 大大!!';
  elseif (isset($_POST['who'])) { //存在且無值
    echo '帳號不可為空';
  } else {
    header('location:./form.php');
    echo 'bye';
  }
} else {
  header('location:./form.php');
}

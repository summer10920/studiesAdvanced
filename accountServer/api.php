<?php
header('Access-Control-Allow-Origin:*');
$account = array(
  array("id" => 1, "acc" => "loki", "pwd" => "1111"),
  array("id" => 2, "acc" => "max", "pwd" => "2222"),
  array("id" => 2, "acc" => "july", "pwd" => "3333")
);
switch ($_GET['do']) {
  case 'checkuser':
    $flag = false;
    foreach ($account as $row) if ($row['acc'] == $_POST['acc']) {
      $flag = true;
      break;
    }
    if ($flag) echo "帳號重複";
    else echo "可使用此帳號";
    break;
}

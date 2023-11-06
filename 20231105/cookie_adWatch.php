<?php
// 設計有沒有看過廣告，有看過紀錄看過幾次，如果看過低於3次，再顯示廣告並計算已看過幾次
// print_r($_COOKIE);
// var_dump(isset($_COOKIE['watchAd']));

if (isset($_COOKIE['watchAd'])) {
  if ($_COOKIE['watchAd'] < 3) {
    echo '<img src="https://fakeimg.pl/300x200/">';
    setcookie('watchAd', $_COOKIE['watchAd'] + 1, strtotime("today 23:59:59")); //期限過今天
  } else {
    //不顯示廣告，甚麼也不做且不再操作cookie 
  }
} else {
  echo '<img src="https://fakeimg.pl/300x200/">';
  setcookie('watchAd', 1, strtotime("today 23:59:59"));  //期限過今天
}

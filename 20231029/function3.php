<h1>hello world, custom function 自訂函式!!</h1>
<?php
function say($name, $num = 0) //宣告定義，建立一個fn
{
  echo $sayStr = 'hello ' . $name . "!!<br>";
  if ($num > 59) return '分數及格!!';
  echo $sayStr;
  echo $sayStr;
}



//執行
$outsideName = 'max';
$getResult = say($outsideName, 49); // say 會回傳一個東西給我，看你要不要接住。
// echo $sayStr; // 讀不到fn內部的變數

// var_dump($getResult); // 沒有return 會是 NULL

if ($getResult) echo $getResult;
else echo '下次考試再努力';

print '<hr>';
// $getResult = say('loki');
// if ($getResult) echo $getResult;
// else echo '下次考試再努力';
echo say('loki', 100) ?? '下次考試再努力';  // 存在  ?? 不存在
// print "<hr>";
// echo null ?? 'max';

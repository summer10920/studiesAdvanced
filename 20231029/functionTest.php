<?php

/*********** Question 1
 * 產生一組長度 8~12 隨機密碼，由英文大小寫與數字組成(可重複)
 * echo 'uiY4a8xcv'; //ex:
 * 利用chr()透過ASCII 65~90(A~Z)跟 97~122 (a~z) 跟 0~9 生成
 * 
 * 提示: 想辦法 0~61 變成 65~90, 97~122, 0~9
 ******************** */
for ($i = 0; $i < rand(8, 12); $i++) {
  $at = rand(0, 61); // 0~61 => 0~9,10~35,36~61
  if ($at < 10) echo $at;
  elseif ($at < 36) echo chr($at + 55); // 10~35 => 65~90 => 10+55 ~ 35+55
  else echo chr($at + 61); // 36~61 => 97~122 => 36+61 ~ 61+61
}
print '<hr>';
/*********** Question 2
 * 利用 Question 1 改良，設計一個 pwd($many)可以產生 $many組密碼，存入陣列return
 * $result=pwd(10); // return array
 * foreach($result as $item) 
 *  echo $item.'<br>';
 ******************** */
function pwd($many = 1)
{
  // $codeAry = [];
  for ($run = 0; $run < $many; $run++) $codeAry[] = pwdMaker(); //幾組密碼
  return $codeAry;
}
function pwdMaker()
{
  $codeStr = '';
  //一組密碼
  for ($i = 0; $i < rand(8, 12); $i++) {
    $at = rand(0, 61);
    if ($at < 10) $codeStr .= $at;  // $codeStr=$codeStr.$at;
    elseif ($at < 36) $codeStr .= chr($at + 55); // $codeStr=$codeStr.chr($at+55);
    else $codeStr .= chr($at + 61);
  }
  return $codeStr;
}
$result = pwd(3); // return array
foreach ($result as $item)  echo $item . '<br>';
print '<hr>';

/*********** Question 3
 * 大樂透 1 ~ 49 隨機6個數字不重複，產生 5 ~10 組樂透明牌，
 * 參考:可能會使用到的 unset,for,rand,foreach,sort,array
 ******************** */
for ($i = 1; $i < 50; $i++) { // 初始建立一個可以無限複製的完整球池陣列(存放49組數字) => 索引 0~48 & 值 1~49
  $dataBall[] = $i;
}

for ($pay = 0; $pay < rand(5, 10); $pay++) { //重複買幾組
  $playBall = $dataBall; // 遊戲開始:初始一組完整的球池 
  $getQuery = []; //清空已選區

  for ($i = 0; $i < 6; $i++) {  //連續跑6組，不斷的將球池內的隨機球，搬到已選區
    // $getIdx = rand(0, 48 - $i);  // 找idx 48,47,46,45..
    $getIdx = rand(0, count($playBall) - 1); // 隨機一個球池索引範圍 0 ~ (目前球總數-1 <=>最後index) ，取得索引

    $getQuery[] = $playBall[$getIdx]; // 用序號index找到指定球value，複製給已選區(陣列累積存放)
    unset($playBall[$getIdx]); // 刪掉球池內的指定球
    sort($playBall); // 球池排序，將空的索引擠回來
  }
  sort($getQuery); // 已選區排序一下，好看
  foreach ($getQuery as $value) echo '(' . $value . ')'; //循序印出來
  print '<br>'; //換行
}

print '<hr>';

// $lokiPlay = [0 => 'A', 'B', 'C', 'D', 4 => 'E'];
// $getIdx = rand(0, 4); // index 0 ~ 3
// echo $lokiPlay[$getIdx] . '獎';

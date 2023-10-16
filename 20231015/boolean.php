<h1>布林值 True 對 or False 錯</h1>
<?php
$num = 10;
$str = '10';
// if($num==$str) echo 'a b 都是 10<br>';
// if($num===$str) echo 'a b 都是 10，且type相同<br>';

// var_dump($num!=$str);
// echo '<br>';
// var_dump($num!==$str);
// echo '<br>';

$a = 20;
$b = 15;
$c = 15;
// var_dump($a==$b); // 快速檢查型別與內容，開發用工具
// echo '<br>';
// var_dump($a!=$b);
// echo '<br>';
// var_dump($a>$b);
// echo '<br>';
// var_dump($a>=$c);
// echo '<br>';
// var_dump($a<=$c);
// echo '<br>';


$rd = rand(1, 100);
if ($rd <= 5) $card = 'SSR';  // No.1 ~ 5 => 5%
elseif ($rd <= 15) $card = 'SR'; // No.6 ~ 15 => 10%
elseif ($rd <= 50) $card = 'R'; // No.16 ~ 50 => 35%
else $card = 'N'; //No.51 ~ No.100 => 50%

if (isset($card)) {
  echo '抽到了' . $card . '級角色，卡片編號No.' . $rd . '!!';
}
print "<hr>";

// is set, empty, is null => 有指定, 空值, 沒有東西
// $var = 'string';
// $var = 10;
// $var = false;
// $var = $b != $c;
// var_dump($var);

// $val = 1234;
// $ans = isset($loki); // 回傳boolean，可幫檢查這個變數有沒有被設定，通常可用在不想面對變數不存在的困惑
// var_dump($ans);

var_dump($unEmptyStr = '123123');
print ' ===> ';
var_dump(empty($unEmptyStr)); // 不存在的變數 or 空字串 => false
var_dump(isset($unEmptyStr)); // 有值存在的變數，專門檢查變數 => true
print '<br>';

var_dump($emptyStr = ''); //空的字串
print ' ===> ';
var_dump(empty($emptyStr)); // 不存在的變數 or 空字串 => true
var_dump(isset($emptyStr)); // 有東西存在的變數，專門檢查變數 => true
print '<br>';

$undefined; // 沒有值，沒有定義，用var_dump會error找不到value
print 'undefined ===> ';
var_dump(empty($undefined)); // 不存在的變數 or 空字串 or 沒有指定value的變數 => true
var_dump(isset($undefined)); // 有東西存在的變數，專門檢查變數 => false
print '<br>';

var_dump($null = null);  // 有值，但沒有東西
print ' ===> ';
var_dump(empty($null)); // 不存在的變數 or 空字串 or 沒有指定value的變數(undefined) or 指定為沒有的變數(null) => true
var_dump(isset($null)); // 有東西存在的的變數，專門檢查變數 => false
var_dump(is_null($null)); // 存在情況下值為沒有的變數 => true
print '<br>';

print "<hr>";

//相反式 true 跟 false 顛倒 => !
//不考慮type的情況下()==)，boolean跟value的等價關係，存在的值或不是0，可以用true來理解

$num1 = 10;
$num2 = 20;
// var_dump(10);
// var_dump(!0);
// var_dump(!$num1==$num2);   //false==20 => false==true
// var_dump(true===20);   // false，因 type不同
// var_dump(!$num1===$num2);   // boolean === num => false
var_dump(!($num1 == $num2)); // 先數字比較再做反轉

print "<hr>";
var_dump(isset($loki222)); // 可以空字串，只能檢查變數
var_dump(!empty($loki222)); // 是否檢查有東西=> 不可 null, ★不可 ''★, 不可 undefined, 不可變數不存在 ==> isset 強化版

print "<hr>";

/********
 *  (條件A) && (條件B) => A 且 B 都是 true => true
 *  (條件A) || (條件B) => A 或 B 某一 true => true
 *  */

$height = 158; // 高
$money = 50000; // 富
$face = true; // 帥

// if($height>180 && $money>10000 && $face===true)
// if (($height > 158) && ($money > 10000) && $face) echo '高富帥';
// else echo 'not perfect';
// print '<br>';
// if (($height > 158) || ($money > 10000) || $face) echo '高或富或帥';
// else echo 'not good';

if (($height > 158) && ($money > 10000) && $face) {
  echo '高富帥';
} elseif (($height > 158) || ($money > 10000) || $face) {
  echo '有 1 ~ 2 個優勢';
} else {
  echo '沒任何優勢';
}

print "<hr>";
print "<hr>";
////////////////////////////////////////////////////////// empty vs isset
/***
 * isset專門檢查變數的工具，當這個變數有沒有被指定值(不包含undefined variable, null)。
 * 1. 只能檢查變數用
 * 2. true的條件，有value (number,string(''),null) => 非 undefined or null 都是 true
 * 3. false 條件: undefined, null
 */

// $var; //undefined => false
// $var = ''; // '' => true
// $var = null; // null => false
// $var = 123;
// var_dump(isset($loki5567));   
// var_dump($loki5566);
// var_dump($var);

/***
 * empty可以檢查值或變數，去判斷這個對象若為empty則成立 (undefined variable, null, '')。
 * 1. 可以檢查變數或值
 * 2. true的條件 : null, undefined, ''
 */

// var_dump(empty(null));

$var; // Undefined variable => true
// var_dump($var); // Undefined variable
// var_dump($loki5566); // Undefined variable
// $var = ''; // 空字串 => true
// $var = null; // NULL => true
// $var = 1234; // => false
var_dump(empty($var));
print "<hr>";
print "<hr>";

var_dump(false == '');
var_dump(false == null);
// var_dump(false == $loki5566);
?>
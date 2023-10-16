<h1>hello world, number!!</h1>
<?php
$string = 'string';
$number = 5;

echo $string;
echo "<br>";
echo $number; // 輸出的語句
print '<hr>'; // 列印的語句

$a = 13 % 7; // +-*/% try to swap in
echo 'a is =' . $a;
print('<hr>'); // 呼叫內建函式function: 列印的函式

// $b = 'string';
$b = $a + 3; // = 稱呼為'指定'
$b = $b + 3; // $b=>12
echo ('b is = ' . $b); // 呼叫內建函式function: 輸出的函式
print('<hr>');

$c = 10;
$c = $c + 5;
$c = $c - 5;
$c = $c * 5;

print('c is =' . $c);
print('<hr>');

$d = 5;

echo $d + 5;  ///////////////// 10
print '<br>';

// echo $d = $d + 5;
echo $d += 5; ////////////////// 10
print '<br>';

echo $d *= 3; ////////////////// 30
print '<br>';

// echo $d++; //////// 30
// echo ++$d; //////// 31
// echo $d--; //////// 30
// echo --$d; //////// 29

print('d is =' . $d);
print('<hr>');

/*****注意型別 Type 使用不當，會影響你的結果，所以處理順序很重要 */

// $e = 5;
// echo 5."元"; //error
// echo (5)."元";

// echo $d += (5) . '元'; err
// echo $d += '5元'; err 
// echo $d = $d + '5元'; err

echo ($d += 5) . '元'; //ok


?>
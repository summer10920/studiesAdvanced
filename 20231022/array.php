<h1>hello world, array 陣列!!</h1>
<?php
// $std0 = 'loki';
// $std1 = 'max';
// $std2 = 'ethan';
// $std3 = 'july';
// echo $std2;

// array可以存放N個值
$std = ['loki', 'max', 'ethan', 'july'];
// print_r($std);  // 檢查工具
// echo $std[2];


$std = '';
$std = 'max';

// $aa = ['hello']; // 直接將一個陣列包含string 指定給變數
$aa[] = 'hello';
$aa[] = 'world'; // 將string 指定給$aa提供一個陣列位置
$aa[5] = 'A';
$aa[] = 'B';
$aa[] = 'C';
// print_r($aa);  // 檢查工具
// echo '<hr>';
// echo $aa[2];

$ab[] = 'A';
$ab['cat'] = 'helloKitty';
$ab['dog'] = 'snoopy';
$ab[] = 'B';
// print_r($ab);  // 檢查工具
// echo $ab['dog'];
// echo $ab[2];
// $key = 'dog';
// echo $ab[$key];

$ac = [2, 4, 6, 8, 10];
print_r($ac);

$last = array_pop($ac);
print '<hr>';
echo $last . '<br>';

// $ac[] = 20; //push
// $ac[] = 30; //push
// $ac[] = 40; //push
array_push($ac, 20, 30, 40, 50, 100);

$first = array_shift($ac);

print_r($ac);

print '<hr>';
print '<hr>';
$ad[5] = 'x';
array_push($ad, 'A', 'B', 'C', 'D');
print_r($ad);
print '<br>';
// array_shift($ad);
array_unshift($ad,'Y','Z');
print_r($ad);



?>
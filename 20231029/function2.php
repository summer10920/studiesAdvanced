<h1>hello world, function 函式!!</h1>
<?php
// echo '===' . ($qus = 3.2) . ' with ceil, floor, round ===<br>';
// echo '無條件進位=>' . ceil($qus) . '<br>';
// echo '無條件捨去=>' . floor($qus) . '<br>';
// echo '四捨五入=>' . round($qus) . '<br>';

$en = 'abcdefg';
echo substr($en, 1, 3);
echo mb_substr('甲乙丙丁戊己', 1, 3);
echo $en;
echo str_replace('乙', '國字', '甲乙丙丁戊己');

echo md5('loki') . '<br>' . 'e64cfa3fd59e32df57003c7401f48c99';

print "<hr><hr>";

// echo chr($at);
// 長度8~12隨機密碼由英文大小寫與數字組成
// echo 'uiY4a8xcv'; //ex:

// $pwdStrAry=['a','b','c','d','e'];  //length = 62
// $at=rand(0,61); //get index int
// $pwdStrAry($at);
// chr($at);

// method 1 :: use string & substr
$pwdStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';  //length = 62
for ($i = 0; $i < rand(8, 12); $i++) echo substr($pwdStr, rand(0, 61), 1); // run 8 ~ 12 次
print '<br>';

//method 2 :: 利用chr()透過ASCII 65~90(A~Z)跟 97~122 (a~z) 跟 0~9 生成
//提示: 想辦法 0~61 變成 65~90, 97~122, 0~9
<h1>hello world, function 函式!!</h1>
<?php
//檢查工具:::::確認php目前環境設定，欲修改可調整php.ini
// phpinfo();

// Array Method 1:::::直接陣列表示法(陣列完整值)，將陣列結構直接指定給變數
// $aryQuick=['加菲貓','凱蒂貓','湯姆貓'];
// $aryQuick = ['boy' => '加菲貓', '凱蒂貓', '湯姆貓'];

// Array Method 2:::::透過array()協助將指定的多個參數產生一個陣列完整值，再指定給變數
// $aryCat=array('加菲貓','凱蒂貓','湯姆貓');
$aryCat = array('man' => '加菲貓', '凱蒂貓', '湯姆貓');
// var_dump($aryQuick);
// var_dump($aryCat);

// unset::::::刪掉曾經宣告的東西(變數, 陣列位置)
$var = 'hello world';
// var_dump($var);
unset($var); //此時整個php將不存在此變數
// var_dump($var);
unset($aryCat[0]);
// var_dump($aryCat);
// $loki=123;
$loki; //undefined 不曾宣告值
// var_dump($loki);  //undefined
unset($loki); //抹除變數
// var_dump($loki); //undefined

// date::::::提供一個format，產生一個時間格式
echo $now=date('Y年 m月 d日 H:i:s'); // 時區為+0，不是台灣時間
echo '<br>';
date_default_timezone_set('Asia/Taipei'); // [可推薦] 不修改 php.ini 預設時區，從當下指定預設時區
echo $now=date('台灣 Y年 m月 d日 H:i:s');
date_default_timezone_set('Asia/Tokyo');
echo $now=date('東京 Y年 m月 d日 H:i:s');

// method 1:::透過 timestamp(時間搓記) 指定，再暴力的產生+多少時差 (不推薦)
// $myTimestamp = strtotime('+7 hours');
// var_dump($myTimestamp);
// echo $now = date('Y年 m月 d日 H:i:s', $myTimestamp);

//method 2::: new DateTimeImmutable(strtotime,DateTimeZone) [大推薦]
// $today = new DateTimeImmutable('now', new DateTimeZone('Asia/Taipei'));
// echo $today->format('Y年 m月 d日 H:i:s');


?>
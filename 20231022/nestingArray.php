<h1>hello world, 二維陣列!!</h1>
<?php
// $ba[0] = 'A';
// $ba[1] = 'B';
// $ba[2] = 'C';
// $ba['cat'] = ['A1','A2'];
// $ba['dog'] = ['B1','B2'];
// $ba['cat'][] = 'tom';
// $ba['cat'][] = 'kitty';
$ba['cat']['male'] = 'tom';
$ba['cat']['female'] = 'kitty';
// $ba[][]='X'; //0 0
// $ba[][]='Y'; //1 0
$ba[] = [100, 500];
$ba['name'] = ['loki', 'max', 'july'];

// print_r($ba);
// print_r($ba['cat']);
// echo $ba['cat']['male'];

print '<hr>';
print '<hr>';


// $b = ['jp', 'hk', 'tw', 'kr', 'it', 'en'];
// $b['jp'] = '愛洗爹嚕';
// $b['hk'] = '我好鐘意';
$b = [
  'jp' => '愛洗爹路',
  'hk' => '我好鐘意',
  'tw' => '我很喜歡',
  'kr' => '撒拉黑油',
  'en' => 'I Love it'
];

// $total = count($b);
// for ($i = 0; $i < $total; $i++) {
//   echo $b[$i].'<br>';
// }

// foreach ($b as $item) {
//   echo $item . '<br>';
// }

foreach ($b as $key => $value) {
  echo '$key is ' . $key . ', $value is ' . $value . '<br>';
}

print '<hr>';
print '<hr>';

foreach ($ba as $baKey => $item) {
  echo '子陣列 $ba[' . $baKey . '] 存在，內容如下<br>';
  foreach ($item as $key => $value) {
    echo '$key is ' . $key . ', $value is ' . $value . '<br>';
  }
  echo '======<br>';
}
// print '<hr>';
// foreach ($ba['name'] as $key => $value) {
//   echo '$key is ' . $key . ', $value is ' . $value . '<br>';
// }


?>
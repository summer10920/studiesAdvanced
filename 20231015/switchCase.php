<h1>hello world, switch</h1>
<?php
// $rd = rand(0, 4);
// switch ($rd) {
//   case 0:
//     echo '我很喜歡你';
//     break;
//   case 1:
//     echo '愛洗爹路';
//     break;
//   case 2:
//     echo '撒拉黑唷!';
//     break;
//   case 3:
//     echo '愛老虎油!';
//     break;
//   case 4:
//     echo '我好鍾意黎阿!';
//     break;
//     // default: //other
//     //   echo '比愛心，比咪！';
//     //   break;
// }

// $lang = 'hk';
$lang = ['tw', 'jp', 'kr', 'hk', 'other'];
switch ($lang[rand(0, 4)]) {
  case 'tw':
    echo '我很喜歡你';
    break;
  case 'jp':
    echo '愛洗爹路';
    break;
  case 'kr':
    echo '撒拉黑唷!';
    break;
  case 'en':
    echo '愛老虎油!';
    break;
  case 'hk':
    echo '我好鍾意黎阿!';
    break;
  default: //other
    echo '比愛心，比咪！';
    break;
}
print('<br>');
$select = $lang[rand(0, 4)];
if ($select === 'tw') echo '我很喜歡你';
elseif ($select === 'jp') echo '愛洗爹路';
elseif ($select === 'kr') echo '撒拉黑唷!';
elseif ($select === 'en') echo '愛老虎油!';
elseif ($select === 'hk') echo '我好鍾意黎阿!';
else echo '比愛心，比咪！';
?>
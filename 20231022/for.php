<h1>hello world, For迴圈!!</h1>

<?php
// echo 'hello world!!<br>';  //run 5次
// echo 'hello world!!<br>';
// echo 'hello world!!<br>';
// echo 'hello world!!<br>';
// echo 'hello world!!<br>';

for ($num = 0; $num <= 5; $num += 2) {  // 起始動作，判斷進入 boolean，離開動作
  // echo 'hello world!!<br>';  //run 5次
  echo 'hello world!! <b>round ' . $num . '</b><br>';  //run 5次
}
print '<hr>';

// for ($num = 0; $num <= 12; $num += 4)
//   echo 'number is <b>' . $num + 1 . '</b><br>';  // 1 , 5 , 9, 13
for ($num = 1; $num < 14; $num += 4)
  echo 'number is <b>' . $num . '</b><br>';  // 1 , 5 , 9, 13
print "<hr>";

for ($clr = 0; $clr < 52; $clr++) { //產生 52 個
  $blue = $clr * 5;
  $red = 255 - $blue;
  echo '<span style="color:rgb(' . $red . ', 0, ' . $blue . ')">★</span>'; //*51 組

  // if ((($clr + 1) % 7) == 0) echo '<br>';
  if (!(($clr + 1) % 10)) echo '<br>';
}
print "<hr>";

// for ($i = 0; $i < 10; $i++) {
//   for ($j = 0; $j < 10; $j++) {
//     echo '$i='.$i.',$j='.$j.'<br>';
//   } 
// }
// print "<hr>";

$clr = 0; // 歸零
for ($i = 2; $i < 10; $i++) {
  for ($j = 1; $j < 10; $j++) {
    echo '<span style="
            display:inline-block;
            width:70px;
            color:rgb(' . (255 - $clr) . ' 0 ' . $clr . ');
          ">' . $i . '×' . $j . '=' . $i * $j . '</span>';
    $clr += 3; //改變
  }
  echo '<br>';
}
print "<hr>";

$clr = 0;
?>
<table border="1" style="border-collapse:collapse;color:white">
  <?php for ($i = 2; $i < 10; $i++) { ?>
    <tr>
      <?php for ($j = 1; $j < 10; $j++) { ?>
        <td style="background:rgb(<?= 255 - $clr ?> 0 <?= $clr ?>);width:70px">
          <?= $i ?>×<?= $j ?>=<?= $i * $j ?>
        </td>
      <?php
        $clr += 3;
      } ?>
    </tr>
  <?php } ?>
</table>
<hr>
<?php
// echo '
//   <div>★</div>
//   <div>★★★</div>
//   <div>★★★★★</div>
//   <div>★★★★★★★</div>
//   <div>★★★★★★★★★</div>
// ';

////////////////////////////////////////////////////////////////////////// v1
echo '<div style="text-align:center;">';
$max = 1; //初始1,3,5
for ($i = 1; $i <= 5; $i++) { // 第幾行
  echo '<div>';
  for ($j = 1; $j <= $max; $j++) {  // 上限 1,3,5,7,9
    echo '★';
  }
  $max += 2;
  echo '</div>';
}
echo '</div>';
////////////bonus: span 隨機顏色 10% 20% 30% 40% 共四種星星色 //////////////// v2
echo '<div style="text-align:center;background:black;color:white">';
for ($max = 1; $max < 11; $max += 2) { // 第幾行
  echo '<div>';
  for ($j = 0; $j < $max; $j++) {  // 上限 1,3,5,7,9
    echo '<span style="color:red">★</span>';
  }
  echo '</div>';
  // $max += 2;
}
echo '</div>';
////////////////////////////////////////////////////////////////////////// v3
?>
<div style="text-align:center;">
  <?php for ($max = 1; $max < 11; $max += 2) { ?>
    <div><?php for ($j = 0; $j < $max; $j++) { ?>★<?php } ?></div>
  <?php } ?>
</div>
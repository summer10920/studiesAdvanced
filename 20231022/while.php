<h1>hello world, while 迴圈!!</h1>

<?php
// for ($i=0; $i < 10; $i++) { 
//   # code...
// }

$a = 0;
while ($a < 3) { //先判斷要不要做，有可能0次
  echo $a;
  if (true) $a++;
}

print '<hr>';

$b = 0;
do { // 至少跑1次
  echo $b;
  if (true) $b++;
} while ($b < 3);
?>
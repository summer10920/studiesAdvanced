<h1>hello world, 三元!!</h1>

<?php
/*****if else 快捷版本 */

$rand = rand(1, 6);
// if ($rand > 3) echo ('骰子大 => ' . $rand);
// else echo ('骰子小 => ' . $rand);

// $ans = ($rand > 3) ? '大' : '小';
// $ans = '大';
// $ans = '小';

// echo ($rand > 3) ? '大' : '小';
// echo '大';
// echo '小';

echo '骰子' . ($rand > 3 ? '大' : '小') . ' => ' . $rand;

print '<br>';

$size = null;
if ($rand > 3) $size = '大';
else $size = '小';
echo ('骰子' . $size . ' => ' . $rand);

?>
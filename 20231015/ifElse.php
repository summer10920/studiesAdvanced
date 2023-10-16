<h1>hello world, if else!!</h1>
<?php
// if (條件) {
//   成立時執行這裡的代碼。
// }

//ex:
// $rand = rand(1, 6);
// if ($rand > 3) {
//   echo '骰子大 => ' . $rand;
// }

///////////////////////

// if (條件) {
//   // 成立時執行這裡的代碼
// } else {
//   // 不成立時，執行這裡的代碼
// }

//ex:
// $rand = rand(1, 6);
// if ($rand > 3) {
//   echo '骰子大 => ' . $rand;
// } else {
//   echo '骰子小 => ' . $rand;
// }
// $rand = rand(1, 6);
// if ($rand > 3) echo ('骰子大 => ' . $rand);
// else echo ('骰子小 => ' . $rand);

///////////////////////

// if (條件A) {
//   // 條件A成立時，執行這裡的代碼
// } elseif (條件B) {
//   // 條件A不成立時，但條件B成立時，執行這裡的代碼
// } else {
//   // 條件B不成立時，執行這裡的代碼
//   // 條件AB皆不成立時，執行這裡的代碼
// }

//ex:
// $rand = rand(0, 6);
// if ($rand > 3) echo ('骰子大 => ' . $rand);
// elseif ($rand == 0) echo ('再來一次 => ' . $rand);
// else echo ('骰子小 => ' . $rand);

// $rand = rand(0, 6);
// if ($rand > 3) echo ('骰子大 => ' . $rand);
// elseif ($rand > 0) echo ('骰子小 => ' . $rand);
// else echo ('再來一次 => ' . $rand);

// same as

// if (條件A) {
//   // 條件A成立時，執行這裡的代碼
// } else if (條件B) {
//   // 條件A不成立時，但條件B成立時，執行這裡的代碼
// } else {
//   // 條件B不成立時，執行這裡的代碼
//   // 條件AB皆不成立時，執行這裡的代碼
// }

// $rand = rand(0, 6);
// if ($rand > 3) echo ('骰子大 => ' . $rand);
// else if ($rand > 0) echo ('骰子小 => ' . $rand);
// else echo ('再來一次 => ' . $rand);

// if (條件A) {
//   // 條件A成立時，執行這裡的代碼
// } else {
//   if (條件B) {
//     // 條件A不成立時，但條件B成立時，執行這裡的代碼
//   } else {
//     // 條件B不成立時，執行這裡的代碼
//     // 條件AB皆不成立時，執行這裡的代碼
//   }
// }

$rand = rand(0, 6);
if ($rand > 3) echo ('骰子大 => ' . $rand);
else {
  if ($rand > 0) echo ('骰子小 => ' . $rand);
  else echo ('再來一次 => ' . $rand);
}




?>
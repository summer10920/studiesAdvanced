<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的首頁</title>
</head>

<?php
$word = '<mark>Lucky</mark>';
/*
這是echo 的示範

echo '<!DOCTYPE html>';
echo '<html lang="en">';

echo '<head>';
echo '  <meta charset="UTF-8">';
echo '  <meta name="viewport" content="width=device-width, initial-scale=1.0">';
echo '  <title>我的首頁</title>';
echo '</head>';

echo '<body>';
echo '<h1>hello world in <mark style="background: lightblue;">php</mark></h1>';
*/
echo'<h2>Welcome Echo</h2>';  // 直接指令，要求此處直接指定值輸出
echo '<h2>Welcome Echo</h2>';  // 直接指令
echo('<h2>Welcome Echo</h2>');  // 函式，將指定的value，透過參數傳遞給 echo 內建函式，做文字輸出處理

print'<h3>Nice Day!!</h3>'; // 指令
print '<h3>Nice Day!!</h3>'; // 指令
print('<h3>Nice Day!!</h3>'); // 函式
?>

<h2>Welcome</h2>

<!-- php 編輯模式使用echo指令或print函式　vs　文字模式下插入PHP代碼（可插入變數也可以字串，都可）的差異 -->
<h4>Have
  <?php
  // php模式編寫php完整程式碼
  echo '<mark>Nice</mark>'
  ?>
  Day!!</h4>

<!-- 文字模式做簡易插入代碼最後當作string置換於此 -->
<h4>Have <?= $word ?> Day!!</h4>
<h4>Have <?= '<mark>Super Lucky</mark>' ?> Day!!</h4>

<!-- <h4>Have <mark>Nice</mark> Day!!</h4> -->

<h1>this is h1 tag in html</h1>
<?php echo '<h1>this is h1 tag in php</h1>'; ?>
</body>

</html>
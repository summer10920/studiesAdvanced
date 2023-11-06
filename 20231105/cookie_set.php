<h1>hello world, 指定 COOKIE 超全域變數!! 1 hour</h1>
<?php
// time()可以獲得一個時間戳記 timestamp 單位(秒)
setcookie('name', 'loki', time()+3600); //+ 1 hour

// echo date('Y-m-d H:i:s', time());
// echo "<br>";
// echo date('Y-m-d H:i:s', time()+3600);

?>
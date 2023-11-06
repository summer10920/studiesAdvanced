<h1>hello world, 取得 SESSION 超全域變數!!</h1>
<?php
session_start();
// session_unset(); //clear all
// unset($_SESSION['pwd']); // use unset kill a var
session_destroy(); // server下的tmp session 刪除檔案
print_r($_SESSION);
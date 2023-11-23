<form method="GET">
  <button type="button" onclick="document.location.href='./'">回首頁</button> |
  <button name="page" value="show_all">顯示 (v1)</button>
  <button name="page" value="add_animal">新增 (v1)</button>
  <button name="page" value="mdy_animal">修改 (v1)</button>
  <button name="page" value="del_animal">刪除 (v1)</button> |
  <button type="button" name="page" onclick="document.location.href='?page=crud_all'">第二代 (v2)</button>
  <button type="button" name="page" onclick="document.location.href='?page=crud_page'">第三代 (v3)</button>
</form>
<hr />
<?php
date_default_timezone_set('Asia/Taipei');

$page = !empty($_GET['page']) ? $_GET['page'] : '';
$db = new PDO('mysql:host=127.0.0.1;dbname=php_11201;charset=utf8', 'loki', 'test');

switch ($page) {
  case 'show_all':
    $layout = 'v1_select';
    break;
  case 'add_animal':
    $layout = 'v1_insert';
    break;
  case 'mdy_animal':
    $layout = 'v1_update';
    break;
  case 'del_animal':
    $layout = 'v1_delete';
    break;
  case 'crud_all':
    $layout = 'v2_list';
    break;
  case 'crud_page':
    $layout = 'v3_list';
    break;
  default:
    $layout = 'main';
    break;
}
include($layout . '.php'); //db link
?>
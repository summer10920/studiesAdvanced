<button onclick="document.location.href='./'">回首頁</button>
<form method="GET">
    <!-- <nav>
        <a href="?page=a">A</a>
        <a href="?page=b">B</a>
        <a href="?page=c">C</a>
        <a href="?page=d">D</a>
    </nav> -->
    <p>
        <button name="page" value="show_all">顯示 (1)</button>
        <button name="page" value="add_animal">新增 (1)</button>
        <button name="page" value="mdy_animal">修改 (1)</button>
        <button name="page" value="del_animal">刪除 (1)</button>
    </p>
</form>
<hr />
<?php
// include('main.php');z
// if(!empty($_GET['page'])) $body=$_GET['page'];
// else $body='main.php';
$page = !empty($_GET['page']) ? $_GET['page'] : '';
switch ($page) {
    case 'show_all':
        $layout = 'select';
        break;
    case 'add_animal':
        $layout = 'insert';
        break;
    case 'mdy_animal':
        $layout = 'update';
        break;
    case 'del_animal':
        $layout = 'delete';
        break;
    default:
        $layout = 'main';
        break;
}
include($layout . '.php');
?>
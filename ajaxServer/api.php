<?php
header('Access-Control-Allow-Origin:*');
//https://jsnwork.kiiuo.com/archives/2510/jquery-%E5%9C%A8-header-%E4%BF%AE%E6%94%B9%EF%BC%8C%E8%A7%A3%E6%B1%BA%E8%B7%A8%E7%B6%B2%E5%9F%9F-json%E3%80%81jsonp-%E7%9A%84%E6%96%B9%E6%B3%95/
$db = new PDO("mysql:host=127.0.0.1;dbname=jq_sample;charset=utf8", "root", "");
date_default_timezone_set('asia/Taipei');
// 取得 PDO 物件，另外順便校正 PHP 時差

// 這裡用 switch 是因為還有其他 Ajax 提交，因此利用 GET 來做區分判斷處理。
switch ($_GET['do']) {
  case 'select':
    $sql = "SELECT * FROM ajax_animal limit " . $_POST['start'] . ",10";
    $rows = $db->query($sql)->fetchAll();
    // print_r($_POST);
    // print_r($rows);
    if($rows){
      foreach ($rows as $row) {
        echo '
          <tr>
            <td>' . $row['id'] . '</td>
            <td class="name">' . $row['name'] . '</td>
            <td>' . $row['weight'] . '</td>
            <td>' . $row['info'] . '</td>
            <td>' . $row['date'] . '</td>
            <td>
              <button class="mdy">修改</button>
              <button onclick="del(this)">刪除</button>
            </td>
          </tr>
        ';
      }
    }else echo 'fail';
    // SQL 內取得所有動物資料，由 foreach 規劃完整 tr>td，使前端單純 HTML 替換即可。
    break;
  case 'update':
    
    $sql = "UPDATE ajax_animal SET name='" . $_POST['name'] . "',weight='" . $_POST['weight'] . "',info='" . $_POST['info'] . "',date=NOW() WHERE id=" . $_POST['id'];
    $result = $db->query($sql);
    // 成功時，我們 HTML 生成所需要的更新日期之文字，透過 Ajax 回傳給前端
    if ($result) echo date("Y-m-d H:i:s");
    // if($result) echo "OK";
    
  break;
  case 'delete':
    $sql = "DELETE FROM ajax_animal WHERE id=" . $_POST['id'];
    $result = $db->query($sql);
    if ($result) echo "deleted";
  break;
  case 'insert':
    // print_r($_GET);
    // print_r($_POST);
    $sql = "INSERT INTO ajax_animal VALUES(null,'" . $_POST['name'] . "','" . $_POST['weight'] . "','" . $_POST['info'] . "',NOW())";
    $result = $db->query($sql);
    if ($result) echo "inserted";
    break;
}

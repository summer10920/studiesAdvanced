<h1>V2 CRUD PAGE</h1>
<?php
if (!empty($_POST)) { // have form data, check insert or update
  $sqlCode = !empty($_GET['m']) ?
    'UPDATE animal SET name="' . $_POST['name'] . '", weight=' . $_POST['weight'] . ', info="' . $_POST['info'] . '", date=NOW() WHERE id=' . $_GET['m'] :
    'INSERT INTO animal VALUES(null, "' . $_POST['name'] . '", ' . $_POST['weight'] . ', "' . $_POST['info'] . '", NOW())';

  $db->query($sqlCode); // 寫入到DB
  header('location:index.php?page=crud_all'); //clear form-data of leave, require again this page without form's submit
}

if (!empty($_GET['d'])) { // 需要刪除
  $sqlCode = 'DELETE FROM animal WHERE id=' . $_GET['d'] . '';
  $db->query($sqlCode); // 寫入到DB
  header('location:index.php?page=crud_all'); //clear form-data of leave, require again this page without form's submit
}

// modify check
if (!empty($_GET['m'])) { //$_GET['mdy'] 是否存在影響決定執行那些代碼 & 畫面
  // modify mode::::: 
  include('v2_set.php');
} else {
  // select mode::::: 
  include('v2_get.php');
}

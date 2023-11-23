<h1>V3 CRUD PAGE</h1>
<?php
if (!empty($_POST)) { // have form data, check insert or update
  if (is_array($_POST['name'])) {
    // print_r($_POST);
    foreach ($_POST['name'] as $id => $val) {  // id = 2.3.4.5.8.9.....
      // $chgStr = 'name="A", weight=0, info="B",';
      $chgStr = '';
      if ($_POST['name'][$id] !== $_POST['old_name'][$id]) $chgStr .= 'name="' . $_POST['name'][$id] . '", ';  // name[id] !== old_name[id] => name有改 =>  name="name[id]"
      if ($_POST['weight'][$id] !== $_POST['old_weight'][$id]) $chgStr .= 'weight=' . $_POST['weight'][$id] . ', ';  //weight有改
      if ($_POST['info'][$id] !== $_POST['old_info'][$id]) $chgStr .= 'info="' . $_POST['info'][$id] . '", ';  //info 有改

      if (!empty($chgStr)) {
        $sqlCode = 'UPDATE animal SET ' . $chgStr . 'date=NOW() WHERE id=' . $id . ';';
        $db->query($sqlCode); // 寫入到DB
      }
      /**
       * UPDATE animal SET name="斑馬A", weight=1250, info="過馬路要小心A",  date=NOW() WHERE id=4;
       * UPDATE animal SET name="無尾熊B", weight=250,  date=NOW() WHERE id=11;
       * UPDATE animal SET name="馬來模C",  date=NOW() WHERE id=15;
       */
    }
    header('location:index.php?page=crud_page'); //clear form-data of leave, require again this page without form's submit

  } else {
    // insert
    $sqlCode = 'INSERT INTO animal VALUES(null, "' . $_POST['name'] . '", ' . $_POST['weight'] . ', "' . $_POST['info'] . '", NOW())';
    $db->query($sqlCode); // 寫入到DB
    header('location:index.php?page=crud_page'); //clear form-data of leave, require again this page without form's submit
  }
}

if (!empty($_GET['d'])) { // 需要刪除
  $sqlCode = 'DELETE FROM animal WHERE id=' . $_GET['d'] . '';
  $db->query($sqlCode); // 寫入到DB
  header('location:index.php?page=crud_page'); //clear form-data of leave, require again this page without form's submit
}
// modify check
// if (!empty($_GET['m'])) { //$_GET['mdy'] 是否存在影響決定執行那些代碼 & 畫面
//   // modify mode::::: 
//   include('v2_set.php');
// } else {
//   // select mode::::: 
//   include('v2_get.php');
// }
$rows = $db->query('SELECT * FROM animal')->fetchAll();
?>
<table width="100%">
  <thead>
    <tr align="left">
      <th width="100">編號</th>
      <th width="200">動物名字</th>
      <th width="100">重量</th>
      <th>簡介資訊</th>
      <th width="150">更新日期</th>
      <th width="100">操作</th>
    </tr>
    <tr>
      <th colspan="6">
        <hr>
      </th>
    </tr>
    <form method="post">
      <tr align="left" valign="top">
        <td>#</td>
        <td><input type="text" name="name" style="width:100%" placeholder="請輸入"></td>
        <td><input type="number" name="weight" style="width:100%" placeholder="請輸入"></td>
        <td><textarea rows="1" name="info" style="width:100%" placeholder="請輸入"></textarea></td>
        <td><?= date('Y-m-d H:i:s') ?></td>
        <td>
          <button>新增</button>
        </td>
      </tr>
    </form>
    <tr>
      <th colspan="6">
        <hr>
      </th>
    </tr>
  </thead>
  <form method="post">
    <tbody>
      <?php foreach ($rows as $row) { ?>
        <tr>
          <td><?= $row['id'] ?></td>
          <td>
            <input type="text" name="name[<?= $row['id'] ?>]" style="width:100%" value="<?= $row['name'] ?>">
            <input type="hidden" name="old_name[<?= $row['id'] ?>]" value="<?= $row['name'] ?>">
          </td>
          <td>
            <input type="number" name="weight[<?= $row['id'] ?>]" style="width:100%" value="<?= $row['weight'] ?>">
            <input type="hidden" name="old_weight[<?= $row['id'] ?>]" value="<?= $row['weight'] ?>">
          </td>
          <td>
            <textarea rows="1" name="info[<?= $row['id'] ?>]" style="width:100%" placeholder="請輸入"><?= $row['info'] ?></textarea>
            <input type="hidden" name="old_info[<?= $row['id'] ?>]" value="<?= $row['info'] ?>">
          </td>
          <td><?= $row['date'] ?></td>
          <td>
            <button type="button" onclick="document.location.href='?page=crud_page&d=<?= $row['id'] ?>'">刪除</button>
          </td>
        </tr>
      <?php } ?>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="6" align="center">
          <hr>
          <button type="submit">全部更新</button>
        </td>
      </tr>
    </tfoot>
  </form>
</table>
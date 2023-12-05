<h1>V3 CRUD PAGE</h1>
<?php

/***FORM DATA CHECK START****************** */
if (!empty($_POST)) { // have form data, check insert or update
  if (is_array($_POST['name'])) {
    foreach ($_POST['name'] as $id => $val) {  // id = 2.3.4.5.8.9.....
      $chgStr = '';
      if ($_POST['name'][$id] !== $_POST['old_name'][$id]) $chgStr .= 'name="' . $_POST['name'][$id] . '", ';  // name[id] !== old_name[id] => name有改 =>  name="name[id]"
      if ($_POST['weight'][$id] !== $_POST['old_weight'][$id]) $chgStr .= 'weight=' . $_POST['weight'][$id] . ', ';  //weight有改
      if ($_POST['info'][$id] !== $_POST['old_info'][$id]) $chgStr .= 'info="' . $_POST['info'][$id] . '", ';  //info 有改

      if (!empty($chgStr)) {
        $sqlCode = 'UPDATE animal SET ' . $chgStr . 'date=NOW() WHERE id=' . $id . ';';
        $db->query($sqlCode); // 寫入到DB
      }
    }
    header('location:index.php?page=crud_page&p=' . $_GET['p']); //clear form-data of leave, require again this page without form's submit

  } else {
    // insert
    $sqlCode = 'INSERT INTO animal VALUES(null, "' . $_POST['name'] . '", ' . $_POST['weight'] . ', "' . $_POST['info'] . '", NOW())';
    $db->query($sqlCode); // 寫入到DB
    header('location:index.php?page=crud_page&p=' . $_GET['p']); //clear form-data of leave, require again this page without form's submit
  }
}

if (!empty($_GET['d'])) { // 需要刪除
  $sqlCode = 'DELETE FROM animal WHERE id=' . $_GET['d'];
  $db->query($sqlCode); // 寫入到DB
  header('location:index.php?page=crud_page&p=' . $_GET['p']); //clear form-data of leave, require again this page without form's submit
}
/***FORM DATA CHECK END****************** */

/****GET All Animals => 根據第幾頁載入資料n~n+4 => 每頁5筆

page 1 == SELECT * FROM `animal` LIMIT 0,5; => 第1頁, 0 ~ 4 共5筆
page 2 == SELECT * FROM `animal` LIMIT 5,5; => 第2頁, 5 ~ 9 共5筆
page 3 == SELECT * FROM `animal` LIMIT 10,5; => 第2頁, 5 ~ 9 共5筆

當GET p=2 === $nowPage = 2
 ************/

$nowPage = empty($_GET['p']) ? 1 : $_GET['p']; //如果GET P 不存在，代表在第一頁，如果有，那看該值是多少就是第幾頁
$begin = ($nowPage - 1) * 5;
// echo 'SELECT * FROM animal LIMIT ' . $begin . ',5';
// exit();  // 強制終止PHP工作，將目前已處理的代碼作為結果返回瀏覽器，後續不會再編譯，DEBUG好用
$rows = $db->query('SELECT * FROM animal LIMIT ' . $begin . ',5')->fetchAll();



// 調查有多少資料，好計算導覽按鈕要多少個
$rowCount = $db->query('SELECT COUNT(*) FROM animal')->fetch();
$manyPage = ceil($rowCount[0] / 5); // 16~20筆 => 共4頁
// exit();
/***
建立一pageNav陣列，key為文字頁碼，value為拜法連結的p值
 ***/
$pageNav = [];

//method 1
// $pageNav['<<'] = ($nowPage == 1) ? 1 : ($nowPage - 1); // 如果目前是第2頁，這裡會是value 1，如果目前頁面是第1頁，這裡的value保持1不變
// for ($i = 1; $i <= $manyPage; $i++)  $pageNav[$i] = $i;
// $pageNav['>>'] = ($nowPage == $manyPage) ? $manyPage : ($nowPage + 1); // 如果目前是第2頁，這裡會是value 3，如果頁面是最後值，這裡的value保持最後頁的值不變


//method 2
if (($nowPage != 1)) $pageNav['<<'] = $nowPage - 1; // 如果不是第一頁，才提供上一頁的按鈕
for ($i = 1; $i <= $manyPage; $i++)  $pageNav[$i] = $i;
if ($nowPage != $manyPage) $pageNav['>>'] = $nowPage + 1; // 如果不是最後頁，才提供下一頁的按鈕

// print_r($pageNav);
// exit();
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
      <tr>
        <td colspan="6" align="center">
          <?php
          foreach ($pageNav as $key => $value) {
          ?>
            <a href="./?page=crud_page&p=<?= $value ?>" <?= $nowPage == $value ? 'style="background:red"' : '' ?>><?= $key ?></a>
          <?php
          }
          ?>
        </td>
      </tr>
    </tfoot>
  </form>
</table>
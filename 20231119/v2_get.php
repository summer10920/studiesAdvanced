<?php
$rows = $db->query('SELECT * FROM animal')->fetchAll();
?>
<table width="100%">
  <thead>
    <tr align="left">
      <th>編號</th>
      <th>動物名字</th>
      <th>重量</th>
      <th>簡介資訊</th>
      <th>更新日期</th>
      <th>操作</th>
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
  <tbody>
    <?php foreach ($rows as $row) { ?>
      <tr>
        <td><?= $row['id'] ?></td>
        <td><?= $row['name'] ?></td>
        <td><?= $row['weight'] ?></td>
        <td><?= $row['info'] ?></td>
        <td><?= $row['date'] ?></td>
        <td>
          <!-- <button onclick="document.location.href='?page=crud_all&mode=mdy&id=13'">修改</button> -->
          <button onclick="document.location.href='?page=crud_all&m=<?= $row['id'] ?>'">修改</button>
          <button onclick="document.location.href='?page=crud_all&d=<?= $row['id'] ?>'">刪除</button>
        </td>
      </tr>
    <?php } ?>
  </tbody>
</table>
<?php
$rows = $db->query('SELECT * FROM animal')->fetchAll();
?>
<h1>SELECT PAGE</h1>

<table width="100%">
  <thead>
    <tr align="left">
      <th>編號</th>
      <th>動物名字</th>
      <th>重量</th>
      <th>簡介資訊</th>
      <th>更新日期</th>
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
      </tr>
    <?php } ?>
  </tbody>
</table>
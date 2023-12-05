<?php
$sqlCode = 'SELECT * FROM animal WHERE id=' . $_GET['m'];
$row = $db->query($sqlCode)->fetch();
?>
<form method="POST" style="
  background:lightblue;
  max-width:500px;
  margin:0 auto;
  padding:10px;
">
  <div>
    <h4>編號</h4>
    <?= $row['id'] ?>
  </div>
  <div>
    <h4>動物名字</h4>
    <input type="text" name="name" style="width: 100%;" value="<?= $row['name'] ?>">
  </div>
  <div>
    <h4>重量</h4>
    <input type="number" name="weight" style="width: 100%;" value="<?= $row['weight'] ?>">
  </div>
  <div>
    <h4>簡介資訊</h4>
    <textarea name="info" rows="4" style="width:100%"><?= $row['info'] ?></textarea>
  </div>
  <div style="margin-top:20px; text-align:center">
    <input type="submit" value="修改">
  </div>
</form>
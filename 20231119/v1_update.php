<?php
if (!empty($_POST)) { // 有提交form 才會有 post，有post 我們才建立SQL語法
  // $sqlCode = 'UPDATE animal SET name="Loki", weight=77, info="第二季好看",date=NOW() WHERE id=11';
  $sqlCode = '
  UPDATE animal SET
    name="' . $_POST['name'] . '",
    weight=' . $_POST['weight'] . ',
    info="' . $_POST['info'] . '",
    date=NOW()
  WHERE id=' . $_POST['id'];

  $db->query($sqlCode);
  header('location:./index.php?page=show_all'); // PHP轉址到另一個網頁請求，所以當下的form提交就到這裡結束了
}

?>
<h1>UPDATE PAGE</h1>

<form method="POST" style="
  background:lightblue;
  max-width:500px;
  margin:0 auto;
  padding:10px;
">
  <div>
    <h4>編號</h4>
    <input type="number" name="id" style="width: 100%;">
  </div>
  <div>
    <h4>動物名字</h4>
    <input type="text" name="name" style="width: 100%;">
  </div>
  <div>
    <h4>重量</h4>
    <input type="number" name="weight" style="width: 100%;">
  </div>
  <div>
    <h4>簡介資訊</h4>
    <textarea name="info" rows="4" style="width:100%"></textarea>
  </div>
  <div style="margin-top:20px; text-align:center">
    <input type="submit" value="修改">
  </div>
</form>
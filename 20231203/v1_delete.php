<?php
if (!empty($_POST)) { // 有提交form 才會有 post，有post 我們才建立SQL語法
  $sqlCode = 'DELETE FROM animal WHERE id=' . $_POST['id'];
  $db->query($sqlCode);
  header('location:./index.php?page=show_all'); // PHP轉址到另一個網頁請求，所以當下的form提交就到這裡結束了
}

?>
<h1>DELETE PAGE</h1>

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
  <div style="margin-top:20px; text-align:center">
    <input type="submit" value="刪除">
  </div>
</form>
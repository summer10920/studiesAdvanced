<?php
// var_dump(!empty($_POST));
if (!empty($_POST)) { // 有提交form 才會有 post，有post 我們才建立SQL語法
  // echo $sqlCode = '
  // INSERT INTO animal VALUE(null,"' . $_POST['name'] . '",' . $_POST['weight'] . ',"' . $_POST['info'] . '",NOW())
  // ';
  // var_dump($_POST['weight']);
  if (empty($_POST['weight'])) $_POST['weight'] = 0; //成立，代表沒有string，也就是空字串，幫他安排為null or 0
  // var_dump($_POST['weight']);

  $sqlCode = "
  INSERT INTO animal VALUE(null,'" . $_POST['name'] . "'," . $_POST['weight'] . ",'" . $_POST['info'] . "',NOW())
  ";

  /*
  INSERT INTO animal VALUE(null,"蝴蝶",1,"飛阿飛",NOW())
  INSERT INTO animal VALUE(null,'蝴蝶',1,'飛阿飛',NOW())
  echo 'A " B';
  echo "C ' D";
  $val='CC';
  echo $loki = 'AA'.$val.'BB'; //AACCBB
  */

  $db->query($sqlCode);
  // header('location:./index.php?page=add_animal'); // PHP轉址到另一個網頁請求，所以當下的form提交就到這裡結束了
  header('location:./index.php?page=show_all'); // PHP轉址到另一個網頁請求，所以當下的form提交就到這裡結束了
}

?>
<h1>INSERT PAGE</h1>

<form method="POST" style="
  background:lightblue;
  max-width:500px;
  margin:0 auto;
  padding:10px;
">
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
    <input type="submit" value="新增">
    <!-- <input type="reset" value="重置"> -->
  </div>
</form>
<?php
if (!empty($_GET['todo'])) {
  switch ($_GET['todo']) {
    case 'signup':
      if (!empty($_POST['who']))  // 存在且有東西
        echo '歡迎註冊, ' . $_POST['who'] . ' 大大!!';
      elseif (isset($_POST['who'])) { //存在且無值
        echo '帳號不可為空';
      } else {
        header('location:./form.php');
        echo 'bye';
      }
      break;
    case 'signin':
      break;
  }
} else {
?>
  <h1>hello world, form 表單處理!!</h1>
  <style>
    .full {
      width: 100%
    }
  </style>
  <div style="margin:50px auto;max-width:500px;width:80vw">
    <h3 style="text-align:center">
      <hr>會員註冊
      <hr>
    </h3>
    <form action="?todo=signup" method="POST">
      帳號：
      <input type="text" name="who" class="full">
      <br /><br />
      密碼：
      <input type="password" name="pwd" class="full">
      <br /><br />
      生日：
      <input type="date" name="birth" class="full">
      <br /><br />
      國籍：
      <select name="country" class="full">
        <option value="tw" selected>台灣</option>
        <option value="jp">日本</option>
        <option value="hk">香港</option>
      </select>
      <br><br />
      性別：
      <input type="radio" name="sex" value="man">男生
      <input type="radio" name="sex" value="woman">女生
      <br><br>
      專長：
      <input type="checkbox" name="skill[]" value="web">網頁開發
      <input type="checkbox" name="skill[]" value="art">平面設計
      <input type="checkbox" name="skill[]" value="rd">程式開發
      <br /><br />
      簡介：<br /><textarea name="aboutme" cols="30" rows="10" class="full"></textarea>
      <br /><br />
      <input type="reset" value="重置">
      <input type="submit" value="送出">
      <input type="button" value="純按鈕" onclick="console.log('Hello World')"> <!--通常被用在執行 JS 動作-->
      <br /><br />
      隱藏：<input type="hidden" name="noshow" value="showit"><!--隱藏不顯示但存在-->
    </form>
  </div>
<?php
}
?>
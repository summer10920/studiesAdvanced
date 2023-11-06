<?php
session_start();
if (!empty($_POST)) { //有post存在，開始檢查帳密
  // echo '有 POST';
  if ($_POST['who'] === 'admin' && $_POST['pwd'] === '1234') {
    $_SESSION['logged'] = true; //將登入狀況記起來，透過 session
    echo '
    <script>
      alert("歡迎 ' . $_POST['who'] . '!!");
    </script>
    ';
  } else {
    echo "
    <script>
      alert('帳密錯誤，請重新輸入!!');
      document.location.href = 'session_login.php';
    </script>
    ";
  }
} else { //沒有post
  // print_r($_SESSION);
  if (!empty($_SESSION['logged']) && $_SESSION['logged'] === true) { //有登入過的紀錄
    echo '
    <script>
      alert("你已登入，歡迎!!");
    </script>
    ';
  } else //沒有登入過的紀錄，踢回 login
    // echo '你沒有登入過';
    header('location:session_login.php'); //php告知client改變header重新網頁請求
}
?>
<h1>這裡是後台管理頁面</h1>

<a href="session_logout.php">
  <button>登出</button>
</a>
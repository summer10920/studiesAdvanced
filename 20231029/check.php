<?php

/****
 * 驗證帳號 == admin ,pwd == 1234
 * 不是，JS alert，JS 轉址回 login.html
 * 是，導向 mobile01
 ***** */
if (!empty($_POST)) {
  // echo '有 POST';
  if ($_POST['who'] === 'admin' && $_POST['pwd'] === '1234') {
    echo '
    <script>
      alert("歡迎!!' . $_POST['who'] . '，即將導向至後台頁面!!");
      document.location.href = "https://www.mobile01.com/";
    </script>
    ';
  } else {
    echo "
    <script>
      alert('帳密錯誤，請重新輸入!!');
      document.location.href = 'login.html';
    </script>
    ";
  }
} else header('location:login.html');

<?php
// 如果你已經登入過了，就不需要本網頁做登入請求
// 把你直接送到admin頁面去
session_start();
if (!empty($_SESSION['logged']) && $_SESSION['logged'] === true)
  header('location:session_admin.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      margin: 0;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
      background: url("https://picsum.photos/1920/1080/?random=10");
    }

    form {
      color: #ccc;
      text-align: center;
      backdrop-filter: blur(5px);
      background: #3333;
      margin: 0 auto;
      border: 1px solid #fff5;
      border-radius: 5px;
      box-shadow: 0 0 6px 2px #fbefef91;
      padding: 20px;
    }
  </style>
</head>

<body>
  <form action="session_admin.php" method="POST">
    <div>帳號： <input type="text" name="who" class="full" value="admin"></div>
    <div> 密碼： <input type="password" name="pwd" class="full" value="1234"></div>
    <hr>
    <input type="reset" value="重置">
    <input type="submit" value="送出">
  </form>
</body>

</html>
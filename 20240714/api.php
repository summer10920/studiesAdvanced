<?php

// echo '===$_GET START===';
// print_r($_GET);
// echo '===$_GET END===';

exit;

// if ($_GET['acc'] === 'loki' && $_GET['pwd'] === '5566') {
if ($_POST['acc'] === 'loki' && $_POST['pwd'] === '5566') {
?>
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>
    歡迎您的登入，Loki大大!!
  </body>

  </html>
<?php
} else {
?>
  <script>
    alert('登入失敗，請重新登入');
    history.go(-1);
  </script>
<?php
}

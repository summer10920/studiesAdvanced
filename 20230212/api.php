<?php
$string = '你的帳號為' . $_GET['acc'] . '\n密碼為' . $_GET['pwd'] . '\n信箱為' . $_GET['mail'] . '\n本系統將對資料庫進行會員資更新。感謝您的提交。';
?>
<script>
  // alert("<?= $string ?>");
  // location.href = "/form.html";
</script>

<?php
echo 'GET<br>';
print_r($_GET);
echo '<hr>';
echo 'POST<br>';
print_r($_POST);
echo '<hr>';
echo 'FILES<br>';
print_r($_FILES);
?>
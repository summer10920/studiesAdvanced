<h1>hello world, 檔案上傳</h1>

<style>
  form {
    display: flex;
    flex-direction: column;
    height: 8rem;
    justify-content: space-around;
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid;
  }
</style>

<!-- 1 files -->
<!--
<form action="file_get.php" method="post" enctype="multipart/form-data">
  <input type="text" name="name" value="loki">
  <input type="file" name="pic1">
  <input type="file" name="pic2">
  <input type="submit" value="上傳">
</form> -->
<!-- multiple files -->
<form action="file_get.php" method="post" enctype="multipart/form-data">
  <input type="text" name="name" value="loki">
  <input type="file" name="pics[]" multiple>
    <input type="submit" value="上傳">
</form>
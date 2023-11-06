<h1>hello world, 檔案取得</h1>
<?php
// print_r($_POST);
// print_r($_FILES);

/*
* // 1 files
* // copy($_FILES['pic1']['tmp_name'], 'uploads/' . date('YmdHis') . '_' . $_FILES['pic1']['name']); //from,to
* $localName = time() . '_' . $_FILES['pic1']['name'];
* copy($_FILES['pic1']['tmp_name'], 'uploads/' . $localName); //from,to
* echo '<img src="uploads/' . $localName . '">';
* // 可評估，透過SQL連線取得該user的圖片路徑，透過unlink刪除圖片
* unlink('uploads/' . $localName); //刪除指定檔案
*/

// multiple files
for ($i = 0; $i < count($_FILES['pics']['name']); $i++) {
  $localName = time() . '_' . $_FILES['pics']['name'][$i];
  copy($_FILES['pics']['tmp_name'][$i], 'uploads/' . $localName); //from,to
  echo '<img src="uploads/' . $localName . '">';
}

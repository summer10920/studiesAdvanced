<?php


print_r($_POST);

echo "<hr>";

print_r($_FILES);


$newname = time() . "_" . $_FILES['img']['name'];
copy($_FILES['img']['tmp_name'], "img/" . $newname);

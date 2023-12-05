<?php
$db = new PDO('mysql:host=127.0.0.1;dbname=php_11201;charset=utf8', 'loki', 'test');
$rows = $db->query('SELECT * FROM animal')->fetchAll();

/*****************
$loki='A';
//$loki=$loki.'B';  // AB
$loki.='B';
******************/

$htmlString = '';
foreach ($rows as $row) {
  // print_r($row);
  $htmlString .= '
  <tr>
    <td>' . $row['id'] . '</td>
    <td>' . $row['name'] . '</td>
    <td>' . $row['weight'] . '</td>
    <td>' . $row['info'] . '</td>
    <td>' . $row['date'] . '</td>
  </tr>
  ';
}
// print_r($rows);
?>
<h1>SELECT PAGE</h1>

<table width="100%">
  <thead>
    <tr align="left">
      <th>編號</th>
      <th>動物名字</th>
      <th>重量</th>
      <th>簡介資訊</th>
      <th>更新日期</th>
    </tr>
  </thead>
  <tbody>
    <!-- htmlString -->
    <?= $htmlString ?>
  </tbody>
</table>
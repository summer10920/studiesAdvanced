<?php
$rows = getOrderList();
$htmlCode = '';

/* rows=>htmlCode */

foreach ($rows as $row) {
  $selectDateAry = unserialize($row['selectDate']);
  // $selectDateCode = '';
  // foreach ($selectDateAry as $value) {
  //   $selectDateCode .= '<span class="badge bg-secondary me-1">' . $value . '</span>';
  // }
  $selectDateCode = '<span class="badge bg-secondary me-1">' . implode('</span><span class="badge bg-secondary me-1">', $selectDateAry) . '</span>';

  $selectPalletObj = unserialize($row['sellout']);
  $selectPalletCode = '';
  foreach ($selectPalletObj as $key => $value) {
    switch ($key) {
      case 'aArea':
        $selectPalletCode .= '<span class="badge rounded-pill bg-danger me-1">A 區 x ' . $value . '</span>';
        break;
      case 'bArea':
        $selectPalletCode .= '<span class="badge rounded-pill bg-warning me-1">B 區 x ' . $value . '</span>';
        break;
      case 'cArea':
        $selectPalletCode .= '<span class="badge rounded-pill bg-success me-1">C 區 x ' . $value . '</span>';
        break;
      case 'dArea':
        $selectPalletCode .= '<span class="badge rounded-pill bg-info me-1">D 區 x ' . $value . '</span>';
        break;
    }
  }

  echo '<hr>';


  # code...
  $htmlCode .= '
  <tr>
    <td>' . $row['name'] . '</td>
    <td>' . $selectDateCode . '</td>
    <td>' . $selectPalletCode . '</td>
    <td>' . $row['price'] . '</td>
    <td>' . $row['phone'] . ' | ' . $row['mail'] . '</td>
    <td>' . $row['createDate'] . '</td>
    <td>' . $row['id'] . '</td>
  </tr>
  ';
}

?>

<div class="container-fluid px-4">
  <h1 class="mt-4">訂購資料</h1>
  <div class="card mb-4">
    <div class="card-body">
      <table id="orderTable" class="table">
        <thead>
          <tr>
            <th>訂購人</th>
            <th>入住日</th>
            <th>購買帳位</th>
            <th>應收金額</th>
            <th>手機信箱</th>
            <th>訂購時間</th>
            <th>刪除操作</th>
          </tr>
        </thead>
        <tbody>
          <?= $htmlCode ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
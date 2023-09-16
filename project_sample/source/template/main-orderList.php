<?php
$rows = getOrderList();
$htmlCode = '';

foreach ($rows as $row) {
  $selectDateAry = unserialize($row['selectDate']);
  $selectDateStr =
    '<span class="badge bg-secondary me-1">' .
    implode('</span><span class="badge bg-secondary me-1">', $selectDateAry) .
    '</span>';

  $selectPalletObj = unserialize($row['sellout']);
  $selectPalletStr = '';
  foreach ($selectPalletObj as $key => $value) {
    switch ($key) {
      case 'aArea':
        $selectPalletStr .= '<span class="badge rounded-pill bg-danger me-1">A區 x ' . $value . '</span>';
        break;
      case 'bArea':
        $selectPalletStr .= '<span class="badge rounded-pill bg-warning me-1">B區 x ' . $value . '</span>';
        break;
      case 'cArea':
        $selectPalletStr .= '<span class="badge rounded-pill bg-success me-1">C區 x ' . $value . '</span>';
        break;
      case 'dArea':
        $selectPalletStr .= '<span class="badge rounded-pill bg-info me-1">D區 x ' . $value . '</span>';
        break;
    }
  }

  $getAry = [
    'do' => 'delOrder',
    'id' => $row['id'],
    'date' => $selectDateAry, //增加
    'pallet' => $selectPalletObj //增加
  ];
  //這裡可以string慢慢湊，或者利用http_build_query將array轉為get參數

  $dateNum = array_map(function ($date) {
    return strtotime($date);
  }, $selectDateAry);

  $lessDay = min($dateNum) < time() ?
    '<span class="btn btn-secondary btn-sm disabled">過期</span>' :
    '<a class="btn btn-danger btn-sm" href="function?' . http_build_query($getAry) . '">刪除</a>';

  $htmlCode .= '<tr>
    <td>' . $row['name'] . '</td>
    <td>' . $selectDateStr . '</td>
    <td>' . $selectPalletStr . '</td>
    <td>' . $row['price'] . '</td>
    <td>' . $row['phone'] . ' | ' . $row['mail'] . '</td>
    <td>' . $row['createDate'] . '</td>
    <td>' . $lessDay . '</td>
    </tr>';
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
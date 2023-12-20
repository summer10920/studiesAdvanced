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

  $getAry = [  //透過array，之後再透過http_build_query可以快速變成GET所有參數
    'do' => 'delOrder',
    'id' => $row['id'],
    'date' => $selectDateAry, //將該訂單的使用者選擇日期傳遞給api處理，好釋放回房況資訊
    'sellout' => $selectPalletObj //將該訂單的購買資訊傳遞給api處理，好釋放回房況資訊
  ];


  $dateOfStrToTime = array_map(function ($dateStr) {
    return strtotime($dateStr);
  }, $selectDateAry);

  // print_r($dateOfStrToTime);
  // echo min($dateOfStrToTime);
  // echo '<br>';
  // echo time();
  // if (min($dateOfStrToTime) < time()){
  //   過期的日子
  // }
  $lessDay = (min($dateOfStrToTime) < time()) ?
    '<span class="btn btn-secondary btn-sm disabled">過期</span>' :
    '<a class="btn btn-danger btn-sm" href="api.php?' . http_build_query($getAry) . '">刪除</a>';

  $htmlCode .= '
  <tr>
    <td>' . $row['name'] . '</td>
    <td>' . $selectDateCode . '</td>
    <td>' . $selectPalletCode . '</td>
    <td>' . $row['price'] . '</td>
    <td>' . $row['phone'] . ' | ' . $row['mail'] . '</td>
    <td>' . $row['createDate'] . '</td>
    <td>' . $lessDay . '</td>
    </tr>
    ';
}
// <td><a href="api.php?do=delOrder&id=' . $row['id'] . '">刪除</a></td>

?>

<div class="container-fluid px-4">
  <h1 class="mt-4">訂購資料</h1>
  <div class="card mb-4">
    <div class="card-body">
      <table id="orderListTable" class="table">
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
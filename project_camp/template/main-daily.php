<?php
function getDaily_table() {

  $palletDB = getPallet();
  $palletPrice = []; // 整理出所有pallet的價格
  foreach ($palletDB as $row) {
    $palletPrice[$row['name']] = [
      $row['normalPrice'], // 0 => 普通價格 900
      $row['holidayPrice'] // 1 => 假日價格 4500
    ];
  }
  $thead_Data = array_column($palletDB, 'total'); // [10,10,15,10]

  // $row = [
  //   'date' => '2023-12-24',
  //   'aArea' => 2,
  //   'bArea' => 5,
  //   'cArea' => 7,
  //   'dArea' => 10,
  //   'isHoliday' => true,
  //   'total' => 900
  // ];

  // function loki($row)  {
  //   global $palletPrice;
  //   $row['isHoliday'] = checkHoliday($row['data']);
  //   $row['total'] =
  //     $row['aArea'] * $palletPrice['aArea'][+$row['isHoliday']] +
  //     $row['bArea'] * $palletPrice['bArea'][+$row['isHoliday']] +
  //     $row['cArea'] * $palletPrice['cArea'][+$row['isHoliday']] +
  //     $row['dArea'] * $palletPrice['dArea'][+$row['isHoliday']];
  //   return $row;
  // }
  // $dailyDB = getDaily();
  // $tbody_Data = array_map('loki', $dailyDB);

  $tbody_Data = array_map(function ($row) use ($palletPrice) {
    $row['isHoliday'] = checkHoliday($row['date']);
    $row['total'] =
      $row['aArea'] * $palletPrice['aArea'][+$row['isHoliday']] +
      $row['bArea'] * $palletPrice['bArea'][+$row['isHoliday']] +
      $row['cArea'] * $palletPrice['cArea'][+$row['isHoliday']] +
      $row['dArea'] * $palletPrice['dArea'][+$row['isHoliday']];
    /*
      + boolean => 0 or 1
      a數量*(普通?假日)a價格 +
      b數量*(普通?假日)b價格 +
      c數量*(普通?假日)c價格 +
      d數量*(普通?假日)d價格
      */
    return $row;
  }, getDaily());

  return [$thead_Data, $tbody_Data];
}

$newRows = getDaily_table();
/****
 *  原本DB內只有局部結構資料5，這裡還缺少2欄，所以我們用PHP重構這個二維陣列使得資料完成我們要的5+2，
 *  如果哪天你php跟sql學得夠深，你應該用SQL語法去關聯(正規化)::
 *  _loki_pallet + _loki_daily_table => 整合出你想到的資料 5+2
 ****/

$htmlCode = '';
foreach ($newRows[1] as $row) {
  $htmlCode .= '
  <tr>
    <td><span class="badge bg-' . ($row['isHoliday'] ? 'danger' : 'secondary') . ' me-1">' . $row['date'] . '</span></td>
    <td>' . $row['aArea'] . '</td> 
    <td>' . $row['bArea'] . '</td>
    <td>' . $row['cArea'] . '</td>
    <td>' . $row['dArea'] . '</td>
    <td>' . $row['total'] . '</td>
  </tr>
  ';
}
?>

<div class="container-fluid px-4">
  <h1 class="mt-4">每日房況</h1>
  <div class="card mb-4">
    <div class="card-body">
      <table id="orderTable" class="table">
        <thead>
          <tr>
            <th>日期</th>
            <th><span class="badge rounded-pill bg-danger me-1">A區 x<?= $newRows[0][0] ?></span></th>
            <th><span class="badge rounded-pill bg-warning me-1">B區 x<?= $newRows[0][1] ?></span></th>
            <th><span class="badge rounded-pill bg-success me-1">C區 x<?= $newRows[0][2] ?></span></th>
            <th><span class="badge rounded-pill bg-info me-1">D區 x<?= $newRows[0][3] ?></span></th>
            <th>營業額</th>
          </tr>
        </thead>
        <tbody>
          <?= $htmlCode ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
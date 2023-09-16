<?php
$rows = getPallet();
$titleAry = [
  'aArea' => '河畔 × A區',
  'bArea' => '山間 × B區',
  'cArea' => '平原 × C區',
  'dArea' => '車屋 × D區',
];
$htmlCode = '';

foreach ($rows as $row) {
  $htmlCode .= '
  <div class="col">
    <div class="card mb-4">
      <div class="card-header">' . $titleAry[$row['name']] . '</div>
      <input type="hidden" name="id[]" value="' . $row['id'] . '">
      <div class="card-body">
        <div class="row row-cols-1 row-cols-sm-3 gy-2">
          <div class="col">
            <div class="form-floating">
              <input class="form-control" name="total[]" value="' . $row['total'] . '">
              <label>數量</label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating">
              <input class="form-control" name="normalPrice[]" value="' . $row['normalPrice'] . '">
              <label>平日價格</label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating">
              <input class="form-control" name="holidayPrice[]" value="' . $row['holidayPrice'] . '">
              <label>假日價格</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  ';
}
?>

<form class="container-fluid px-4" method="post" action="function?do=mdyPallet">
  <h1 class="mt-4">營位參數設定</h1>
  <div class="row row-cols-1 row-cols-sm-2">
    <?= $htmlCode ?>
  </div>
  <hr>
  <div class="text-center">
    <button class="btn btn-secondary" type="reset">復原</button>
    <button class="btn btn-primary" type="submit">修改</button>
  </div>
</form>
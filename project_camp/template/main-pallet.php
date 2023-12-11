<?php
// var_dump(getPallet());
$rows = getPallet();
$transTitle = [
  'aArea' => '河畔 × A區',
  'bArea' => '森林 × B區',
  'cArea' => '河畔 × C區',
  'dArea' => '河畔 × D區',
];
$htmlCode = '';
foreach ($rows as $row) {
  $htmlCode .= '
    <div class="col">
      <div class="card mb-4">
        <input type="hidden" name="id[]" value="' . $row['id'] . '">
        <div class="card-header">' . $transTitle[$row['name']] . '</div>
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

<form class="container-fluid px-4" action="./api.php?do=mdyPallet" method="POST">
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
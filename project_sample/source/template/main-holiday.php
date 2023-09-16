<?php
$rows = getHoliday();
$htmlCode = '';

foreach ($rows as $row) {
  $htmlCode .= '
  <div class="col">
    <div class="card mb-4">
      <div class="card-header">' . $row['year'] . '</div>
      <div class="card-body">
        <div class="form-floating">
          <input type="hidden" name="id[]" value="' . $row['id'] . '">
          <textarea name="date[]" style="min-height:30rem" class="form-control">' . $row['date'] . '</textarea>
          <label for="floatingTextarea">特殊假日</label>
        </div>
      </div>
    </div>
  </div>
';
}

?>
<form class="container-fluid px-4" method="post" action="function?do=mdyHoliday">
  <h1 class="mt-4">國定假日</h1>
  <div class="row row-cols-1 row-cols-sm-3">
    <?= $htmlCode ?>
  </div>
  <hr>
  <div class="text-center">
    <button class="btn btn-secondary" type="reset">復原</button>
    <button class="btn btn-primary" type="submit">修改</button>
  </div>
</form>
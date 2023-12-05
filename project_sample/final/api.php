<?php
require_once './function.php';
// api todo
if (isset($_GET['do'])) {
  switch ($_GET['do']) {
    case 'newOrder':
      // 前端payload資料 
      // userName: 假日測試
      // userPhone: 555
      // userMail: 555@55
      // selectDate: ["2023-02-25","2023-02-26","2023-02-27"]
      // sellout: {"aArea":0,"bArea":0,"cArea":2,"dArea":0}

      $selectDateAry = json_decode($_POST['selectDate']); //日期陣列
      $selloutAry = array_filter(json_decode($_POST['sellout'], true), function ($v) { //購買陣列
        return $v !== 0;
      });

      // 設計價目表
      $palletAry = [];
      foreach (getPallet() as $row) {
        $palletAry[$row['name']]['normalPrice'] = $row['normalPrice'];
        $palletAry[$row['name']]['holidayPrice'] = $row['holidayPrice'];
        $palletAry[$row['name']]['total'] = $row['total']; // 1-1. 追加
      }

      global $sql;
      $sum = 0; //總價計算前置準備
      foreach ($selectDateAry as $date) {
        ///////// start
        //1. 組合出檢查代碼，如果有結果代表爆掉了，就阻擋建立動作並離開php
        //SELECT * FROM `_loki_daily_state` WHERE date='2023-02-01' AND (aArea + 9 > 10 OR bArea + 9 > 10)
        $areaCheck = implode(' OR ', array_map(
          function ($value, $key) use ($palletAry) {
            return $key . ' + ' . $value . ' > ' . $palletAry[$key]['total']; //aArea + 5 > 10
          },
          $selloutAry,
          array_keys($selloutAry)
        ));

        // $resultCheck = $sql->select('daily_state', 'date="' . $date . '" AND (' . $areaCheck . ')');
        if ($sql->select('daily_state', 'date="' . $date . '" AND (' . $areaCheck . ')')) {
          echo 'PALLET FULL';
          exit();
        }

        // 2. 試著將不存在的日期補足
        // INSERT INTO _loki_daily_state (date) SELECT '2023-03-01' WHERE NOT EXISTS (SELECT * FROM _loki_daily_state WHERE date='2023-03-01')
        $checkYear = 'INSERT INTO _loki_daily_state (date) SELECT "' . $date . '" WHERE NOT EXISTS (SELECT * FROM _loki_daily_state WHERE date="' . $date . '")';
        $sql->query($checkYear);


        // 3. 翻新 _loki_daily_state 用，組合出 SET 代碼
        // UPDATE _loki_daily_state SET aArea = aArea + 1, bArea=bArea+2, cArea=cArea+3 WHERE date = '2023-02-01'
        $areaUpdate = implode(', ', array_map(
          function ($value, $key) {
            return '' . $key . ' = ' . $key . ' + ' . $value; //aArea = aArea + 1
          },
          $selloutAry,
          array_keys($selloutAry)
        ));
        $sql->query('UPDATE _loki_daily_state SET ' . $areaUpdate . ' WHERE date = "' . $date . '"');
        ///////// end

        foreach ($selloutAry as $key => $value) {
          // 每日每營位的總價疊加，value = 數量
          $sum += $palletAry[$key][checkHoliday($date) ? 'holidayPrice' : 'normalPrice'] * $value;
        }
      }

      //訂單資料
      $selectDateZip = serialize($selectDateAry); //提交用
      $selloutZip = serialize($selloutAry); //提交用
      $sqlCode = ['null', '\'' . $_POST['userName'] . '\'', '\'' . $_POST['userPhone'] . '\'', '\'' . $_POST['userMail'] . '\'', '\'' . $selectDateZip . '\'', '\'' . $selloutZip . '\'', $sum, 'NOW()',  0];

      //新增訂單至SQL
      if (saveOrder($sqlCode)) {
        header("Content-Type: application/json");
        echo json_encode(['STATE' => 'DONE']); //最後要回應給前端一個json被捕獲。
      } else echo 'SQL FAIL';

      exit();
      break;

    case 'delOrder':
      if (delOrder($_GET['id'])) {
        header('Location:admin.php');
        exit();
      } else echo 'SQL FAIL';
      break;

    case 'mdyPallet':
      // print_r($_POST);
      $flag = true;
      foreach ($_POST['id'] as $key => $value) {
        // "UPDATE _loki_pallet SET id=[value-1],name=[value-2],total=[value-3],normalPrice=[value-4],holidayPrice=[value-5] WHERE 1";
        $setAry = [
          'total=' . $_POST['total'][$key],
          'normalPrice=' . $_POST['normalPrice'][$key],
          'holidayPrice=' . $_POST['holidayPrice'][$key]
        ];

        $setStr = implode(', ', $setAry);
        if (!updatePallet($value, $setStr)) $flag = false;
      }

      if ($flag) {
        header('Location:pallet.php');
        exit();
      }
      break;

    case 'mdyHoliday':
      // print_r($_POST);
      $flag = true;
      foreach ($_POST['id'] as $key => $value) {
        $setStr = 'date=\'' . $_POST['date'][$key] . '\'';
        if (!updateHoliday($value, $setStr)) $flag = false;
      }

      if ($flag) {
        header('Location:holiday.php');
        exit();
      }
      break;

    case 'login':
      if (checkUserSaveSession($_POST['inputAccount'], $_POST['inputPassword']))
        header('Location:admin.php');
      else exit('access deny');
      break;

    case 'logout':
      unset($_SESSION['admin']);
      header('Location:./');
      break;
    default:
      break;
  }
}

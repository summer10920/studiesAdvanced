<?php
include_once('./function.php');

// api todo
if (isset($_GET['do'])) {
  switch ($_GET['do']) {
    case 'newOrder':
      // print_r($_POST);
      // Array
      // (
      //     [userName] => 123123
      //     [userPhone] => 123123
      //     [userMail] => 12123@123123
      //     [selectDate] => ["2024-01-10"]
      //     [sellout] => {"aArea":1,"bArea":0,"cArea":0,"dArea":0}
      // )
      // var_dump($_POST['selectDate']); // string  '["2024-01-10"]'
      // var_dump($_POST['sellout']); // string  '{"aArea":1,"bArea":0,"cArea":0,"dArea":0}'
      // var_dump(json_decode($_POST['selectDate'])); // array ["2024-01-10"]
      // var_dump(json_decode($_POST['sellout'])); // object  {"aArea":1,"bArea":0,"cArea":0,"dArea":0}
      // var_dump(serialize(json_decode($_POST['selectDate']))); // string(28) "a:1:{i:0;s:10:"2024-01-10";}"
      // var_dump(serialize(json_decode($_POST['sellout']))); // string(83) "O:8:"stdClass":4:{s:5:"aArea";i:1;s:5:"bArea";i:0;s:5:"cArea";i:0;s:5:"dArea";i:0;}"
      $selectDateZip = serialize(json_decode($_POST['selectDate']));
      // $selloutZip = serialize(json_decode($_POST['sellout'])); /// 有包含 0

      // var_dump(json_decode($_POST['sellout'], true)); //array  ["aArea"=>1,bArea":0,"cArea":0,"dArea":0]
      $ary = json_decode($_POST['sellout'], true); //array  ["aArea"=>1,bArea":0,"cArea":0,"dArea":0]
      $selloutZip = serialize(array_filter($ary, function ($item) {
        return $item !== 0;
      })); // 不包含 0

      $sqlFieldAry = [
        "null",
        "'" . $_POST['userName'] . "'",
        "'" . $_POST['userPhone'] . "'",
        "'" . $_POST['userMail'] . "'",
        "'" . $selectDateZip . "'",
        "'" . $selloutZip . "'",
        "9999",
        "NOW()",
        "0"
      ];

      header("Content-Type: application/json");
      // if (saveOrder($sqlFieldAry)) {   //string(129) "INSERT INTO _loki_order_list VALUES (null,'33','33','33@33','a:1:{i:0;s:10:"2024-01-12";}','a:1:{s:5:"aArea";i:3;}',9999,NOW(),0)"
      //   echo json_encode([
      //     'STATE' => 'DONE',
      //     'MSG' => '新增資料成功'
      //   ]); //最後要回應給前端一個 json 被捕獲。
      // } else echo json_encode([
      //   'STATE' => 'FAIL',
      //   'MSG' => '新增資料失敗'
      // ]);
      echo json_encode(
        saveOrder($sqlFieldAry) ?
          [
            'STATE' => 'DONE',
            'MSG' => '新增資料成功'
          ]
          :
          [
            'STATE' => 'FAIL',
            'MSG' => '新增資料失敗'
          ]
      ); //最後要回應給前端一個 json 被捕獲。
      break;
    case 'delOrder':
      if (deleteOrder($_GET['id'])) {
        header('Location:admin.php');
        // exit();
      } else echo 'SQL Code Fail';
      break;

    case 'mdyPallet':
      // print_r($_POST);
      // Array
      //   (
      //       [id] => Array
      //           (
      //               [0] => 1
      //               [1] => 2
      //               [2] => 3
      //               [3] => 4
      //           )

      //       [total] => Array
      //           (
      //               [0] => 10
      //               [1] => 20
      //               [2] => 30
      //               [3] => 40
      //           )

      //       [normalPrice] => Array
      //           (
      //               [0] => 1000
      //               [1] => 2000
      //               [2] => 3000
      //               [3] => 4000
      //           )

      //       [holidayPrice] => Array
      //           (
      //               [0] => 1501
      //               [1] => 1502
      //               [2] => 1503
      //               [3] => 1504
      //           )
      //   )
      $flag = true; //判斷機制 預設通過

      foreach ($_POST['id'] as $key => $value) {
        //UPDATE `_loki_pallet` SET `total` = '4', `normalPrice` = '400', `holidayPrice` = '150' WHERE `_loki_pallet`.`id` = 4;
        //$setStr="`total` = '4', normalPrice = '400', holidayPrice = '150'";


        $setAry = [
          'total = ' . $_POST['total'][$key],
          'normalPrice = ' . $_POST['normalPrice'][$key],
          'holidayPrice = ' . $_POST['holidayPrice'][$key],
          // 'normalPrice' => $_POST['normalPrice'][$key],
          // 'holidayPrice' => $_POST['holidayPrice'][$key],
        ];

        // echo $setStr = implode(', ', $setAry);
        if (!updatePallet($setAry, $value)) $flag = false;
      }
      // updatePallet('[...]', 1);
      // updatePallet('[...]', 2);
      // updatePallet('[...]', 3);
      // updatePallet('[...]', 4);
      if ($flag) header('Location:pallet.php');
      else echo 'SQL Query Fail';
      break;
    case 'mdyHoliday':
      // print_r($_POST);
      $flag = true; //判斷機制 預設通過
      foreach ($_POST['id'] as $key => $value) {
        $setAry = ['date="' . $_POST['date'][$key] . '"'];
        if (!updateHoliday($setAry, $value)) $flag = false;
      }
      if ($flag) header('Location:holiday.php');
      else echo 'SQL Query Fail';
      break;
  }
}

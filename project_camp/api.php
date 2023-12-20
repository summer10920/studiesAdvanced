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

      /************
      $selectDateZip = serialize(json_decode($_POST['selectDate']));
      
      // $selloutZip = serialize(json_decode($_POST['sellout'])); /// 有包含 0
      $ary = json_decode($_POST['sellout'], true); //array  ["aArea"=>1,bArea":0,"cArea":0,"dArea":0]
      $selloutZip = serialize(array_filter($ary, function ($item) {
        return $item !== 0;
      })); // 不包含 0
       ***********/
      $selectDateAry = json_decode($_POST['selectDate']);
      $selectDateZip = serialize($selectDateAry);

      $selloutAry = array_filter(json_decode($_POST['sellout'], true), function ($item) {
        return $item !== 0;
      });
      $selloutZip = serialize($selloutAry); // 不包含 0

      /////////////開始計算總金額 start
      $sum = 0;
      $palletAry = [];      //準備好DB的pallet金額資訊使用的陣列，key為房型名稱，value為兩種金額。之後可以快用key找到我想要的資料，範例如下
      /*
      $palletAry = [
        'aArea'=>['normalPrice'=>100,'holidayPrice'=>1000],
        'bArea'=>['normalPrice'=>100,'holidayPrice'=>1000],
        'cArea'=>['normalPrice'=>100,'holidayPrice'=>1000],
        'dArea'=>['normalPrice'=>100,'holidayPrice'=>1000],
      ];
      */
      foreach (getPallet() as $row) {
        // $palletAry[$row['name']]['normalPrice'] = $row['normalPrice'];
        // $palletAry[$row['name']]['holidayPrice'] = $row['holidayPrice'];
        $palletAry[$row['name']] = [
          'normalPrice' => $row['normalPrice'],
          'holidayPrice' => $row['holidayPrice'],
          'total' => $row['total'], /// 為了檢查訂單有沒有爆掉，特別再多增加該欄位
        ];
      }
      // var_dump($palletAry);

      //整理好國定假日的陣列
      $holidayAry = geHolidayAry();

      //將訂單的日期批次跑出來，先判定是不是假日
      foreach ($selectDateAry as $oneDate) {
        /**
         ************** 每日邏輯下要做三件事處理************
         * 第一步：每天進行計算小計之前，第一步先評估訂單是否有問題(超賣)，有問題終止交易
         * 
         * 2023-12-21 只剩 4 3 2 1 可賣 <=> daily state 1 2 3 4
         * 如果該訂單購買了 5 4 3 2 ，每區都爆掉，訂單無效
         * 如果下列有結果，就是超賣，爆掉了
         * SELECT * FROM _loki_daily_state WHERE date='2023-12-21' AND (
         * aArea+ 5(selloutAry of a) > 5(pallet's total) OR
         * bArea+ 4(selloutAry of b) > 5(pallet's total) OR
         * cArea+ 3(selloutAry of c) > 5(pallet's total) OR
         * dArea+ 2(selloutAry of d) > 5(pallet's total)
         * )
         * 
         * explode ::: 字串切割為陣列
         * implode ::: 陣列合併為字串
         * 
         * $areaEachStrAry=[
         * aArea+ 5(selloutAry of a) > 5(pallet's total),
         * bArea+ 4(selloutAry of b) > 5(pallet's total),
         * cArea+ 3(selloutAry of c) > 5(pallet's total),
         * dArea+ 2(selloutAry of d) > 5(pallet's total)
         * ];
         * 
         * areaLogicStr=implode(" OR ", areaEachStrAry);
         */

        //  aArea+ 5(user's post) > 5(pallet's total)
        $areaEachStrAry = array_map(function ($value, $key) use ($palletAry) {
          return $key . ' + ' . $value . ' > ' . $palletAry[$key]['total'] . '';
          // }, $selloutAry, ['aArea', 'bArea', 'cArea', 'dArea']);  //匿名含要傳遞兩2個參數，最後這裡要丟兩個陣列
        }, $selloutAry, array_keys($selloutAry));  //匿名含要傳遞兩2個參數，將sellout 做成兩個陣列，一個抽value 一個抽key 丟給 array_map ，使得匿名函式可以傳入兩個參數 value & key

        // Array
        // (
        //     [0] => aArea + 1 > 5
        //     [1] => bArea + 1 > 5
        //     [2] => cArea + 1 > 5
        //     [3] => dArea + 1 > 5
        // )
        $areaLogicStr = implode(" OR ", $areaEachStrAry);

        if ($sql->lokiSelect('daily_state', 'date="' . $oneDate . '" AND (' . $areaLogicStr . ')')) {
          /**
           * 有成立結果代表爆掉不能賣，這裡產生一些string訊息讓前端js能處理用戶可知道訂單失敗
           * 但素材沒有設計此回響動作。請同學理解。
           * */
          echo 'order fail';
          exit();
        };

        /****
         * 第二步，更新每日房況之前先確認是否該日房況
         * INSERT INTO _loki_daily_state (date) SELECT '2023-12-21' WHERE NOT EXISTS (SELECT * FROM _loki_daily_state WHERE date='2023-12-21')
         */
        $checkYear = 'INSERT INTO ' . $sql->prefix_name . 'daily_state (date) SELECT "' . $oneDate . '" WHERE NOT EXISTS (SELECT * FROM ' . $sql->prefix_name . 'daily_state WHERE date="' . $oneDate . '")';
        $sql->lokiQuery($checkYear);

        /***
         * 第三步，更新指定日房況
         * UPDATE _loki_daily_state SET aArea = aArea + 1, bArea=bArea+2, cArea=cArea+3 WHERE date = '2023-02-01'
         */
        $setAreaStr = implode(', ', array_map(
          function ($value, $key) {
            return '' . $key . ' = ' . $key . ' + ' . $value; //aArea = aArea + 1
          },
          $selloutAry, //value of array(selloutAry)
          array_keys($selloutAry) //key of array(selloutAry)
        ));

        // SET aArea = aArea + 1, bArea = bArea + 1, cArea = cArea + 3, dArea = dArea + 2
        $updateDailySQLStr = 'UPDATE ' . $sql->prefix_name . 'daily_state SET ' . $setAreaStr . ' WHERE date = "' . $oneDate . '"';
        $sql->lokiQuery($updateDailySQLStr);

        /****
         * 結束了，目前訂單的日期拆分每天，每天都要檢查是否爆掉，是否房況日期要補上，最後更新房況，
         * 當離開date 迴圈，接往下跑新增訂單
         */



        //ver 1::計算國定日
        // $dayWeek = date("D", strtotime($oneDate)); // 查出是星期幾，準備判定是否周六周日要算貴價格
        /*
        if($dayWeek == 'Sat' || $dayWeek == 'Sun' || in_array($oneDate, $holidayAry)){
          is Holiday;
        }else  is normalDay;
        */
        // $keyword = $dayWeek == 'Sat' || $dayWeek == 'Sun' || in_array($oneDate, $holidayAry) ? 'holidayPrice' : 'normalPrice';

        /*********
         *    $oneData='2023-12-22'  <==> normalPrice
         *    $selloutAry=['aArea'=>5,'bArea'=>3];   //指定一天情況下，批次檢查pallet的小計 (a_price*count+b_price*count+...)
         *********/
        // foreach ($selloutAry as $palletName => $orderCount) { // 該指定(一天)內，找出訂單所有的pallet名稱以及他的訂購數
        //   $sum += $palletAry[$palletName][$keyword] * $orderCount; // sum累加 所有指定的 pallet 名稱且該日($keyword是平日還假日價格 相乘買幾組
        // }

        //ver 2::搬移到fn::checkHoliday與其他代碼共用
        foreach ($selloutAry as $palletName => $orderCount) { // 該指定(一天)內，找出訂單所有的pallet名稱以及他的訂購數
          $sum += $palletAry[$palletName][checkHoliday($oneDate) ? 'holidayPrice' : 'normalPrice'] * $orderCount;
          // sum累加 所有指定的 pallet 名稱且該日($keyword是平日還假日價格 相乘買幾組
        }

        // var_dump($selloutAry);
      }
      // exit();

      /////////////開始計算總金額 end
      $sqlFieldAry = [
        "null",
        "'" . $_POST['userName'] . "'",
        "'" . $_POST['userPhone'] . "'",
        "'" . $_POST['userMail'] . "'",
        "'" . $selectDateZip . "'",
        "'" . $selloutZip . "'",
        $sum,
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
      //開始做delete假刪除
      if (deleteOrder($_GET['id'])) {

        //釋放房況
        foreach ($_GET['date'] as $oneDate) { // 一天一個更新房況
          // UPDATE _loki_daily_state SET aArea = aArea-1, bArea=bArea-2, cArea=cArea-3 WHERE date = '2023-02-01'
          $setAreaStr = implode(', ', array_map(
            function ($value, $key) {
              return '' . $key . ' = ' . $key . ' - ' . $value; //aArea = aArea - 1
            },
            $_GET['sellout'],
            array_keys($_GET['sellout'])
          ));

          $updateDailySQLStr = 'UPDATE ' . $sql->prefix_name . 'daily_state SET ' . $setAreaStr . ' WHERE date = "' . $oneDate . '"';
          $sql->lokiQuery($updateDailySQLStr);
        }
        //才轉址
        header('Location:admin.php');
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
    case 'login':
      if (checkUserSaveSession($_POST['inputAccount'], $_POST['inputPassword']))
        header('Location:admin.php');
      else exit('access deny');
      break;
    case 'logout':
      unset($_SESSION['admin']);
      header('Location:./');
      break;
  }
}

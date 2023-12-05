CREATE DATABASE `php_11201_project` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `php_11201_project`.`_loki_user` ( `id` INT NOT NULL AUTO_INCREMENT , `name` TEXT NOT NULL , `password` TEXT NOT NULL , `active` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
INSERT INTO `php_11201_project`.`_loki_user` (`id`, `name`, `password`, `active`) VALUES (NULL, 'admin', '1234', '1');

CREATE TABLE `php_11201_project`.`_loki_order_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `phone` TEXT NOT NULL,
  `mail` TEXT NOT NULL,
  `selectDate` TEXT NOT NULL,
  `sellout` TEXT NOT NULL,
  `price` INT NOT NULL,
  `createDate` DATETIME NOT NULL,
  `del` INT NOT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `php_11201_project`.`_loki_order_list`
VALUES(
  NULL,
  '訪客A',
  '0999999999',
  'userA@gmail.com',
  'a:2:{i:0;s:10:"2023-12-13";i:1;s:10:"2023-12-14";}',
  'O:8:"stdClass":4:{s:5:"aArea";i:1;s:5:"bArea";i:2;s:5:"cArea";i:0;s:5:"dArea";i:0;}',
  9999,
  NOW(),
  0
);
INSERT INTO `php_11201_project`.`_loki_order_list`
VALUES(
  NULL,
  '訪客B',
  '0988888888',
  'userB@gmail.com',
  'a:2:{i:0;s:10:"2023-12-15";i:1;s:10:"2023-12-18";}',
  'O:8:"stdClass":4:{s:5:"aArea";i:2;s:5:"bArea";i:3;s:5:"cArea";i:4;s:5:"dArea";i:0;}',
  99990,
  NOW(),
  0
);



-- array to string

-- name -- userName: 訪客姓名 / 訂購人
-- phone -- userPhone: 002233 信箱
-- mail --userMail: 123@123 / 訂購人手機
-- selectDate --selectDate: ["2023-12-14"] / 入住日 
-- sellout --sellout: {"aArea":2,"bArea":2,"cArea":0,"dArea":0} / 購買帳位
-- price --/ 應收金額
-- createDate --/ 訂購時間 : NOW()
-- del --/ 刪除操作

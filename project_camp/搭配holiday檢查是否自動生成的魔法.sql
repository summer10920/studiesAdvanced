"nationalHoliday": [
    "2023-01-02",
    "2023-01-20",
    "2023-01-23",
    "2023-01-24",
    "2023-01-25",
    "2023-01-26",
    "2023-01-27",
    "2023-02-27",
    "2023-02-28",
    "2023-04-03",
    "2023-04-04",
    "2023-04-05",
    "2023-06-22",
    "2023-06-23",
    "2023-09-29",
    "2023-10-09",
    "2023-10-10",
    "2024-01-01",
    "2024-01-02"
  ],


CREATE TABLE `project_camp`.`_loki_holiday` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` text NOT NULL,
  `date` text DEFAULT NULL,
  PRIMARY KEY (`id`))
) ENGINE = InnoDB;

INSERT INTO `_loki_holiday` VALUES (NULL, '2023', '2023-01-02\r\n2023-01-20\r\n2023-01-23\r\n2023-01-24\r\n2023-01-25\r\n2023-01-26\r\n2023-01-27\r\n2023-02-27\r\n2023-02-28\r\n2023-04-03\r\n2023-04-04\r\n2023-04-05\r\n2023-06-22\r\n2023-06-23\r\n2023-09-29\r\n2023-10-09\r\n2023-10-10');
INSERT INTO `_loki_holiday` VALUES (NULL, '2024', '2024-01-01');


INSERT INTO _loki_holiday (year) values (2024);

INSERT INTO _loki_holiday (year) values (YEAR(CURRENT_DATE())+1);

SELECT (YEAR(CURRENT_DATE())+0);
SELECT (YEAR(CURRENT_DATE())+1);
SELECT (YEAR(CURRENT_DATE())+2);

INSERT INTO _loki_holiday (year) SELECT (YEAR(CURRENT_DATE())+2);

INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+2 WHERE 1;

-- 先確定 DB 裡有沒有 2025
SELECT * FROM _loki_holiday WHERE year = YEAR(CURRENT_DATE())+2;


SELECT EXISTS (SELECT * FROM _loki_holiday WHERE year = YEAR(CURRENT_DATE())+2); --可以將有找到是否存在，透過SELECT 返回 boolean 0 or 1


-- 我想新增 +2年 到 DB，但條件是先確定 DB 裡有沒有 +2年


-- 使用 php 創造這三句語法給SQL執行，讓SQL自己判斷是否需要新增指令年分
INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+0 WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year = YEAR(CURRENT_DATE())+0);
INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+1 WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year = YEAR(CURRENT_DATE())+1);
INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+2 WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year = YEAR(CURRENT_DATE())+2);


-- 只會php
-- SELECT * FROM _loki_holiday WHERE year=2025;
-- if($rows.length == 0) ..query('INSERT INTO _loki_holiday (year) value(2025)');
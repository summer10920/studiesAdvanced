-- select 指令: 拿全部，*代表所有欄位都要
SELECT * FROM crud_study;
SELECT student,mat FROM crud_study;
SELECT student,mat FROM crud_study WHERE mat>=60;
-- insert
INSERT INTO crud_study (student,cht,mat) VALUES('阿妹',80,65);
-- update
UPDATE crud_study SET mat=85; -- 所有該資料表的資料都會mat 改成 85
UPDATE crud_study SET mat=85 WHERE student='loki'; -- 只是符合都會改到
UPDATE crud_study SET mat=100 WHERE id=1; -- 利用id只會符合一筆來指定修改
-- delete
DELETE FROM crud_study WHERE id=13; -- 抹除條件下的資料作真刪除
UPDATE crud_study SET del=1 WHERE id=1; -- 假刪除，規劃某 flag 代表他被刪除，需要搭配SELECT 都要考慮該flag
/*

*/
SELECT * FROM crud_study WHERE del!=1;
SELECT * FROM crud_study WHERE !del;

-- WHERE 條件
SELECT * FROM crud_study;
SELECT * FROM crud_study WHERE true;
SELECT * FROM crud_study WHERE 1;
SELECT * FROM crud_study WHERE id>5;
SELECT * FROM crud_study WHERE student='tom';
SELECT * FROM crud_study WHERE student='tom' OR student='max';
SELECT student,cht,mat FROM crud_study WHERE cht>59 AND mat>59;
SELECT student,cht,mat FROM crud_study WHERE cht>59 AND mat>59 AND !del;
SELECT student FROM crud_study WHERE student LIKE '真%';
SELECT student FROM crud_study WHERE student LIKE '%鮭%';
SELECT student FROM crud_study WHERE student LIKE '%之';


-- date field format
INSERT INTO date_study (feel,myDate) VALUES ('颱風天','2023-10-15');

INSERT INTO date_study (feel,myDate) 
VALUES ('颱風天','2023-10-15'), ('下雨天','2023-10-16'), ('晴天','2023-10-17'), ('雷陣雨','2023-10-18');
SELECT * FROM date_study;
SELECT DATE_FORMAT(myDate,'%Y/%m/%d, %W') FROM date_study;
SELECT DATE_FORMAT(timeStamp,'%Y/%m/%d, %W') FROM date_study;

--- limit 限定範圍
SELECT * FROM crud_study WHERE 1;
SELECT * FROM crud_study WHERE 1 LIMIT 5;
SELECT * FROM crud_study LIMIT 5; -- 拿5筆
SELECT * FROM crud_study LIMIT 3,3; -- 從 index 3 拿 3 筆

--- order 排序
SELECT * FROM crud_study WHERE 1 ORDER BY cht
SELECT * FROM crud_study WHERE 1 ORDER BY cht ASC -- 順序
SELECT * FROM crud_study WHERE 1 ORDER BY cht DESC; --反序
SELECT * FROM crud_study WHERE 1 ORDER BY cht DESC, mat DESC;
SELECT * FROM crud_study WHERE 1 ORDER BY cht DESC, mat DESC, id;

--- group by 群組化
/* 略，課程上完有空提醒 Loki 介紹 */

--- AS 別名
SELECT student as '姓名', cht as '國文', mat FROM crud_study WHERE 1
SELECT student as '姓名', cht as '國文', mat as '數學' FROM crud_study WHERE 1
SELECT student as '姓名', cht as '國文', mat as '數學', (cht+mat)/2 FROM crud_study WHERE 1
SELECT student as '姓名', cht as '國文', mat as '數學', (cht+mat)/2 as '平均分數' FROM crud_study WHERE 1
SELECT id, student as '姓名', cht as '國文', mat as '數學', (cht+mat)/2 as '平均分數' FROM crud_study WHERE cht>59 AND mat>59 ORDER BY (cht+mat)/2 DESC, id ASC

--- 練習
-- SELECT * FROM crud_study;
-- ex1: 搜尋 [mat] 60 以上的 [student]
SELECT student FROM crud_study WHERE mat>59;
-- ex2: 搜尋 [student] 中名字有阿的 [cht] 分數, 顯示 [student][cht]
SELECT student, cht FROM crud_study WHERE student LIKE '%阿%';
-- ex3: 新增3筆資料用SQL指令,
/* 
姓名  國文 數學
蘋果	100	100
鳳梨	99	50
檸檬	50	43
*/
INSERT INTO crud_study (student,mat,cht) VALUES 
  ('蘋果',100,100),
  ('鳳梨',50,99),
  ('檸檬',43,50);
-- ex4. 將整資料表調整，如果數學不及格的同學幫他們調分+10分
UPDATE crud_study SET mat=mat+10 WHERE mat<60;
-- ex5. 如果國文成績+10分會超過100分，直接DELETE刪除資料 (國文90分以上都刪除)
DELETE FROM crud_study WHERE cht+10>100;
DELETE FROM crud_study WHERE cht>90;
-- ex6. 找出國文成績最好的3位姓名
SELECT student FROM crud_study ORDER BY cht DESC LIMIT 3;
-- ex7. 找出數學成績排名6的名稱
SELECT student FROM crud_study ORDER BY mat DESC LIMIT 5,1;
-- ex8. 找出平均成績最差的3位，並顯示姓名,國文,數學,平均欄位表
SELECT student AS '姓名', cht AS '國文', mat AS '數學', (cht+mat)/2 AS '平均' FROM crud_study ORDER BY (cht+mat)/2;
SELECT student AS '姓名', cht AS '國文', mat AS '數學', (cht+mat)/2 AS '平均' FROM crud_study ORDER BY 平均 LIMIT 3;

-- 跨table搜尋，比較好的資料規範 (正規化處理)，幫助你規劃資料分類且彈性處理。
/* 略，等專題提早做完，提醒 Loki 回頭補充這裡該怎麼做 */


-- 建立 or 刪除 table
CREATEE TABLE php_11201.animal (
  id INT UNSIGNED AUTO_INCREMENT,
  name TEXT,
  weight INT,
  info TEXT,
  date DATETIME,
  PRIMARY KEY(id)
);

DROP TABLE php_11201.animal;

INSERT INTO animal VALUES (null,'長頸鹿',55,'脖子長長的',NOW());


UPDATE animal SET weight=333 WHERE id=3


-- INSERT INTO animal VALUES 
--     (null,"河馬",75,"肥肥粉紅",NOW()),
--     (null,"浣熊",15,"美國小偷刻板印象",NOW()),
--     (null,"斑馬",125,"過馬路要小心",NOW());
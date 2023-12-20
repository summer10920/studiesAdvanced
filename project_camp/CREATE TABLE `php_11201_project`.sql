CREATE TABLE `php_11201_project`.`_loki_daily_state` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `aArea` INT NOT NULL DEFAULT 0,
  `bArea` INT NOT NULL DEFAULT 0,
  `cArea` INT NOT NULL DEFAULT 0,
  `dArea` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) 

INSERT INTO `_loki_daily_state` (`id`, `date`, `aArea`, `bArea`, `cArea`, `dArea`)
VALUES 
  (NULL, '2023-12-21', 1, 2, 3, 4),
  (NULL, '2023-12-22', 3, 5, 7, 9),
  (NULL, '2023-12-23', 3, 5, 7, 9),
  (NULL, '2023-12-24', 2, 3, 4, 5);


INSERT INTO `_loki_daily_state` (`id`, `date`, `aArea`, `bArea`, `cArea`, `dArea`)
VALUES 
  (NULL, '2023-12-15', 3, 2, 3, 4);
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-12-17 10:14:07
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `php_11201_project`
--
CREATE DATABASE IF NOT EXISTS `php_11201_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `php_11201_project`;

-- --------------------------------------------------------

--
-- 資料表結構 `_loki_daily_state`
--

CREATE TABLE `_loki_daily_state` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `aArea` int(11) NOT NULL DEFAULT 0,
  `bArea` int(11) NOT NULL DEFAULT 0,
  `cArea` int(11) NOT NULL DEFAULT 0,
  `dArea` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `_loki_daily_state`
--

INSERT INTO `_loki_daily_state` (`id`, `date`, `aArea`, `bArea`, `cArea`, `dArea`) VALUES
(1, '2023-12-21', 6, 7, 6, 4),
(2, '2023-12-22', 3, 5, 7, 9),
(3, '2023-12-23', 3, 5, 7, 9),
(4, '2023-12-24', 2, 3, 4, 5),
(5, '2023-12-15', 3, 2, 3, 4),
(6, '2024-01-17', 2, 2, 6, 4),
(7, '2024-01-01', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `_loki_holiday`
--

CREATE TABLE `_loki_holiday` (
  `id` int(11) NOT NULL,
  `year` text NOT NULL,
  `date` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `_loki_holiday`
--

INSERT INTO `_loki_holiday` (`id`, `year`, `date`) VALUES
(1, '2023', '2023-01-02\r\n2023-01-20\r\n2023-01-23\r\n2023-01-24\r\n2023-01-25\r\n2023-01-26\r\n2023-01-27\r\n2023-02-27\r\n2023-02-28\r\n2023-04-03\r\n2023-04-04\r\n2023-04-05\r\n2023-06-22\r\n2023-06-23\r\n2023-09-29\r\n2023-10-09\r\n2023-10-10\r\n'),
(3, '2022', '2022-01-01'),
(14, '2024', '2024-01-01\r\n2024-02-08\r\n2024-02-09\r\n2024-02-12\r\n2024-02-13\r\n2024-02-14\r\n2024-02-28\r\n2024-04-04\r\n2024-04-05\r\n2024-06-10\r\n2024-09-17\r\n2024-10-10'),
(15, '2025', '2025-01-01\r\n2025-01-02\r\n2025-05-01');

-- --------------------------------------------------------

--
-- 資料表結構 `_loki_order_list`
--

CREATE TABLE `_loki_order_list` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `phone` text NOT NULL,
  `mail` text NOT NULL,
  `selectDate` text NOT NULL,
  `sellout` text NOT NULL,
  `price` int(11) NOT NULL,
  `createDate` datetime NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `_loki_order_list`
--

INSERT INTO `_loki_order_list` (`id`, `name`, `phone`, `mail`, `selectDate`, `sellout`, `price`, `createDate`, `del`) VALUES
(1, '訪客A', '0999999999', 'userA@gmail.com', 'a:2:{i:0;s:10:\"2023-12-13\";i:1;s:10:\"2023-12-14\";}', 'O:8:\"stdClass\":4:{s:5:\"aArea\";i:1;s:5:\"bArea\";i:2;s:5:\"cArea\";i:0;s:5:\"dArea\";i:0;}', 9999, '2023-12-03 14:35:03', 1),
(2, '訪客B', '0988888888', 'userB@gmail.com', 'a:2:{i:0;s:10:\"2023-12-15\";i:1;s:10:\"2023-12-18\";}', 'O:8:\"stdClass\":4:{s:5:\"aArea\";i:2;s:5:\"bArea\";i:3;s:5:\"cArea\";i:4;s:5:\"dArea\";i:0;}', 99990, '2023-12-03 14:35:03', 0),
(3, '123123', '123123', '12123@123123', 'a:1:{i:0;s:10:\"2024-01-10\";}', 'a:1:{s:5:\"aArea\";i:1;}', 9999, '2023-12-10 09:42:15', 1),
(4, '33', '33', '33@33', 'a:1:{i:0;s:10:\"2024-01-12\";}', 'a:1:{s:5:\"aArea\";i:3;}', 9999, '2023-12-10 09:55:50', 1),
(5, '33', '33', '33@33', 'a:1:{i:0;s:10:\"2024-01-12\";}', 'a:1:{s:5:\"aArea\";i:3;}', 9999, '2023-12-10 10:02:20', 0),
(6, '33', '33', '33@33', 'a:1:{i:0;s:10:\"2023-12-21\";}', 'a:1:{s:5:\"aArea\";i:2;}', 9999, '2023-12-10 10:02:42', 0),
(7, 'asd', '22', '22@22', 'a:1:{i:0;s:10:\"2024-01-11\";}', 'a:1:{s:5:\"aArea\";i:1;}', 9999, '2023-12-10 10:03:37', 0),
(8, '123', '123', '123@123', 'a:1:{i:0;s:10:\"2023-12-13\";}', 'a:1:{s:5:\"bArea\";i:2;}', 9999, '2023-12-10 10:04:00', 1),
(9, 'aa', '22', 'cc@cc', 'a:1:{i:0;s:10:\"2024-01-04\";}', 'a:1:{s:5:\"aArea\";i:1;}', 9999, '2023-12-10 10:21:04', 0),
(10, '123', '123', '1232@2', 'a:1:{i:0;s:10:\"2023-12-21\";}', 'a:1:{s:5:\"aArea\";i:2;}', 50, '2023-12-17 09:13:32', 0),
(11, '11', '22', '33@33', 'a:2:{i:0;s:10:\"2024-01-10\";i:1;s:10:\"2024-01-11\";}', 'a:1:{s:5:\"aArea\";i:1;}', 0, '2023-12-17 09:42:12', 1),
(12, '11', '22', '33@33', 'a:2:{i:0;s:10:\"2023-12-22\";i:1;s:10:\"2023-12-23\";}', 'a:2:{s:5:\"aArea\";i:5;s:5:\"bArea\";i:3;}', 40500, '2023-12-17 10:27:05', 0),
(13, '一萬', '222', '22@22', 'a:2:{i:0;s:10:\"2023-12-23\";i:1;s:10:\"2023-12-24\";}', 'a:1:{s:5:\"bArea\";i:2;}', 10000, '2023-12-17 10:28:05', 0),
(14, '27 A 2', '22', '22@22', 'a:1:{i:0;s:10:\"2023-12-27\";}', 'a:1:{s:5:\"aArea\";i:2;}', 1800, '2023-12-17 11:19:11', 0),
(15, '20 A5', '55', '55@55', 'a:1:{i:0;s:10:\"2023-12-20\";}', 'a:1:{s:5:\"aArea\";i:5;}', 4500, '2023-12-17 14:06:49', 0),
(16, '20A5', '55', '55@55', 'a:1:{i:0;s:10:\"2023-12-20\";}', 'a:1:{s:5:\"aArea\";i:5;}', 4500, '2023-12-17 14:07:24', 0),
(17, '123', '123', '2@2', 'a:1:{i:0;s:10:\"2023-12-20\";}', 'a:2:{s:5:\"aArea\";i:1;s:5:\"bArea\";i:3;}', 6900, '2023-12-17 14:39:26', 0),
(18, '1 1 1', '111', '111@111', 'a:1:{i:0;s:10:\"2024-01-01\";}', 'a:4:{s:5:\"aArea\";i:1;s:5:\"bArea\";i:1;s:5:\"cArea\";i:1;s:5:\"dArea\";i:1;}', 11000, '2023-12-17 15:31:18', 0),
(19, '1 1 19', '55', '55@55', 'a:1:{i:0;s:10:\"2024-01-01\";}', 'a:4:{s:5:\"aArea\";i:19;s:5:\"bArea\";i:19;s:5:\"cArea\";i:19;s:5:\"dArea\";i:19;}', 209000, '2023-12-17 15:31:48', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `_loki_pallet`
--

CREATE TABLE `_loki_pallet` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `total` int(11) NOT NULL,
  `normalPrice` int(11) NOT NULL,
  `holidayPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `_loki_pallet`
--

INSERT INTO `_loki_pallet` (`id`, `name`, `total`, `normalPrice`, `holidayPrice`) VALUES
(1, 'aArea', 20, 900, 4500),
(2, 'bArea', 20, 2000, 2500),
(3, 'cArea', 20, 3000, 3000),
(4, 'dArea', 20, 1000, 1000);

-- --------------------------------------------------------

--
-- 資料表結構 `_loki_user`
--

CREATE TABLE `_loki_user` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `password` text NOT NULL,
  `token` text NOT NULL,
  `expire` datetime DEFAULT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `_loki_user`
--

INSERT INTO `_loki_user` (`id`, `name`, `password`, `token`, `expire`, `active`) VALUES
(1, 'admin', '1234', '7d0ff86479eae4de21a59d8ffbb64025', '2023-12-17 17:16:25', 1),
(2, 'loki', '1234', '84f0bce615af545c8ee8efee397ab3dd', '2023-12-17 17:18:49', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `_loki_daily_state`
--
ALTER TABLE `_loki_daily_state`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `_loki_holiday`
--
ALTER TABLE `_loki_holiday`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `_loki_order_list`
--
ALTER TABLE `_loki_order_list`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `_loki_pallet`
--
ALTER TABLE `_loki_pallet`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `_loki_user`
--
ALTER TABLE `_loki_user`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `_loki_daily_state`
--
ALTER TABLE `_loki_daily_state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `_loki_holiday`
--
ALTER TABLE `_loki_holiday`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `_loki_order_list`
--
ALTER TABLE `_loki_order_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `_loki_pallet`
--
ALTER TABLE `_loki_pallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `_loki_user`
--
ALTER TABLE `_loki_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

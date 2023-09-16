-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.1.40-MariaDB
-- PHP 版本： 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `project_camp`
--

-- --------------------------------------------------------

--
-- 資料表結構 `_loki_daily_state`
--

CREATE TABLE `_loki_daily_state` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `aArea` int(11) NOT NULL,
  `bArea` int(11) NOT NULL,
  `cArea` int(11) NOT NULL,
  `dArea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `_loki_daily_state`
--

INSERT INTO `_loki_daily_state` (`id`, `date`, `aArea`, `bArea`, `cArea`, `dArea`) VALUES
(1, '2023-02-01', 2, 4, 6, 4),
(2, '2023-02-22', 3, 5, 7, 9),
(3, '2023-02-23', 3, 5, 7, 9),
(4, '2023-02-24', 2, 3, 4, 5),
(5, '2023-03-01', 0, 5, 0, 0),
(6, '2023-03-23', 2, 3, 4, 5),
(7, '2023-02-18', 1, 2, 3, 0),
(8, '2023-03-11', 0, 0, 3, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `_loki_holiday`
--

CREATE TABLE `_loki_holiday` (
  `id` int(11) NOT NULL,
  `year` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `_loki_holiday`
--

INSERT INTO `_loki_holiday` (`id`, `year`, `date`) VALUES
(1, '2023', '2023-01-02\r\n2023-01-20\r\n2023-01-23\r\n2023-01-24\r\n2023-01-25\r\n2023-01-26\r\n2023-01-27\r\n2023-02-27\r\n2023-02-28\r\n2023-04-03\r\n2023-04-04\r\n2023-04-05\r\n2023-05-22\r\n2023-06-22\r\n2023-06-23\r\n2023-09-29\r\n2023-10-09\r\n2023-10-10'),
(14, '2024', '2024-01-01'),
(15, '2025', '2025-01-01\r\n2025-01-02');

-- --------------------------------------------------------

--
-- 資料表結構 `_loki_order_list`
--

CREATE TABLE `_loki_order_list` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `mail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `selectDate` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sellout` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `createDate` datetime NOT NULL,
  `del` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `_loki_order_list`
--

INSERT INTO `_loki_order_list` (`id`, `name`, `phone`, `mail`, `selectDate`, `sellout`, `price`, `createDate`, `del`) VALUES
(1, '客戶 A', '0988123123', 'aa@gmail.com', 'a:3:{i:0;s:10:\"2023-02-12\";i:1;s:10:\"2023-02-22\";i:2;s:10:\"2023-02-23\";}', 'O:8:\"stdClass\":4:{s:5:\"aArea\";i:1;s:5:\"bArea\";i:2;s:5:\"cArea\";i:3;s:5:\"dArea\";i:4;}', 9999, '2023-02-11 00:02:34', 0),
(2, '客戶 B', '0977456456', 'bb@gmail.com', 'a:3:{i:0;s:10:\"2023-02-22\";i:1;s:10:\"2023-02-23\";i:2;s:10:\"2023-02-24\";}', 'O:8:\"stdClass\":4:{s:5:\"aArea\";i:2;s:5:\"bArea\";i:3;s:5:\"cArea\";i:4;s:5:\"dArea\";i:5;}', 5555, '2023-02-11 00:02:34', 0),
(10, 'Final', '1234', 'ww@ww', 'a:1:{i:0;s:10:\"2023-02-18\";}', 'a:3:{s:5:\"aArea\";i:1;s:5:\"bArea\";i:2;s:5:\"cArea\";i:3;}', 2147483647, '0000-00-00 00:00:00', 0),
(11, 'DEBUG', '111', '11@11', 'a:1:{i:0;s:10:\"2023-03-11\";}', 'a:1:{s:5:\"cArea\";i:1;}', 2147483647, '0000-00-00 00:00:00', 0),
(12, 'DEBUG', '111', '11@11', 'a:1:{i:0;s:10:\"2023-03-11\";}', 'a:1:{s:5:\"cArea\";i:1;}', 3000, '2023-02-17 22:04:05', 0),
(13, 'DEBUGAAA', '111', '11@11', 'a:1:{i:0;s:10:\"2023-03-11\";}', 'a:1:{s:5:\"cArea\";i:1;}', 3000, '2023-02-17 22:06:23', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `_loki_pallet`
--

CREATE TABLE `_loki_pallet` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` int(11) NOT NULL,
  `normalPrice` int(11) NOT NULL,
  `holidayPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `_loki_pallet`
--

INSERT INTO `_loki_pallet` (`id`, `name`, `total`, `normalPrice`, `holidayPrice`) VALUES
(1, 'aArea', 10, 100, 1000),
(2, 'bArea', 15, 200, 2000),
(3, 'cArea', 10, 300, 3000),
(4, 'dArea', 10, 400, 4000);

-- --------------------------------------------------------

--
-- 資料表結構 `_loki_user`
--

CREATE TABLE `_loki_user` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire` datetime NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `_loki_user`
--

INSERT INTO `_loki_user` (`id`, `name`, `password`, `token`, `expire`, `active`) VALUES
(1, 'admin', '1234', 'a48655669cda443b14bce0a39a53a012', '2023-02-17 22:40:02', 1);

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
-- 在傾印的資料表使用自動增長(AUTO_INCREMENT)
--

--
-- 使用資料表自動增長(AUTO_INCREMENT) `_loki_daily_state`
--
ALTER TABLE `_loki_daily_state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用資料表自動增長(AUTO_INCREMENT) `_loki_holiday`
--
ALTER TABLE `_loki_holiday`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 使用資料表自動增長(AUTO_INCREMENT) `_loki_order_list`
--
ALTER TABLE `_loki_order_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用資料表自動增長(AUTO_INCREMENT) `_loki_pallet`
--
ALTER TABLE `_loki_pallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動增長(AUTO_INCREMENT) `_loki_user`
--
ALTER TABLE `_loki_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

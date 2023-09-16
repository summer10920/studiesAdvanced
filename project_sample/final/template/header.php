<?php
require_once("./function.php");
if (empty($_SESSION['admin'])) header('Location:/');
checkPermission();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="description" content="洛奇度假村 - 後台" />
  <meta name="author" content="Loki Jiang" />
  <title>洛奇度假村 - 後台</title>

  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/jq-3.6.0/dt-1.13.1/datatables.min.css" />
  <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/jq-3.6.0/dt-1.13.1/datatables.min.js"></script>

  <link href="/plugins/admin-styles.css" rel="stylesheet" />
  <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
</head>

<body class="sb-nav-fixed">
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <a class="navbar-brand ps-3" href="index.html">洛奇度假村 - 後台</a>
    <!-- Sidebar Toggle-->
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
    <!-- Navbar-->
    <ul class="navbar-nav ms-auto me-3 me-lg-4">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" data-bs-toggle="dropdown"><i class="fas fa-user fa-fw"></i></a>
        <ul class="dropdown-menu dropdown-menu-end">
          <!-- <li><a class="dropdown-item" href="#!">帳戶設定</a></li>
          <li><a class="dropdown-item" href="#!">登入紀錄</a></li>
          <li>
            <hr class="dropdown-divider" />
          </li> -->
          <li><a class="dropdown-item" href="function?do=logout">登出</a></li>
        </ul>
      </li>
    </ul>
  </nav>
  <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
          <div class="nav">
            <div class="sb-sidenav-menu-heading">訂房資訊</div>
            <a class="nav-link" href="admin.php">
              <i class="sb-nav-link-icon fas fa-clipboard-list"></i>訂單資料</a>
            <a class="nav-link" href="daily.php">
              <i class="sb-nav-link-icon fas fa-calendar-days"></i>每日房況</a>
            <a class="nav-link" href="holiday.php">
              <i class="sb-nav-link-icon fas fa-calendar-plus"></i>國定假日</a>
            <a class="nav-link" href="pallet.php">
              <i class="sb-nav-link-icon fas fa-pallet"></i>營位參數設定</a>
            <!-- <div class="sb-sidenav-menu-heading">Addons</div>
            <a class="nav-link" href="#!">
              <i class="sb-nav-link-icon fas fa-chart-area"></i>媒體庫</a>
            <a class="nav-link" href="#!">
              <i class="sb-nav-link-icon fas fa-table"></i>管理帳戶</a>
            <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts">
              <i class="sb-nav-link-icon fas fa-columns"></i>前台設定 <i class="fas fa-angle-down sb-sidenav-collapse-arrow"></i>
            </a>
            <div class="collapse" id="collapseLayouts" data-bs-parent="#sidenavAccordion">
              <nav class="sb-sidenav-menu-nested nav">
                <a class="nav-link" href="#!">幻燈片</a>
                <a class="nav-link" href="#!">小圖</a>
                <a class="nav-link" href="#!">探索體驗</a>
                <a class="nav-link" href="#!">遊客服務</a>
                <a class="nav-link" href="#!">營區守則</a>
                <a class="nav-link" href="#!">頁尾資訊</a>
              </nav>
            </div> -->
          </div>
        </div>
        <div class="sb-sidenav-footer">
          <div class="small">Logged in as:</div> Admin
        </div>
      </nav>
    </div>
    <div id="layoutSidenav_content">
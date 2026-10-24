# 結業專案：洛奇旅行

這個資料夾是 `05-project/`，留給期末的旅行社網站。規格之後才補進這裡；現在先看講義 [結業專案：洛奇旅行](https://summer10920.github.io)（`lokiTech-15day-12-project-travel`）。

品牌是**洛奇旅行**。前台用 React 與 Tailwind，四條路由：

| 路徑 | 頁面 |
| --- | --- |
| `/` | 首頁主視覺 |
| `/tours` | 行程列表，可依地點、天數篩選 |
| `/tours/:id` | 行程詳情 |
| `/booking` | 報名 |

`/admin` 只在本機做行程的增刪改。行程欄位是 `id`、`title`、`place`、`days`、`price`、`image`、`intro`。報名欄位是 `tourId`、`name`、`email`、`people`。json-server 只在本機；佈上 GitHub Pages 後改讀專案裡的 JSON。

畫面元件沿用前面的作業：`SiteHeader`、`Hero`、`TourList`／`TourCard`、`TourDetail`、`BookingForm`、`SiteFooter`。路由從 `react-router` 引入。

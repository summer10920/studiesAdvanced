// console.log("test123");

// scroll to id
$("#lokimenu a, a#scrolltop").click(function () {
  let who = $(this).attr("href"); //目標名稱
  let val = $(who).offset().top - $("#lokimenu").innerHeight() + 1; //該目標之定位點值
  $("html").animate(
    { scrollTop: val }, 1000, "swing"
  );
});

spy(); // 確保網頁第一次執行時，讓畫面的active在正確的呈現
bgmenu(); //check menu bg

// 每次有滑鼠滾動時，就觸發這兩個函式
$(window).scroll(() => {
  spy(); // scroll spy
  bgmenu(); //check menu bg
});

// 每次螢幕尺寸變化時，就觸發此函式
$(window).resize(() => {
  bgmenu(); //check menu bg
});


// 處理spy的函式
function spy() {
  let nowat = $(window).scrollTop();
  $('section').each(function () {
    let
      id = $(this).attr('id'),
      offset = $(this).offset().top - $("#lokimenu").innerHeight(),
      height = $(this).innerHeight();

    if (offset <= nowat && nowat < offset + height) {
      $("#lokimenu a").removeClass('active');
      $(`#lokimenu a[href='#${id}']`).addClass('active');
    };
  });
}

//處理BGMENU
function bgmenu() {
  /* 控制 Header's Navbar 的 bg-dark 因 scroll 而變動。*/
  let
    totalw = $(window).innerWidth(),
    nowat = $(window).scrollTop(),
    offset = $("#lokimenu").innerHeight() + 1,
    height = $("#lokislider").innerHeight();
  if (nowat <= height - offset) { //slider 內
    if (totalw >= 976) $("#lokimenu").removeClass("bg-dark");
    else $("#lokimenu").addClass("bg-dark");
    $("#scrolltop").removeClass("shown");
  }
  else { //已脫離
    if (totalw >= 976) $("#lokimenu").addClass("bg-dark");
    $("#scrolltop").addClass("shown");
  }
}
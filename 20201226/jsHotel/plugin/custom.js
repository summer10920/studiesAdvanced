// console.log($("#lokiMenu nav"));  //能找到nav

// scroll to id
$("#lokiMenu a,#scrollTop").click(function () {
  const who = $(this).attr("href");//#lokiFood
  const val = $(who).offset().top - $("#lokiMenu").innerHeight() + 1;
  $("html").animate({ scrollTop: val }, 1000, "swing");
});

// scroll spy
function spy() {
  const nowat = $(window).scrollTop();
  $("section").each(function () {
    const
      id = $(this).attr("id"),
      offset = $(this).offset().top - $("#lokiMenu").innerHeight(),
      height = $(this).innerHeight();

    if (offset <= nowat && nowat <= offset + height) { //目前網頁的top落在session範圍內
      $(`#lokiMenu a`).removeClass("active");
      $(`#lokiMenu a[href='#${id}']`).addClass("active");
    }
  });
}

// meng background spy
function bgmenu() {
  // 根據scroll是否在slider內而決定lokiMenu是否持有.bg-dark
  const
    nowat = $(window).scrollTop(),
    offset = $("#lokiMenu").innerHeight() + 1,
    height = $("#lokiSlider").innerHeight(),
    totalw = $(window).innerWidth();

  if (totalw >= 992) { //畫面大於手機尺寸以上時
    if (nowat <= height - offset) { //目前在slider內
      $("#lokiMenu").removeClass("bg-dark");
      $("#scrollTop").removeClass("shown");
    } else { //離開slider
      $("#lokiMenu").addClass("bg-dark");
      $("#scrollTop").addClass("shown");
    }
  } else $("#lokiMenu").addClass("bg-dark");
}

$(window).scroll(() => {
  spy();
  bgmenu();
}).resize(bgmenu);

spy();
bgmenu();


wow = new WOW(
  {
  boxClass:     'lokiwow',      // default
  animateClass: 'animate__bounceInLeft', // default
  offset:       400,          // default
  // mobile:       true,       // default
  // live:         true        // default
}
)
wow.init();

// 取消oncontextmenu預設行為(鎖右鍵)
document.oncontextmenu=function(event){
  event.preventDefault();
}


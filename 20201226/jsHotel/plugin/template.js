$(document).ready(() => {
  // console.log($("#lokiMenu nav")); //空的
  const data = {
    lokiMenu: "fixed-top bg-dark",
    lokiSlider: "carousel slide",
    lokiRoom: "container py-5",
    lokiFacility: "py-5 text-white",
    lokiFood: "container py-5",
    lokiTrans: "embed-responsive py-5",
    lokiContact: "bg-dark text-white py-5",
    lokiAds: "bg-secondary text-center py-5 text-light",
    lokiFooter: "bg-dark text-muted text-center py-2"
  }

  for (const key in data)
    $("#" + key).load(`./view/${key}.html`).addClass(data[key]);
  // console.log($("#lokiMenu nav")); //空的
  //load HTML是事後取回的(非同步)，所以對這些控制的JS必須用getScript來拿回才能操作
  $.getScript("./plugin/custom.js");

});


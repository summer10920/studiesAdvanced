!function () {
  const lokiLightBox = document.querySelector('#lokiLightBox');
  document.querySelectorAll('#lokiPark .col').forEach(item => {
    // 複製縮圖到燈箱的控制區
    // ------------------------------------------------------
    const minImg = item.querySelector('img').cloneNode();
    minImg.title = item.querySelector('h5').textContent;
    minImg.removeAttribute('class');
    lokiLightBox.querySelector('.control').appendChild(minImg);

    // 同時這些 minImg 也要有 click 事件
    // ------------------------------------------------------
    minImg.addEventListener('click', (e) => {
      lokiLightBox.querySelector('.mainZone img').src = e.target.src;
      lokiLightBox.querySelector('.mainZone p').textContent = e.target.title;
    });

    // 當對這個 col item click => open light box
    // ------------------------------------------------------
    item.addEventListener('click', () => {
      lokiLightBox.removeAttribute('style');

      // method1: 直接從 col 再取得一次塞入主圖文
      // lokiLightBox.querySelector('.mainZone img').src = item.querySelector('img').src;
      // lokiLightBox.querySelector('.mainZone p').textContent = item.querySelector('h5').textContent;

      // method2:資訊都已經被minImg帶入了，可以直接用minImg的資訊塞入主圖文，更快的是模擬JS去click minImg
      minImg.click();
    });
  });

  // 點擊燈箱 black 區域 => close light box
  // ------------------------------------------------------
  lokiLightBox.querySelector('.backdrop').addEventListener('click', () => {
    lokiLightBox.style.display = 'none';
  });
}();
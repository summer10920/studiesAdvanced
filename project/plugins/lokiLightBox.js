(() => {
  const initLightBox = () => {
    const lightBox = document.querySelector('#lokiLightBox'); // 整個燈箱
    const targetControl = lightBox.querySelector('.control'); // 燈箱的小圖區
    const mainZone = lightBox.querySelector('.mainZone'); // 燈箱的主區

    document.querySelectorAll('#lokiPark .col').forEach((item) => {
      // 1. 建立縮圖與文字放到燈箱下排
      const minImg = item.querySelector('img').cloneNode();
      minImg.dataset.str = item.querySelector('h5').textContent;
      targetControl.appendChild(minImg);

      // 2. 開啟燈箱
      item.addEventListener('click', () => {
        lightBox.classList.add('open');
        // 一打開就偷偷的做換圖片
        minImg.click(); // 用JS幫他對指定圖做click
      });

      // 3. 對小圖規劃click事件
      minImg.addEventListener('click', (event) => {
        // mainZone.querySelector('img').src = event.target.src;
        // mainZone.querySelector('p').textContent = event.target.dataset.str;
        mainZone.querySelector('img').src = minImg.src;
        mainZone.querySelector('p').textContent = minImg.dataset.str;
      });
    });

    // 點黑色背景可以關閉燈箱
    lightBox.querySelector('.backdrop').addEventListener('click', (e) => {
      lightBox.classList.remove('open');
    });
  };

  initLightBox();
})(); // IIFE

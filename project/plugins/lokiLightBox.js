(() => {
  const initLightBox = () => {
    const lightBox = document.querySelector('#lokiLightBox');
    const targetControl = lightBox.querySelector('.control');

    document.querySelectorAll('#lokiPark .col').forEach((item) => {
      // 1. 建立縮圖與文字放到燈箱下排
      const minImg = item.querySelector('img').cloneNode();
      minImg.dataset.str = item.querySelector('h5').textContent;
      targetControl.appendChild(minImg);

      // 2. 開啟燈箱
      item.addEventListener('click', () => {
        lightBox.classList.add('open');
      });
    });

    // 點黑色背景可以關閉燈箱
    lightBox.querySelector('.backdrop').addEventListener('click', (e) => {
      lightBox.classList.remove('open');
    });
  };

  initLightBox();
})(); // IIFE


!function () {  // 使用 IIFE 防止污染全域變數

  // 初始工作
  const init = () => {
    const lightBoxNode = document.querySelector('#lokiLightBox');
    const mainZoeNode = lightBoxNode.querySelector('.mainZone');
    const controlNode = lightBoxNode.querySelector('.control');

    // col 為每個照片主題
    document.querySelectorAll('#lokiPark .col').forEach((colNode) => {
      //找小圖並複製成為新node，然後塞到燈箱control區
      const newMinImgNode = colNode.querySelector('img').cloneNode();
      newMinImgNode.dataset.label = colNode.querySelector('h5').textContent;

      // 順便幫 minImg 綁 click
      newMinImgNode.addEventListener('click', (e) => {
        mainZoeNode.querySelector('img').src = newMinImgNode.src;
        mainZoeNode.querySelector('p').textContent = newMinImgNode.dataset.label;
      });

      controlNode.append(newMinImgNode);

      // 規劃每個 col 事件 click，打開燈箱
      colNode.addEventListener('click', () => {
        // 偷換好主圖和文字後，再打開燈箱

        // method 1: 想辦法把當下 col 內的 img 跟 string 傳到 mainZoeNode 替換
        // mainZoeNode.querySelector('img').src = colNode.querySelector('img').src;
        // mainZoeNode.querySelector('p').textContent = colNode.querySelector('h5').textContent;

        // method 2: 把 minImgNode 的 click 事件觸發
        newMinImgNode.click();


        //打開燈箱
        lightBoxNode.classList.add('active');
      });

    });

    // 燈箱的黑色背景指定 click 對自己做關閉
    // -------------------------------------------------------------
    // method 1
    // lightBoxNode.querySelector('.backdrop').addEventListener('click', () => {
    //   lightBoxNode.classList.remove('active');
    // });

    // method 2
    // lightBoxNode.querySelector('.backdrop').addEventListener('click', (e) => {
    //   e.target.parentNode.classList.remove('active');
    // });

    // method 3
    lightBoxNode.querySelector('.backdrop').addEventListener('click', function () {
      this.parentNode.classList.remove('active');
    });
    // -------------------------------------------------------------

  };


  //初始化執行
  init();
}();
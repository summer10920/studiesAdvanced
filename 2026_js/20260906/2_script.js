// ctrl +? => 快速註解就是將這裡內容無效化忽略，不會執行:用途為說明或是故意暫時取消指令

// 這是要求瀏覽器將指定的文字顯示在 CONSOLE 裡面

console.log("hello world, 世界你好!!!");

// console.log(50 * 3 + 30);

const num = 50 * 3 + 30; // 將右邊結果存入變數 num 裡面

/* 這叫多行註解
    console.warn(num);
    console.error(num);
    console.info(num);
    */
console.log(num);

/*
 * script 想寫在哪裡都可以，但要注意如果有要操作 DOM(畫面內容) 的話
 * script 要放在 body 的最後面，
 * 或是要等到 DOM 讀取完成後才可以操作 DOM
 * 否則會操作失敗(因為畫面還沒生成，無法讀取)
 */

document.querySelector("h1").innerText = "這是 JS 透過 DOM 改變的文字";

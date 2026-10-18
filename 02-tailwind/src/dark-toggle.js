import "./style.css";
import "./dark-manual.css";

// TODO: 講義「選讀：手動切換（@custom-variant）」。
// 找到 #theme-toggle。還沒存過時先跟 prefers-color-scheme，在 <html> 加上或拿掉 class dark。
// 按按鈕時切換 class，把 "dark" 或 "light" 寫進 localStorage，並依狀態把按鈕文字改成「切換亮色」或「切換深色」。
const button = document.querySelector("#theme-toggle");
button?.addEventListener("click", () => {});

// TODO: 講義「主動拋出錯誤」
// divide：b === 0 時 throw new Error('除數不能為 0')，否則 return a / b
// 除以 0 不會自己變成例外，所以要自己丟
// try 裡先印 divide(10, 2)，再呼叫 divide(10, 0)。後面那行不會跑到
// catch 印 error.name 與 error.message
// try 外面印「程式繼續」
// 另一個 try 丟出字串 '不是 Error 物件'，印 typeof、name、message
// 換你試試：b < 0 時 throw new Error('除數不能為負')，另寫 try 呼叫 divide(10, -1)

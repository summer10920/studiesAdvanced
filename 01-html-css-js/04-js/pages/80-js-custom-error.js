// TODO: 講義「自訂錯誤」
// class ValidationError extends Error，建構式 super(message) 並設定 this.name
// checkUser：沒有資料、沒有名稱丟 ValidationError；年齡為負丟 Error
// 通過時 return name + ' 通過'
// run 用 try 呼叫 checkUser；instanceof ValidationError 印「驗證」，否則印「其他」
// 依序跑：有名稱與年齡、null、只有年齡、名稱正確但年齡為負
// 換你試試：run({ age: 20 })

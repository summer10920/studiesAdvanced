// TODO: 講義「輸入驗證」
// 不是字串就 throw new TypeError('電子郵件必須是字串')
// 空字串 throw new Error('電子郵件不能為空')
// 沒有 @ 就 throw new Error('電子郵件格式不正確')
// 通過 return true
// processEmail：try 裡驗證成功就印「驗證成功」與原信箱
// catch 印 error.name 與 error.message
// 依序測 'user@example.com'、''、'invalid-email'、123
// 換你試試：'a@b' 與 null

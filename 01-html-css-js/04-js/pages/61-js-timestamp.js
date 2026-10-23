// TODO: 講義「時間戳記」
// new Date(0) 印出 toISOString 與 toString，台灣本地是 08:00
// new Date('2026-08-01T00:00:00Z') 的 getTime，以及 Date.now()
// Unix 秒 1785542400 乘 1000 轉回 Date；getTime 除以 1000 得回秒
// 兩個 Date 相減，並與 getTime 相減對照
// 第二行以台灣 UTC+8 為例；Date.now() 依執行時間而定
// 換你試試：new Date(86400000).toISOString()，應為 1970-01-02 的 UTC 午夜

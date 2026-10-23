// TODO: 講義「提早 return」
// averageRaw(total, count) 直接回傳 total / count，呼叫 (240, 3)、(240, 0)、(0, 0) 觀察結果
// average(total, count) 開頭先檢查：count <= 0 或 total < 0 時印出原因並 return null
// 通過檢查才回傳 total / count，呼叫 (240, 3)、(240, 0)、(-10, 2)
// 換你試試：加上 total > count * 100 的檢查，再呼叫 (500, 3)
// printScore(name, score) 不需要回傳值：分數不在 0～100 時印出「無效」並用 return; 結束，否則印出分數
// 呼叫 printScore('Amy', 88)、printScore('Ben', 120)

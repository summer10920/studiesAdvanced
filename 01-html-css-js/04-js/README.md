# JavaScript 練習

對應講義「JavaScript 基礎：值、函式、陣列與模組」（`lokiTech-15day-06-js-basics`）與「JavaScript：BOM、DOM 與事件」（`lokiTech-15day-07-js-dom`）。pages/ 裡每一頁是該節的起點，完成的寫法在講義裡。

第 06 天的課堂 demo 把程式寫在同一份 HTML 的 script，方便對照，結果看 DevTools 的 Console。`pages/01-js-inline.html` 本來就是內嵌。外部檔是實務做法，`pages/02-js-console.html` 仍用 src 載入同名 js，用來對路徑。

選讀模組 82、83 維持多個檔，因為要示範 import 與 export。第 07 天從 `pages/85-js-window.html` 開始，課堂 demo 也把程式寫在同一份 HTML。畫面會跟著程式改變。選讀頁可以先跳過。

用 VS Code 開啟 `01-html-css-js/`。對 `04-js/index.html` 用 Live Server 開啟。寬螢幕左邊是選單，窄螢幕改成上方選單。

第 06 天 filter 的完成版是 `42-js-filter.html.final`。模組完成頁是 `82-js-module.html.final`。

資料檔是 `82-js-module-data.js`，入口程式是同名的 js.final。

第 07 天方向鍵的完成版是 `139-js-arrow.html.final`。打字的完成版是 `140-js-type.html.final`。

蓄力的完成版是 `141-js-charge.html.final`。待辦清單的完成版是 `147-js-todo.html.final`。

打地鼠的完成版是 `148-js-mole.html.final`。模組腳本 `90-js-module.html` 仍載入同名 js，用來對照載入時機。

- `pages/01-js-inline.html`：程式寫在頁面的 script 裡
- `pages/02-js-console.html`：用 console.log 看結果
- `pages/03-js-comment.html`：註解留給讀程式的人
- `pages/04-js-dialog.html`：選讀：alert、confirm 與 prompt
- `pages/05-js-name.html`：宣告變數與命名
- `pages/06-js-let.html`：let 與 const 的差別
- `pages/07-js-scope.html`：區塊作用域
- `pages/08-js-types.html`：數字、字串與布林
- `pages/09-js-convert.html`：型別轉換
- `pages/10-js-special.html`：null、undefined 與 NaN
- `pages/11-js-string-basic.html`：建立與存取
- `pages/12-js-template.html`：模板字串
- `pages/13-js-prototype.html`：原型
- `pages/14-js-string.html`：查詢與判斷
- `pages/15-js-pad.html`：擷取與轉換
- `pages/16-js-arith.html`：算術與賦值
- `pages/17-js-compare.html`：比較時型別要相同
- `pages/18-js-logic.html`：邏輯運算子與短路求值
- `pages/19-js-nullish.html`：條件運算子與預設值
- `pages/20-js-if.html`：if、else if、else
- `pages/21-js-switch.html`：switch 對上一個值
- `pages/22-js-switch-group.html`：switch 合併多個 case
- `pages/23-js-for.html`：for 把天數數完
- `pages/24-js-while.html`：while、break 與 continue
- `pages/25-js-do.html`：選讀：do...while
- `pages/26-js-nested.html`：選讀：巢狀迴圈
- `pages/27-js-function.html`：宣告與呼叫
- `pages/28-js-params.html`：參數與引數
- `pages/29-js-return.html`：return 與回傳值
- `pages/30-js-guard.html`：提早 return
- `pages/31-js-default-param.html`：預設參數
- `pages/32-js-rest.html`：選讀：其餘參數
- `pages/33-js-anonymous.html`：匿名函式
- `pages/34-js-arrow.html`：箭頭函式
- `pages/35-js-callback.html`：函式當作參數
- `pages/36-js-closure.html`：選讀：閉包
- `pages/37-js-array.html`：建立、索引與 length
- `pages/38-js-mutate.html`：新增與刪除元素
- `pages/39-js-const-ref.html`：const 與參考
- `pages/40-js-search.html`：搜尋與判斷
- `pages/41-js-map.html`：forEach 與 map
- `pages/42-js-filter.html`：filter（`.html.final` 為完成版）
- `pages/43-js-reduce.html`：reduce
- `pages/44-js-sort.html`：排序與組合
- `pages/45-js-chain.html`：方法串接
- `pages/46-js-set.html`：選讀：Set
- `pages/47-js-object.html`：建立與存取屬性
- `pages/48-js-object-update.html`：新增修改與刪除屬性
- `pages/49-js-method.html`：方法
- `pages/50-js-optional.html`：可選串連
- `pages/51-js-keys.html`：靜態方法
- `pages/52-js-entries.html`：走訪欄位
- `pages/53-js-map.html`：選讀：Map
- `pages/54-js-this.html`：選讀：方法呼叫時的 this
- `pages/55-js-tours.html`：綜合練習
- `pages/56-js-math.html`：數學常數與基本運算
- `pages/57-js-round.html`：取整數與四捨五入
- `pages/58-js-random.html`：最大值、最小值與亂數
- `pages/59-js-lotto.html`：綜合練習：大樂透產生器
- `pages/60-js-utc.html`：UTC 與時區
- `pages/61-js-timestamp.html`：時間戳記
- `pages/62-js-date-call.html`：new Date 與 Date 的差異
- `pages/63-js-date.html`：建立指定日期
- `pages/64-js-date-get.html`：讀取日期與時間
- `pages/65-js-date-set.html`：設定日期與時間
- `pages/66-js-date-format.html`：日期格式化與計算
- `pages/67-js-countdown.html`：綜合練習：跨年倒數
- `pages/74-js-error-type.html`：錯誤類型
- `pages/75-js-error-message.html`：讀懂錯誤訊息
- `pages/76-js-debug.html`：除錯技巧
- `pages/77-js-try.html`：try 與 catch 的基本結構
- `pages/78-js-finally.html`：finally
- `pages/79-js-throw.html`：主動拋出錯誤
- `pages/80-js-custom-error.html`：自訂錯誤
- `pages/81-js-validate.html`：輸入驗證
- `pages/68-js-array-destructure.html`：選讀：陣列解構
- `pages/69-js-destructure.html`：選讀：物件解構
- `pages/70-js-param-destructure.html`：選讀：函式參數解構
- `pages/71-js-array-spread.html`：選讀：陣列展開
- `pages/72-js-spread.html`：選讀：物件展開
- `pages/73-js-spread-call.html`：選讀：函式呼叫時展開
- `pages/82-js-module.html`：選讀：具名匯出與匯入（`.html.final`、`.js.final` 為完成版）
- `pages/83-js-default.html`：選讀：預設匯出
- `pages/85-js-window.html`：window 與 document
- `pages/86-js-dom-tree.html`：DOM 樹
- `pages/87-js-script-end.html`：script 放在 body 尾端
- `pages/88-js-defer.html`：defer
- `pages/89-js-ready.html`：DOMContentLoaded
- `pages/90-js-module.html`：模組腳本（仍載入同名 js）
- `pages/91-js-global.html`：全域物件
- `pages/92-js-location.html`：讀取網址
- `pages/93-js-redirect.html`：導向與重新載入
- `pages/94-js-history.html`：返回與前進
- `pages/95-js-state.html`：選讀：pushState 與 replaceState
- `pages/96-js-size.html`：視窗與螢幕尺寸
- `pages/97-js-scroll.html`：捲動位置
- `pages/98-js-media.html`：選讀：媒體查詢與深色模式
- `pages/99-js-navigator.html`：語言與連線
- `pages/100-js-clipboard.html`：寫入剪貼簿
- `pages/101-js-print.html`：列印
- `pages/102-js-confirm.html`：alert、confirm 與 prompt
- `pages/103-js-timeout.html`：setTimeout 與 clearTimeout
- `pages/104-js-interval.html`：setInterval 與 clearInterval
- `pages/105-js-frame.html`：選讀：requestAnimationFrame
- `pages/106-js-query.html`：querySelector
- `pages/107-js-query-all.html`：querySelectorAll
- `pages/108-js-query-scope.html`：在容器裡找
- `pages/109-js-up.html`：往上找
- `pages/110-js-down.html`：往下找
- `pages/111-js-side.html`：同層元素
- `pages/112-js-match.html`：matches
- `pages/113-js-by-id.html`：選讀：getElementById
- `pages/114-js-live.html`：選讀：即時集合
- `pages/115-js-content.html`：textContent 與 innerText
- `pages/116-js-inner.html`：innerHTML
- `pages/117-js-outer.html`：outerHTML
- `pages/118-js-prop.html`：attribute 與 property
- `pages/119-js-attr.html`：屬性方法
- `pages/120-js-field.html`：一般 property
- `pages/121-js-bool.html`：布林 property
- `pages/122-js-dataset.html`：dataset
- `pages/123-js-class.html`：classList
- `pages/124-js-style.html`：style
- `pages/125-js-computed.html`：getComputedStyle
- `pages/126-js-rect.html`：尺寸與位置
- `pages/127-js-create.html`：建立與插入
- `pages/128-js-node-move.html`：移動、複製與移除
- `pages/129-js-template.html`：選讀：template 元素
- `pages/130-js-listen.html`：addEventListener
- `pages/131-js-unlisten.html`：removeEventListener
- `pages/132-js-onclick.html`：選讀：onclick
- `pages/133-js-target.html`：target 與 currentTarget
- `pages/134-js-pointer.html`：滑鼠座標
- `pages/135-js-keyinfo.html`：鍵盤資訊
- `pages/136-js-prevent.html`：preventDefault
- `pages/137-js-input.html`：input 與 change
- `pages/138-js-keydown.html`：keydown
- `pages/139-js-arrow.html`：方向鍵移動（`.html.final` 為完成版）
- `pages/140-js-type.html`：打字小遊戲（`.html.final` 為完成版）
- `pages/141-js-charge.html`：空白鍵蓄力（`.html.final` 為完成版）
- `pages/142-js-delegate.html`：事件委派
- `pages/143-js-bubble.html`：選讀：捕獲與冒泡
- `pages/144-js-form-value.html`：value 與 checked
- `pages/145-js-submit.html`：送出與檢查
- `pages/146-js-render.html`：狀態與重繪
- `pages/147-js-todo.html`：綜合練習：待辦清單（`.html.final` 為完成版）
- `pages/148-js-mole.html`：打地鼠（`.html.final` 為完成版）

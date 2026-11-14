import D01 from './demos/01-hello.jsx';
import D02 from './demos/02-fragment.jsx';
import D03 from './demos/03-expr.jsx';
import D04 from './demos/04-style.jsx';
import D05 from './demos/05-class.jsx';
import D06 from './demos/06-early.jsx';
import D07 from './demos/07-ternary.jsx';
import D08 from './demos/08-and.jsx';
import D09 from './demos/09-zero.jsx';
import D10 from './demos/10-or.jsx';
import D11 from './demos/11-nullish.jsx';
import D12 from './demos/12-down.jsx';
import D13 from './demos/13-tree.jsx';
import D13b from './demos/13b-tree-split.jsx';
import D14 from './demos/14-place.jsx';
import D15 from './demos/15-card.jsx';
import D16 from './demos/16-board.jsx';
import D17 from './demos/17-props.jsx';
import D18 from './demos/18-defaults.jsx';
import D19 from './demos/19-callback.jsx';
import D20 from './demos/20-children.jsx';
import D21 from './demos/21-state.jsx';
import D22 from './demos/22-multi.jsx';
import D23 from './demos/23-snapshot.jsx';
import D24 from './demos/24-updater.jsx';
import D25 from './demos/25-batch.jsx';
import D26 from './demos/26-rules.jsx';
import D27 from './demos/27-add.jsx';
import D28 from './demos/28-remove.jsx';
import D29 from './demos/29-edit.jsx';
import D30 from './demos/30-object.jsx';
import D31 from './demos/31-nested.jsx';
import D32 from './demos/32-event.jsx';
import D33 from './demos/33-target.jsx';
import D34 from './demos/34-pick.jsx';
import D35 from './demos/35-prevent.jsx';
import D36 from './demos/36-map.jsx';
import D37 from './demos/37-filter.jsx';
import D38 from './demos/38-empty.jsx';
import D39 from './demos/39-key.jsx';
import D40 from './demos/40-input.jsx';
import D41 from './demos/41-area.jsx';
import D42 from './demos/42-select.jsx';
import D43 from './demos/43-check.jsx';
import D44 from './demos/44-radio.jsx';
import D45 from './demos/45-fields.jsx';
import D46 from './demos/46-submit.jsx';
import D47 from './demos/47-useid.jsx';
import D48 from './demos/48-effect.jsx';
import D49 from './demos/49-deps.jsx';
import D50 from './demos/50-timer.jsx';
import D51 from './demos/51-loop.jsx';
import D52 from './demos/52-lint.jsx';
import D52b from './demos/52b-lint-fixed.jsx';
import D53 from './demos/53-load.jsx';
import D54 from './demos/54-empty.jsx';
import D55 from './demos/55-abort.jsx';
import D56 from './demos/56-get.jsx';
import D57 from './demos/57-post.jsx';
import D58 from './demos/58-put.jsx';
import D59 from './demos/59-delete.jsx';
import D60 from './demos/60-items-demo.jsx';
import D61 from './demos/61-derive.jsx';
import D61b from './demos/61b-derive-fixed.jsx';
import D62 from './demos/62-click.jsx';
import D62b from './demos/62b-click-event.jsx';
import D63 from './demos/63-hook.jsx';
import D64 from './demos/64-toggle.jsx';
import D65 from './demos/65-hook-deps.jsx';
import D66 from './demos/66-twice.jsx';
import D67 from './demos/67-lift.jsx';
import D68 from './demos/68-siblings-split.jsx';
import D68b from './demos/68b-siblings.jsx';
import D69 from './demos/69-drill.jsx';
import D70 from './demos/70-context.jsx';
import D71 from './demos/71-contextDemo/index.jsx';
import D72 from './demos/72-default.jsx';
import D72b from './demos/72b-use-context.jsx';
import D73 from './demos/73-memo.jsx';
import D73b from './demos/73b-memo-use.jsx';
import D74 from './demos/74-memo-component.jsx';
import D74b from './demos/74b-memo-wrap.jsx';
import D75 from './demos/75-callback.jsx';
import D75b from './demos/75b-callback-use.jsx';
import D76 from './demos/76-ref.jsx';
import D76b from './demos/76b-ref-prop.jsx';
import D76c from './demos/76c-ref-callback.jsx';
import D77 from './demos/77-ref-count.jsx';
import D78 from './demos/78-reducer-count.jsx';
import D79 from './demos/79-reducer-state.jsx';
import D80 from './demos/80-reducer.jsx';
import D81 from './demos/81-propsDemo/index.jsx';
import D82 from './demos/82-providerDemo/index.jsx';
import D83 from './demos/83-action.jsx';
import D84 from './demos/84-action-state.jsx';
import D84b from './demos/84b-form-status.jsx';
import D85 from './demos/85-optimistic.jsx';
import D86 from './demos/86-state-pages.jsx';
import Homework09 from './homework/09-homework.jsx';
import Homework10 from './homework/10-homework.jsx';

export const demos = [
  {
    id: '01',
    title: '函式元件',
    group: '09 建立專案',
    optional: false,
    Component: D01,
  },
  {
    id: '02',
    title: 'Fragment',
    group: '09 JSX',
    optional: false,
    Component: D02,
  },
  {
    id: '03',
    title: '表達式',
    group: '09 JSX',
    optional: false,
    Component: D03,
  },
  {
    id: '04',
    title: '屬性名稱與 style 物件',
    group: '09 JSX',
    optional: false,
    Component: D04,
  },
  {
    id: '05',
    title: 'className',
    group: '09 JSX',
    optional: false,
    Component: D05,
  },
  {
    id: '06',
    title: '提早 return',
    group: '09 JSX',
    optional: false,
    Component: D06,
  },
  {
    id: '07',
    title: '三元運算子',
    group: '09 JSX',
    optional: false,
    Component: D07,
  },
  {
    id: '08',
    title: '邏輯運算子與短路求值',
    group: '09 JSX',
    optional: false,
    Component: D08,
  },
  {
    id: '09',
    title: '邏輯運算子與短路求值（2）',
    group: '09 JSX',
    optional: false,
    Component: D09,
  },
  {
    id: '10',
    title: '邏輯運算子與短路求值（3）',
    group: '09 JSX',
    optional: false,
    Component: D10,
  },
  {
    id: '11',
    title: '邏輯運算子與短路求值（4）',
    group: '09 JSX',
    optional: false,
    Component: D11,
  },
  {
    id: '12',
    title: '由父層傳入',
    group: '09 單向資料流',
    optional: false,
    Component: D12,
  },
  {
    id: '13',
    title: '拆分元件',
    group: '09 單向資料流',
    optional: false,
    Component: D13,
  },
  {
    id: '13b',
    title: '拆分元件（2）',
    group: '09 單向資料流',
    optional: false,
    Component: D13b,
  },
  {
    id: '14',
    title: '狀態的位置',
    group: '09 單向資料流',
    optional: false,
    Component: D14,
  },
  {
    id: '15',
    title: 'default export',
    group: '09 元件',
    optional: true,
    Component: D15,
  },
  {
    id: '16',
    title: 'named export',
    group: '09 元件',
    optional: true,
    Component: D16,
  },
  {
    id: '17',
    title: '解構',
    group: '09 元件',
    optional: false,
    Component: D17,
  },
  {
    id: '18',
    title: '預設值',
    group: '09 元件',
    optional: false,
    Component: D18,
  },
  {
    id: '19',
    title: '函式型 props',
    group: '09 元件',
    optional: false,
    Component: D19,
  },
  {
    id: '20',
    title: 'children',
    group: '09 元件',
    optional: false,
    Component: D20,
  },
  {
    id: '21',
    title: '宣告狀態',
    group: '09 狀態',
    optional: false,
    Component: D21,
  },
  {
    id: '22',
    title: '多個狀態',
    group: '09 狀態',
    optional: false,
    Component: D22,
  },
  {
    id: '23',
    title: '狀態快照',
    group: '09 狀態',
    optional: false,
    Component: D23,
  },
  {
    id: '24',
    title: '更新函式',
    group: '09 狀態',
    optional: false,
    Component: D24,
  },
  {
    id: '25',
    title: '批次更新',
    group: '09 狀態',
    optional: false,
    Component: D25,
  },
  {
    id: '26',
    title: 'Hooks 規則',
    group: '09 狀態',
    optional: false,
    Component: D26,
  },
  {
    id: '27',
    title: '陣列新增',
    group: '09 狀態',
    optional: false,
    Component: D27,
  },
  {
    id: '28',
    title: '陣列刪除',
    group: '09 狀態',
    optional: false,
    Component: D28,
  },
  {
    id: '29',
    title: '陣列修改',
    group: '09 狀態',
    optional: false,
    Component: D29,
  },
  {
    id: '30',
    title: '物件欄位',
    group: '09 狀態',
    optional: false,
    Component: D30,
  },
  {
    id: '31',
    title: '巢狀物件',
    group: '09 狀態',
    optional: false,
    Component: D31,
  },
  {
    id: '32',
    title: '命名慣例',
    group: '09 事件',
    optional: false,
    Component: D32,
  },
  {
    id: '33',
    title: '事件物件',
    group: '09 事件',
    optional: false,
    Component: D33,
  },
  {
    id: '34',
    title: '帶參數',
    group: '09 事件',
    optional: false,
    Component: D34,
  },
  {
    id: '35',
    title: 'preventDefault',
    group: '09 事件',
    optional: false,
    Component: D35,
  },
  {
    id: '36',
    title: 'map',
    group: '09 列表與表單',
    optional: false,
    Component: D36,
  },
  {
    id: '37',
    title: 'filter',
    group: '09 列表與表單',
    optional: false,
    Component: D37,
  },
  {
    id: '38',
    title: '空清單',
    group: '09 列表與表單',
    optional: false,
    Component: D38,
  },
  {
    id: '39',
    title: 'key',
    group: '09 列表與表單',
    optional: false,
    Component: D39,
  },
  {
    id: '40',
    title: 'input',
    group: '09 列表與表單',
    optional: false,
    Component: D40,
  },
  {
    id: '41',
    title: 'textarea',
    group: '09 列表與表單',
    optional: false,
    Component: D41,
  },
  {
    id: '42',
    title: 'select',
    group: '09 列表與表單',
    optional: false,
    Component: D42,
  },
  {
    id: '43',
    title: 'checkbox',
    group: '09 列表與表單',
    optional: false,
    Component: D43,
  },
  {
    id: '44',
    title: 'radio',
    group: '09 列表與表單',
    optional: false,
    Component: D44,
  },
  {
    id: '45',
    title: '多欄位物件',
    group: '09 列表與表單',
    optional: false,
    Component: D45,
  },
  {
    id: '46',
    title: 'submit',
    group: '09 列表與表單',
    optional: false,
    Component: D46,
  },
  {
    id: '47',
    title: 'useId',
    group: '09 列表與表單',
    optional: true,
    Component: D47,
  },
  {
    id: '48',
    title: '第一次執行',
    group: '10 Effect 與資料',
    optional: false,
    Component: D48,
  },
  {
    id: '49',
    title: '依賴陣列',
    group: '10 Effect 與資料',
    optional: false,
    Component: D49,
  },
  {
    id: '50',
    title: '清除函式',
    group: '10 Effect 與資料',
    optional: false,
    Component: D50,
  },
  {
    id: '51',
    title: '無限迴圈',
    group: '10 Effect 與資料',
    optional: false,
    Component: D51,
  },
  {
    id: '52',
    title: '漏寫依賴',
    group: '10 Effect 與資料',
    optional: false,
    Component: D52,
  },
  {
    id: '52b',
    title: '漏寫依賴（2）',
    group: '10 Effect 與資料',
    optional: false,
    Component: D52b,
  },
  {
    id: '53',
    title: '載入與錯誤',
    group: '10 Effect 與資料',
    optional: false,
    Component: D53,
  },
  {
    id: '54',
    title: '空資料',
    group: '10 Effect 與資料',
    optional: false,
    Component: D54,
  },
  {
    id: '55',
    title: 'AbortController',
    group: '10 Effect 與資料',
    optional: true,
    Component: D55,
  },
  {
    id: '56',
    title: 'GET',
    group: '10 Effect 與資料',
    optional: true,
    Component: D56,
  },
  {
    id: '57',
    title: 'POST',
    group: '10 Effect 與資料',
    optional: true,
    Component: D57,
  },
  {
    id: '58',
    title: 'PUT',
    group: '10 Effect 與資料',
    optional: true,
    Component: D58,
  },
  {
    id: '59',
    title: 'DELETE',
    group: '10 Effect 與資料',
    optional: true,
    Component: D59,
  },
  {
    id: '60',
    title: 'API 模組',
    group: '10 Effect 與資料',
    optional: true,
    Component: D60,
  },
  {
    id: '61',
    title: '渲染時計算',
    group: '10 Effect 與資料',
    optional: true,
    Component: D61,
  },
  {
    id: '61b',
    title: '渲染時計算（2）',
    group: '10 Effect 與資料',
    optional: true,
    Component: D61b,
  },
  {
    id: '62',
    title: '事件裡的請求',
    group: '10 Effect 與資料',
    optional: true,
    Component: D62,
  },
  {
    id: '62b',
    title: '事件裡的請求（2）',
    group: '10 Effect 與資料',
    optional: true,
    Component: D62b,
  },
  {
    id: '63',
    title: '抽出讀取',
    group: '10 Effect 與資料',
    optional: true,
    Component: D63,
  },
  {
    id: '64',
    title: '傳入引數',
    group: '10 Effect 與資料',
    optional: true,
    Component: D64,
  },
  {
    id: '65',
    title: '引數放進依賴',
    group: '10 Effect 與資料',
    optional: true,
    Component: D65,
  },
  {
    id: '66',
    title: '各呼叫各一份狀態',
    group: '10 Effect 與資料',
    optional: true,
    Component: D66,
  },
  {
    id: '67',
    title: '父層持有',
    group: '10 共用狀態',
    optional: false,
    Component: D67,
  },
  {
    id: '68',
    title: '兄弟元件',
    group: '10 共用狀態',
    optional: false,
    Component: D68,
  },
  {
    id: '68b',
    title: '兄弟元件（2）',
    group: '10 共用狀態',
    optional: false,
    Component: D68b,
  },
  {
    id: '69',
    title: '層層傳遞的問題',
    group: '10 共用狀態',
    optional: true,
    Component: D69,
  },
  {
    id: '70',
    title: '用 Context 改善',
    group: '10 共用狀態',
    optional: true,
    Component: D70,
  },
  {
    id: '71',
    title: '拆成多個檔案',
    group: '10 共用狀態',
    optional: true,
    Component: D71,
  },
  {
    id: '72',
    title: '預設值（2）',
    group: '10 共用狀態',
    optional: true,
    Component: D72,
  },
  {
    id: '72b',
    title: '用 use 讀取',
    group: '10 共用狀態',
    optional: true,
    Component: D72b,
  },
  {
    id: '73',
    title: '沒有使用 useMemo 時',
    group: '10 共用狀態',
    optional: true,
    Component: D73,
  },
  {
    id: '73b',
    title: '使用 useMemo',
    group: '10 共用狀態',
    optional: true,
    Component: D73b,
  },
  {
    id: '74',
    title: '沒有使用 memo 時',
    group: '10 共用狀態',
    optional: true,
    Component: D74,
  },
  {
    id: '74b',
    title: '使用 memo',
    group: '10 共用狀態',
    optional: true,
    Component: D74b,
  },
  {
    id: '75',
    title: '沒有使用 useCallback 時',
    group: '10 共用狀態',
    optional: true,
    Component: D75,
  },
  {
    id: '75b',
    title: '使用 useCallback',
    group: '10 共用狀態',
    optional: true,
    Component: D75b,
  },
  {
    id: '76',
    title: '聚焦輸入框',
    group: '10 共用狀態',
    optional: true,
    Component: D76,
  },
  {
    id: '76b',
    title: 'ref 當作 props',
    group: '10 共用狀態',
    optional: true,
    Component: D76b,
  },
  {
    id: '76c',
    title: 'ref 函式與清理函式',
    group: '10 共用狀態',
    optional: true,
    Component: D76c,
  },
  {
    id: '77',
    title: '不觸發渲染的值',
    group: '10 共用狀態',
    optional: true,
    Component: D77,
  },
  {
    id: '78',
    title: '計數按鈕',
    group: '10 共用狀態',
    optional: true,
    Component: D78,
  },
  {
    id: '79',
    title: '待辦清單',
    group: '10 共用狀態',
    optional: true,
    Component: D79,
  },
  {
    id: '80',
    title: '待辦清單（2）',
    group: '10 共用狀態',
    optional: true,
    Component: D80,
  },
  {
    id: '81',
    title: '搭配 Context',
    group: '10 共用狀態',
    optional: true,
    Component: D81,
  },
  {
    id: '82',
    title: '搭配 Context（2）',
    group: '10 共用狀態',
    optional: true,
    Component: D82,
  },
  {
    id: '83',
    title: 'form action',
    group: '10 共用狀態',
    optional: true,
    Component: D83,
  },
  {
    id: '84',
    title: 'useActionState',
    group: '10 共用狀態',
    optional: true,
    Component: D84,
  },
  {
    id: '84b',
    title: 'useFormStatus',
    group: '10 共用狀態',
    optional: true,
    Component: D84b,
  },
  {
    id: '85',
    title: 'useOptimistic',
    group: '10 共用狀態',
    optional: true,
    Component: D85,
  },
  {
    id: '86',
    title: '狀態切頁',
    group: '11 認識路由',
    optional: false,
    Component: D86,
  },
  {
    id: 'hw09',
    title: '09 回家作業',
    group: '09 回家作業',
    optional: false,
    Component: Homework09,
  },
  {
    id: 'hw10',
    title: '10 回家作業',
    group: '10 回家作業',
    optional: false,
    Component: Homework10,
  },
];


/** 目錄依講義章節分組；選讀的範例會標上「選讀」。 */
export const groups = [];
for (const demo of demos) {
  const last = groups[groups.length - 1];
  if (last && last.name === demo.group) last.items.push(demo);
  else groups.push({ name: demo.group, items: [demo] });
}


/**
 * 練習筆記的目錄。左側選單與單則頁面都讀這一份。
 * topics 是主題的順序與標題。demos 每一筆的 slug 與路徑 /demos/:slug 相同，topic 對到 topics 的 id，Component 是該則要畫的元件。
 */
import Hello from '../examples/01-hello.jsx';
import ExprDemo from '../examples/02-expr.jsx';
import DownDemo from '../examples/03-down.jsx';
import TreeDemo from '../examples/04-tree.jsx';
import PlaceDemo from '../examples/05-place.jsx';
import FragmentDemo from '../examples/06-fragment.jsx';
import StyleDemo from '../examples/07-style.jsx';
import ClassDemo from '../examples/08-class.jsx';
import EarlyDemo from '../examples/09-early.jsx';
import TernaryDemo from '../examples/10-ternary.jsx';
import AndDemo from '../examples/11-and.jsx';
import ZeroDemo from '../examples/12-zero.jsx';
import OrDemo from '../examples/13-or.jsx';
import NullishDemo from '../examples/14-nullish.jsx';
import CardDemo from '../examples/15-card.jsx';
import BoardDemo from '../examples/16-board.jsx';
import PropsDemo from '../examples/17-props.jsx';
import DefaultsDemo from '../examples/18-defaults.jsx';
import CallbackDemo from '../examples/19-callback.jsx';
import ChildrenDemo from '../examples/20-children.jsx';
import CountDemo from '../examples/21-state.jsx';
import MultiDemo from '../examples/22-multi.jsx';
import SnapshotDemo from '../examples/23-snapshot.jsx';
import UpdaterDemo from '../examples/24-updater.jsx';
import BatchDemo from '../examples/25-batch.jsx';
import RulesDemo from '../examples/26-rules.jsx';
import AddDemo from '../examples/27-add.jsx';
import RemoveDemo from '../examples/28-remove.jsx';
import EditDemo from '../examples/29-edit.jsx';
import ObjectDemo from '../examples/30-object.jsx';
import NestedDemo from '../examples/31-nested.jsx';
import EventDemo from '../examples/32-event.jsx';
import TargetDemo from '../examples/33-target.jsx';
import PickDemo from '../examples/34-pick.jsx';
import PreventDemo from '../examples/35-prevent.jsx';
import MapDemo from '../examples/36-map.jsx';
import FilterDemo from '../examples/37-filter.jsx';
import EmptyDemo from '../examples/38-empty.jsx';
import KeyDemo from '../examples/39-key.jsx';
import InputDemo from '../examples/40-input.jsx';
import AreaDemo from '../examples/41-area.jsx';
import SelectDemo from '../examples/42-select.jsx';
import CheckDemo from '../examples/43-check.jsx';
import RadioDemo from '../examples/44-radio.jsx';
import FieldsDemo from '../examples/45-fields.jsx';
import SubmitDemo from '../examples/46-submit.jsx';
import UseIdDemo from '../examples/47-useid.jsx';
import EffectMount from '../examples/48-effect.jsx';
import DepsDemo from '../examples/49-deps.jsx';
import TimerDemo from '../examples/50-timer.jsx';
import LoopDemo from '../examples/51-loop.jsx';
import LintDemo from '../examples/52-lint.jsx';
import LoadDemo from '../examples/53-load.jsx';
import EmptyLoadDemo from '../examples/54-empty.jsx';
import AbortDemo from '../examples/55-abort.jsx';
import GetDemo from '../examples/56-get.jsx';
import PostDemo from '../examples/57-post.jsx';
import PutDemo from '../examples/58-put.jsx';
import DeleteDemo from '../examples/59-delete.jsx';
import ItemsDemo from '../examples/60-items-demo.jsx';
import DeriveDemo from '../examples/61-derive.jsx';
import ClickFetchDemo from '../examples/62-click.jsx';
import HookDemo from '../examples/63-hook.jsx';
import ToggleDemo from '../examples/64-toggle.jsx';
import FilterHookDemo from '../examples/65-filter.jsx';
import TwiceDemo from '../examples/66-twice.jsx';
import LiftDemo from '../examples/67-lift.jsx';
import SiblingsDemo from '../examples/68-siblings.jsx';
import DrillDemo from '../examples/69-drill.jsx';
import ContextDemo from '../examples/70-context.jsx';
import ContextSplitDemo from '../examples/71-contextDemo/index.jsx';
import DefaultDemo from '../examples/72-default.jsx';
import MemoDemo from '../examples/73-memo.jsx';
import MemoComponentDemo from '../examples/74-memo-component.jsx';
import UseCallbackDemo from '../examples/75-callback.jsx';
import RefDemo from '../examples/76-ref.jsx';
import RefCountDemo from '../examples/77-ref-count.jsx';
import ReducerCountDemo from '../examples/78-reducer-count.jsx';
import ReducerStateDemo from '../examples/79-reducer-state.jsx';
import ReducerDemo from '../examples/80-reducer.jsx';
import TodoPropsDemo from '../examples/81-propsDemo/index.jsx';
import ProviderDemo from '../examples/82-providerDemo/index.jsx';
import ActionDemo from '../examples/83-action.jsx';
import ActionStateDemo from '../examples/84-action-state.jsx';
import OptimisticDemo from '../examples/85-optimistic.jsx';
import LoaderDemo from '../examples/86-loader.jsx';
import FormActionDemo from '../examples/87-action.jsx';
import RedirectList from '../examples/88-redirect-list.jsx';
import ErrorElementDemo from '../examples/89-error-element.jsx';
import FetcherDemo from '../examples/90-fetcher.jsx';
import NavigationDemo from '../examples/91-navigation.jsx';

export const topics = [
  { id: 'component', title: '元件' },
  { id: 'jsx', title: 'JSX 與條件' },
  { id: 'module', title: '模組與 props' },
  { id: 'state', title: '狀態' },
  { id: 'event', title: '事件' },
  { id: 'list', title: '列表與表單' },
  { id: 'effect', title: 'Effect 與資料' },
  { id: 'share', title: '共用狀態' },
  { id: 'more', title: 'Ref、Reducer 與 Actions' },
  { id: 'data', title: '資料模式' },
];

export const demos = [
  { slug: '01-hello', title: '函式元件', topic: 'component', Component: Hello },
  { slug: '02-expr', title: '表達式', topic: 'component', Component: ExprDemo },
  {
    slug: '03-down',
    title: '由父層傳入',
    topic: 'component',
    Component: DownDemo,
  },
  {
    slug: '04-tree',
    title: '拆分元件',
    topic: 'component',
    Component: TreeDemo,
  },
  {
    slug: '05-place',
    title: '狀態的位置',
    topic: 'component',
    Component: PlaceDemo,
  },
  {
    slug: '06-fragment',
    title: 'Fragment',
    topic: 'jsx',
    Component: FragmentDemo,
  },
  { slug: '07-style', title: 'style 物件', topic: 'jsx', Component: StyleDemo },
  { slug: '08-class', title: 'className', topic: 'jsx', Component: ClassDemo },
  {
    slug: '09-early',
    title: '提早 return',
    topic: 'jsx',
    Component: EarlyDemo,
  },
  {
    slug: '10-ternary',
    title: '三元運算子',
    topic: 'jsx',
    Component: TernaryDemo,
  },
  { slug: '11-and', title: '邏輯且', topic: 'jsx', Component: AndDemo },
  { slug: '12-zero', title: '數字 0', topic: 'jsx', Component: ZeroDemo },
  { slug: '13-or', title: '邏輯或', topic: 'jsx', Component: OrDemo },
  {
    slug: '14-nullish',
    title: '空值合併',
    topic: 'jsx',
    Component: NullishDemo,
  },
  {
    slug: '15-card',
    title: 'default export',
    topic: 'module',
    Component: CardDemo,
  },
  {
    slug: '16-board',
    title: 'named export',
    topic: 'module',
    Component: BoardDemo,
  },
  { slug: '17-props', title: '解構', topic: 'module', Component: PropsDemo },
  {
    slug: '18-defaults',
    title: '預設值',
    topic: 'module',
    Component: DefaultsDemo,
  },
  {
    slug: '19-callback',
    title: '函式型 props',
    topic: 'module',
    Component: CallbackDemo,
  },
  {
    slug: '20-children',
    title: 'children',
    topic: 'module',
    Component: ChildrenDemo,
  },
  { slug: '21-state', title: '宣告狀態', topic: 'state', Component: CountDemo },
  { slug: '22-multi', title: '多個狀態', topic: 'state', Component: MultiDemo },
  {
    slug: '23-snapshot',
    title: '狀態快照：只加一',
    topic: 'state',
    Component: SnapshotDemo,
  },
  {
    slug: '24-updater',
    title: '更新函式：加二',
    topic: 'state',
    Component: UpdaterDemo,
  },
  { slug: '25-batch', title: '批次更新', topic: 'state', Component: BatchDemo },
  {
    slug: '26-rules',
    title: 'Hooks 規則',
    topic: 'state',
    Component: RulesDemo,
  },
  { slug: '27-add', title: '陣列新增', topic: 'state', Component: AddDemo },
  {
    slug: '28-remove',
    title: '陣列刪除',
    topic: 'state',
    Component: RemoveDemo,
  },
  { slug: '29-edit', title: '陣列修改', topic: 'state', Component: EditDemo },
  {
    slug: '30-object',
    title: '物件欄位',
    topic: 'state',
    Component: ObjectDemo,
  },
  {
    slug: '31-nested',
    title: '巢狀物件',
    topic: 'state',
    Component: NestedDemo,
  },
  { slug: '32-event', title: '命名慣例', topic: 'event', Component: EventDemo },
  {
    slug: '33-target',
    title: '事件物件',
    topic: 'event',
    Component: TargetDemo,
  },
  { slug: '34-pick', title: '帶參數', topic: 'event', Component: PickDemo },
  {
    slug: '35-prevent',
    title: 'preventDefault',
    topic: 'event',
    Component: PreventDemo,
  },
  { slug: '36-map', title: 'map', topic: 'list', Component: MapDemo },
  { slug: '37-filter', title: 'filter', topic: 'list', Component: FilterDemo },
  { slug: '38-empty', title: '空清單', topic: 'list', Component: EmptyDemo },
  { slug: '39-key', title: 'key', topic: 'list', Component: KeyDemo },
  { slug: '40-input', title: 'input', topic: 'list', Component: InputDemo },
  { slug: '41-area', title: 'textarea', topic: 'list', Component: AreaDemo },
  { slug: '42-select', title: 'select', topic: 'list', Component: SelectDemo },
  { slug: '43-check', title: 'checkbox', topic: 'list', Component: CheckDemo },
  { slug: '44-radio', title: 'radio', topic: 'list', Component: RadioDemo },
  {
    slug: '45-fields',
    title: '多欄位物件',
    topic: 'list',
    Component: FieldsDemo,
  },
  { slug: '46-submit', title: 'submit', topic: 'list', Component: SubmitDemo },
  { slug: '47-useid', title: 'useId', topic: 'list', Component: UseIdDemo },
  {
    slug: '48-effect',
    title: '第一次執行',
    topic: 'effect',
    Component: EffectMount,
  },
  { slug: '49-deps', title: '依賴陣列', topic: 'effect', Component: DepsDemo },
  {
    slug: '50-timer',
    title: '清除函式',
    topic: 'effect',
    Component: TimerDemo,
  },
  { slug: '51-loop', title: '無限迴圈', topic: 'effect', Component: LoopDemo },
  { slug: '52-lint', title: '漏寫依賴', topic: 'effect', Component: LintDemo },
  {
    slug: '53-load',
    title: '載入與錯誤',
    topic: 'effect',
    Component: LoadDemo,
  },
  {
    slug: '54-empty',
    title: '空資料',
    topic: 'effect',
    Component: EmptyLoadDemo,
  },
  {
    slug: '55-abort',
    title: 'AbortController',
    topic: 'effect',
    Component: AbortDemo,
  },
  { slug: '56-get', title: 'GET', topic: 'effect', Component: GetDemo },
  { slug: '57-post', title: 'POST', topic: 'effect', Component: PostDemo },
  { slug: '58-put', title: 'PUT', topic: 'effect', Component: PutDemo },
  {
    slug: '59-delete',
    title: 'DELETE',
    topic: 'effect',
    Component: DeleteDemo,
  },
  {
    slug: '60-items-demo',
    title: 'API 模組',
    topic: 'effect',
    Component: ItemsDemo,
  },
  {
    slug: '61-derive',
    title: '渲染時計算',
    topic: 'effect',
    Component: DeriveDemo,
  },
  {
    slug: '62-click',
    title: '事件裡的請求',
    topic: 'effect',
    Component: ClickFetchDemo,
  },
  { slug: '63-hook', title: '抽出讀取', topic: 'effect', Component: HookDemo },
  {
    slug: '64-toggle',
    title: '傳入引數',
    topic: 'effect',
    Component: ToggleDemo,
  },
  {
    slug: '65-filter',
    title: '引數放進依賴',
    topic: 'effect',
    Component: FilterHookDemo,
  },
  {
    slug: '66-twice',
    title: '各呼叫各一份狀態',
    topic: 'share',
    Component: TwiceDemo,
  },
  { slug: '67-lift', title: '父層持有', topic: 'share', Component: LiftDemo },
  {
    slug: '68-siblings',
    title: '兄弟元件',
    topic: 'share',
    Component: SiblingsDemo,
  },
  { slug: '69-drill', title: '層層傳遞', topic: 'share', Component: DrillDemo },
  {
    slug: '70-context',
    title: '用 Context 改善',
    topic: 'share',
    Component: ContextDemo,
  },
  {
    slug: '71-contextDemo',
    title: '拆成多個檔案',
    topic: 'share',
    Component: ContextSplitDemo,
  },
  {
    slug: '72-default',
    title: '預設值',
    topic: 'share',
    Component: DefaultDemo,
  },
  { slug: '73-memo', title: 'useMemo', topic: 'share', Component: MemoDemo },
  {
    slug: '74-memo-component',
    title: 'memo',
    topic: 'share',
    Component: MemoComponentDemo,
  },
  {
    slug: '75-callback',
    title: 'useCallback',
    topic: 'share',
    Component: UseCallbackDemo,
  },
  { slug: '76-ref', title: '聚焦輸入框', topic: 'more', Component: RefDemo },
  {
    slug: '77-ref-count',
    title: '不觸發渲染的值',
    topic: 'more',
    Component: RefCountDemo,
  },
  {
    slug: '78-reducer-count',
    title: '計數（useReducer）',
    topic: 'more',
    Component: ReducerCountDemo,
  },
  {
    slug: '79-reducer-state',
    title: '待辦（useState）',
    topic: 'more',
    Component: ReducerStateDemo,
  },
  {
    slug: '80-reducer',
    title: '待辦（useReducer）',
    topic: 'more',
    Component: ReducerDemo,
  },
  {
    slug: '81-propsDemo',
    title: '拆成元件用 props',
    topic: 'more',
    Component: TodoPropsDemo,
  },
  {
    slug: '82-providerDemo',
    title: '改用 Context',
    topic: 'more',
    Component: ProviderDemo,
  },
  {
    slug: '83-action',
    title: 'form action',
    topic: 'more',
    Component: ActionDemo,
  },
  {
    slug: '84-action-state',
    title: 'useActionState',
    topic: 'more',
    Component: ActionStateDemo,
  },
  {
    slug: '85-optimistic',
    title: 'useOptimistic',
    topic: 'more',
    Component: OptimisticDemo,
  },
  {
    slug: '86-loader',
    title: 'loader 讀資料',
    topic: 'data',
    Component: LoaderDemo,
  },
  {
    slug: '87-action',
    title: 'action 與 Form',
    topic: 'data',
    Component: FormActionDemo,
  },
  {
    slug: '88-redirect-list',
    title: '送出後轉址',
    topic: 'data',
    Component: RedirectList,
  },
  {
    slug: '89-error-element',
    title: 'errorElement',
    topic: 'data',
    Component: ErrorElementDemo,
  },
  {
    slug: '90-fetcher',
    title: 'fetcher 不換頁',
    topic: 'data',
    Component: FetcherDemo,
  },
  {
    slug: '91-navigation',
    title: 'useNavigation',
    topic: 'data',
    Component: NavigationDemo,
  },
];

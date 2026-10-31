/**
 * 練習筆記的目錄。左側選單與單則頁面都讀這一份。
 * topics 是主題的順序與標題。demos 每一筆的 id 與路徑 /demos/:id 相同，topic 對到 topics 的 id，Component 是該則要畫的元件。
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
import RefDemo from '../examples/73-ref.jsx';
import RefCountDemo from '../examples/74-ref-count.jsx';
import ReducerCountDemo from '../examples/75-reducer-count.jsx';
import ReducerStateDemo from '../examples/76-reducer-state.jsx';
import ReducerDemo from '../examples/77-reducer.jsx';
import TodoPropsDemo from '../examples/78-propsDemo/index.jsx';
import ProviderDemo from '../examples/79-providerDemo/index.jsx';
import ActionDemo from '../examples/80-action.jsx';
import ActionStateDemo from '../examples/81-action-state.jsx';
import OptimisticDemo from '../examples/82-optimistic.jsx';

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
];

export const demos = [
  { id: '01', title: '函式元件', topic: 'component', Component: Hello },
  { id: '02', title: '表達式', topic: 'component', Component: ExprDemo },
  { id: '03', title: '由父層傳入', topic: 'component', Component: DownDemo },
  { id: '04', title: '拆分元件', topic: 'component', Component: TreeDemo },
  { id: '05', title: '狀態的位置', topic: 'component', Component: PlaceDemo },
  { id: '06', title: 'Fragment', topic: 'jsx', Component: FragmentDemo },
  { id: '07', title: 'style 物件', topic: 'jsx', Component: StyleDemo },
  { id: '08', title: 'className', topic: 'jsx', Component: ClassDemo },
  { id: '09', title: '提早 return', topic: 'jsx', Component: EarlyDemo },
  { id: '10', title: '三元運算子', topic: 'jsx', Component: TernaryDemo },
  { id: '11', title: '邏輯且', topic: 'jsx', Component: AndDemo },
  { id: '12', title: '數字 0', topic: 'jsx', Component: ZeroDemo },
  { id: '13', title: '邏輯或', topic: 'jsx', Component: OrDemo },
  { id: '14', title: '空值合併', topic: 'jsx', Component: NullishDemo },
  { id: '15', title: 'default export', topic: 'module', Component: CardDemo },
  { id: '16', title: 'named export', topic: 'module', Component: BoardDemo },
  { id: '17', title: '解構', topic: 'module', Component: PropsDemo },
  { id: '18', title: '預設值', topic: 'module', Component: DefaultsDemo },
  { id: '19', title: '函式型 props', topic: 'module', Component: CallbackDemo },
  { id: '20', title: 'children', topic: 'module', Component: ChildrenDemo },
  { id: '21', title: '宣告狀態', topic: 'state', Component: CountDemo },
  { id: '22', title: '多個狀態', topic: 'state', Component: MultiDemo },
  {
    id: '23',
    title: '狀態快照：只加一',
    topic: 'state',
    Component: SnapshotDemo,
  },
  { id: '24', title: '更新函式：加二', topic: 'state', Component: UpdaterDemo },
  { id: '25', title: '批次更新', topic: 'state', Component: BatchDemo },
  { id: '26', title: 'Hooks 規則', topic: 'state', Component: RulesDemo },
  { id: '27', title: '陣列新增', topic: 'state', Component: AddDemo },
  { id: '28', title: '陣列刪除', topic: 'state', Component: RemoveDemo },
  { id: '29', title: '陣列修改', topic: 'state', Component: EditDemo },
  { id: '30', title: '物件欄位', topic: 'state', Component: ObjectDemo },
  { id: '31', title: '巢狀物件', topic: 'state', Component: NestedDemo },
  { id: '32', title: '命名慣例', topic: 'event', Component: EventDemo },
  { id: '33', title: '事件物件', topic: 'event', Component: TargetDemo },
  { id: '34', title: '帶參數', topic: 'event', Component: PickDemo },
  { id: '35', title: 'preventDefault', topic: 'event', Component: PreventDemo },
  { id: '36', title: 'map', topic: 'list', Component: MapDemo },
  { id: '37', title: 'filter', topic: 'list', Component: FilterDemo },
  { id: '38', title: '空清單', topic: 'list', Component: EmptyDemo },
  { id: '39', title: 'key', topic: 'list', Component: KeyDemo },
  { id: '40', title: 'input', topic: 'list', Component: InputDemo },
  { id: '41', title: 'textarea', topic: 'list', Component: AreaDemo },
  { id: '42', title: 'select', topic: 'list', Component: SelectDemo },
  { id: '43', title: 'checkbox', topic: 'list', Component: CheckDemo },
  { id: '44', title: 'radio', topic: 'list', Component: RadioDemo },
  { id: '45', title: '多欄位物件', topic: 'list', Component: FieldsDemo },
  { id: '46', title: 'submit', topic: 'list', Component: SubmitDemo },
  { id: '47', title: 'useId', topic: 'list', Component: UseIdDemo },
  { id: '48', title: '第一次執行', topic: 'effect', Component: EffectMount },
  { id: '49', title: '依賴陣列', topic: 'effect', Component: DepsDemo },
  { id: '50', title: '清除函式', topic: 'effect', Component: TimerDemo },
  { id: '51', title: '無限迴圈', topic: 'effect', Component: LoopDemo },
  { id: '52', title: '漏寫依賴', topic: 'effect', Component: LintDemo },
  { id: '53', title: '載入與錯誤', topic: 'effect', Component: LoadDemo },
  { id: '54', title: '空資料', topic: 'effect', Component: EmptyLoadDemo },
  { id: '55', title: 'AbortController', topic: 'effect', Component: AbortDemo },
  { id: '56', title: 'GET', topic: 'effect', Component: GetDemo },
  { id: '57', title: 'POST', topic: 'effect', Component: PostDemo },
  { id: '58', title: 'PUT', topic: 'effect', Component: PutDemo },
  { id: '59', title: 'DELETE', topic: 'effect', Component: DeleteDemo },
  { id: '60', title: 'API 模組', topic: 'effect', Component: ItemsDemo },
  { id: '61', title: '渲染時計算', topic: 'effect', Component: DeriveDemo },
  {
    id: '62',
    title: '事件裡的請求',
    topic: 'effect',
    Component: ClickFetchDemo,
  },
  { id: '63', title: '抽出讀取', topic: 'effect', Component: HookDemo },
  { id: '64', title: '傳入引數', topic: 'effect', Component: ToggleDemo },
  {
    id: '65',
    title: '引數放進依賴',
    topic: 'effect',
    Component: FilterHookDemo,
  },
  { id: '66', title: '各呼叫各一份狀態', topic: 'share', Component: TwiceDemo },
  { id: '67', title: '父層持有', topic: 'share', Component: LiftDemo },
  { id: '68', title: '兄弟元件', topic: 'share', Component: SiblingsDemo },
  { id: '69', title: '層層傳遞', topic: 'share', Component: DrillDemo },
  {
    id: '70',
    title: '用 Context 改善',
    topic: 'share',
    Component: ContextDemo,
  },
  {
    id: '71',
    title: '拆成多個檔案',
    topic: 'share',
    Component: ContextSplitDemo,
  },
  { id: '72', title: '預設值', topic: 'share', Component: DefaultDemo },
  { id: '73', title: '聚焦輸入框', topic: 'more', Component: RefDemo },
  { id: '74', title: '不觸發渲染的值', topic: 'more', Component: RefCountDemo },
  {
    id: '75',
    title: '計數（useReducer）',
    topic: 'more',
    Component: ReducerCountDemo,
  },
  {
    id: '76',
    title: '待辦（useState）',
    topic: 'more',
    Component: ReducerStateDemo,
  },
  {
    id: '77',
    title: '待辦（useReducer）',
    topic: 'more',
    Component: ReducerDemo,
  },
  {
    id: '78',
    title: '拆成元件用 props',
    topic: 'more',
    Component: TodoPropsDemo,
  },
  { id: '79', title: '改用 Context', topic: 'more', Component: ProviderDemo },
  { id: '80', title: 'form action', topic: 'more', Component: ActionDemo },
  {
    id: '81',
    title: 'useActionState',
    topic: 'more',
    Component: ActionStateDemo,
  },
  {
    id: '82',
    title: 'useOptimistic',
    topic: 'more',
    Component: OptimisticDemo,
  },
];

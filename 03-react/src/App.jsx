import { useState } from 'react';
import Hello from './demos/01-hello.jsx';
import DownDemo from './demos/02-down.jsx';
import TreeDemo from './demos/03-tree.jsx';
import PlaceDemo from './demos/04-place.jsx';
import FragmentDemo from './demos/05-fragment.jsx';
import ExprDemo from './demos/06-expr.jsx';
import StyleDemo from './demos/07-style.jsx';
import ClassDemo from './demos/08-class.jsx';
import EarlyDemo from './demos/09-early.jsx';
import TernaryDemo from './demos/10-ternary.jsx';
import AndDemo from './demos/11-and.jsx';
import ZeroDemo from './demos/12-zero.jsx';
import OrDemo from './demos/13-or.jsx';
import NullishDemo from './demos/14-nullish.jsx';
import CardDemo from './demos/15-card.jsx';
import BoardDemo from './demos/16-board.jsx';
import PropsDemo from './demos/17-props.jsx';
import DefaultsDemo from './demos/18-defaults.jsx';
import CallbackDemo from './demos/19-callback.jsx';
import ChildrenDemo from './demos/20-children.jsx';
import CountDemo from './demos/21-state.jsx';
import MultiDemo from './demos/22-multi.jsx';
import SnapshotDemo from './demos/23-snapshot.jsx';
import UpdaterDemo from './demos/24-updater.jsx';
import BatchDemo from './demos/25-batch.jsx';
import RulesDemo from './demos/26-rules.jsx';
import AddDemo from './demos/27-add.jsx';
import RemoveDemo from './demos/28-remove.jsx';
import EditDemo from './demos/29-edit.jsx';
import ObjectDemo from './demos/30-object.jsx';
import NestedDemo from './demos/31-nested.jsx';
import EventDemo from './demos/32-event.jsx';
import TargetDemo from './demos/33-target.jsx';
import PickDemo from './demos/34-pick.jsx';
import PreventDemo from './demos/35-prevent.jsx';
import MapDemo from './demos/36-map.jsx';
import FilterDemo from './demos/37-filter.jsx';
import EmptyDemo from './demos/38-empty.jsx';
import KeyDemo from './demos/39-key.jsx';
import InputDemo from './demos/40-input.jsx';
import AreaDemo from './demos/41-area.jsx';
import SelectDemo from './demos/42-select.jsx';
import CheckDemo from './demos/43-check.jsx';
import RadioDemo from './demos/44-radio.jsx';
import FieldsDemo from './demos/45-fields.jsx';
import SubmitDemo from './demos/46-submit.jsx';
import UseIdDemo from './demos/47-useid.jsx';
import EffectMount from './demos/48-effect.jsx';
import DepsDemo from './demos/49-deps.jsx';
import TimerDemo from './demos/50-timer.jsx';
import LoopDemo from './demos/51-loop.jsx';
import LintDemo from './demos/52-lint.jsx';
import LoadDemo from './demos/53-load.jsx';
import EmptyLoadDemo from './demos/54-empty.jsx';
import AbortDemo from './demos/55-abort.jsx';
import GetDemo from './demos/56-get.jsx';
import PostDemo from './demos/57-post.jsx';
import PutDemo from './demos/58-put.jsx';
import DeleteDemo from './demos/59-delete.jsx';
import ItemsDemo from './demos/60-items-demo.jsx';
import DeriveDemo from './demos/61-derive.jsx';
import ClickFetchDemo from './demos/62-click.jsx';
import HookDemo from './demos/63-hook.jsx';
import ToggleDemo from './demos/63b-toggle.jsx';
import FilterHookDemo from './demos/64b-filter.jsx';
import TwiceDemo from './demos/64-twice.jsx';
import LiftDemo from './demos/65-lift.jsx';
import SiblingsDemo from './demos/66-siblings.jsx';
import DrillDemo from './demos/66b-drill.jsx';
import ContextDemo from './demos/67-context.jsx';
import ContextSplitDemo from './demos/67-contextDemo/index.jsx';
import DefaultDemo from './demos/68-default.jsx';
import RefDemo from './demos/69-ref.jsx';
import RefCountDemo from './demos/70-ref-count.jsx';
import ReducerDemo from './demos/71-reducer.jsx';
import ProviderDemo from './demos/72-provider.jsx';
import ActionDemo from './demos/73-action.jsx';
import ActionStateDemo from './demos/74-action-state.jsx';
import OptimisticDemo from './demos/75-optimistic.jsx';

const demos = [
  { id: '01', title: '函式元件', Component: Hello },
  { id: '02', title: '由父層傳入', Component: DownDemo },
  { id: '03', title: '拆分元件', Component: TreeDemo },
  { id: '04', title: '狀態的位置', Component: PlaceDemo },
  { id: '05', title: 'Fragment', Component: FragmentDemo },
  { id: '06', title: '表達式', Component: ExprDemo },
  { id: '07', title: 'style 物件', Component: StyleDemo },
  { id: '08', title: 'className', Component: ClassDemo },
  { id: '09', title: '提早 return', Component: EarlyDemo },
  { id: '10', title: '三元運算子', Component: TernaryDemo },
  { id: '11', title: '邏輯且', Component: AndDemo },
  { id: '12', title: '數字 0', Component: ZeroDemo },
  { id: '13', title: '邏輯或', Component: OrDemo },
  { id: '14', title: '空值合併', Component: NullishDemo },
  { id: '15', title: 'default export', Component: CardDemo },
  { id: '16', title: 'named export', Component: BoardDemo },
  { id: '17', title: '解構', Component: PropsDemo },
  { id: '18', title: '預設值', Component: DefaultsDemo },
  { id: '19', title: '函式型 props', Component: CallbackDemo },
  { id: '20', title: 'children', Component: ChildrenDemo },
  { id: '21', title: '宣告狀態', Component: CountDemo },
  { id: '22', title: '多個狀態', Component: MultiDemo },
  { id: '23', title: '狀態快照：只加一', Component: SnapshotDemo },
  { id: '24', title: '更新函式：加二', Component: UpdaterDemo },
  { id: '25', title: '批次更新', Component: BatchDemo },
  { id: '26', title: 'Hooks 規則', Component: RulesDemo },
  { id: '27', title: '陣列新增', Component: AddDemo },
  { id: '28', title: '陣列刪除', Component: RemoveDemo },
  { id: '29', title: '陣列修改', Component: EditDemo },
  { id: '30', title: '物件欄位', Component: ObjectDemo },
  { id: '31', title: '巢狀物件', Component: NestedDemo },
  { id: '32', title: '命名慣例', Component: EventDemo },
  { id: '33', title: '事件物件', Component: TargetDemo },
  { id: '34', title: '帶參數', Component: PickDemo },
  { id: '35', title: 'preventDefault', Component: PreventDemo },
  { id: '36', title: 'map', Component: MapDemo },
  { id: '37', title: 'filter', Component: FilterDemo },
  { id: '38', title: '空清單', Component: EmptyDemo },
  { id: '39', title: 'key', Component: KeyDemo },
  { id: '40', title: 'input', Component: InputDemo },
  { id: '41', title: 'textarea', Component: AreaDemo },
  { id: '42', title: 'select', Component: SelectDemo },
  { id: '43', title: 'checkbox', Component: CheckDemo },
  { id: '44', title: 'radio', Component: RadioDemo },
  { id: '45', title: '多欄位物件', Component: FieldsDemo },
  { id: '46', title: 'submit', Component: SubmitDemo },
  { id: '47', title: 'useId', Component: UseIdDemo },
  { id: '48', title: '第一次執行', Component: EffectMount },
  { id: '49', title: '依賴陣列', Component: DepsDemo },
  { id: '50', title: '清除函式', Component: TimerDemo },
  { id: '51', title: '無限迴圈', Component: LoopDemo },
  { id: '52', title: '漏寫依賴', Component: LintDemo },
  { id: '53', title: '載入與錯誤', Component: LoadDemo },
  { id: '54', title: '空資料', Component: EmptyLoadDemo },
  { id: '55', title: 'AbortController', Component: AbortDemo },
  { id: '56', title: 'GET', Component: GetDemo },
  { id: '57', title: 'POST', Component: PostDemo },
  { id: '58', title: 'PUT', Component: PutDemo },
  { id: '59', title: 'DELETE', Component: DeleteDemo },
  { id: '60', title: 'API 模組', Component: ItemsDemo },
  { id: '61', title: '渲染時計算', Component: DeriveDemo },
  { id: '62', title: '事件裡的請求', Component: ClickFetchDemo },
  { id: '63', title: '抽出讀取', Component: HookDemo },
  { id: '63b', title: '傳入引數', Component: ToggleDemo },
  { id: '64b', title: '引數放進依賴', Component: FilterHookDemo },
  { id: '64', title: '各呼叫各一份狀態', Component: TwiceDemo },
  { id: '65', title: '父層持有', Component: LiftDemo },
  { id: '66', title: '兄弟元件', Component: SiblingsDemo },
  { id: '66b', title: '層層傳遞', Component: DrillDemo },
  { id: '67', title: '用 Context 改善', Component: ContextDemo },
  { id: '67b', title: '拆成多個檔案', Component: ContextSplitDemo },
  { id: '68', title: '預設值', Component: DefaultDemo },
  { id: '69', title: '聚焦輸入框', Component: RefDemo },
  { id: '70', title: '不觸發渲染的值', Component: RefCountDemo },
  { id: '71', title: '待辦清單', Component: ReducerDemo },
  { id: '72', title: '搭配 Context', Component: ProviderDemo },
  { id: '73', title: 'form action', Component: ActionDemo },
  { id: '74', title: 'useActionState', Component: ActionStateDemo },
  { id: '75', title: 'useOptimistic', Component: OptimisticDemo },
];

export default function App() {
  const [current, setCurrent] = useState('01');
  const demo = demos.find((item) => item.id === current) ?? demos[0];
  const View = demo.Component;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-4 py-3">
          {demos.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                item.id === demo.id
                  ? 'rounded bg-teal-800 px-3 py-1 text-sm text-white'
                  : 'rounded bg-stone-100 px-3 py-1 text-sm'
              }
              onClick={() => setCurrent(item.id)}
            >
              {item.id} {item.title}
            </button>
          ))}
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">
        <View />
      </main>
    </div>
  );
}

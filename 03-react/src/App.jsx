import { useState } from 'react';
import Hello from './demos/01-hello.jsx';
import FragmentDemo from './demos/02-fragment.jsx';
import ExprDemo from './demos/03-expr.jsx';
import StyleDemo from './demos/04-style.jsx';
import EarlyDemo from './demos/05-early.jsx';
import TernaryDemo from './demos/06-ternary.jsx';
import AndDemo from './demos/07-and.jsx';
import ZeroDemo from './demos/08-zero.jsx';
import DownDemo from './demos/09-down.jsx';
import TreeDemo from './demos/10-tree.jsx';
import PlaceDemo from './demos/11-place.jsx';
import CardDemo from './demos/12-card.jsx';
import BoardDemo from './demos/13-board.jsx';
import PropsDemo from './demos/14-props.jsx';
import DefaultsDemo from './demos/15-defaults.jsx';
import CallbackDemo from './demos/16-callback.jsx';
import ChildrenDemo from './demos/17-children.jsx';
import CountDemo from './demos/18-state.jsx';
import SnapshotDemo from './demos/19-snapshot.jsx';
import UpdaterDemo from './demos/20-updater.jsx';
import BatchDemo from './demos/21-batch.jsx';
import RulesDemo from './demos/22-rules.jsx';
import AddDemo from './demos/23-add.jsx';
import RemoveDemo from './demos/24-remove.jsx';
import EditDemo from './demos/25-edit.jsx';
import NestedDemo from './demos/26-nested.jsx';
import EventDemo from './demos/27-event.jsx';
import TargetDemo from './demos/28-target.jsx';
import PickDemo from './demos/29-pick.jsx';
import PreventDemo from './demos/30-prevent.jsx';
import MapDemo from './demos/31-map.jsx';
import FilterDemo from './demos/32-filter.jsx';
import KeyDemo from './demos/33-key.jsx';
import InputDemo from './demos/34-input.jsx';
import AreaDemo from './demos/35-area.jsx';
import SelectDemo from './demos/36-select.jsx';
import CheckDemo from './demos/37-check.jsx';
import RadioDemo from './demos/38-radio.jsx';
import FieldsDemo from './demos/39-fields.jsx';
import SubmitDemo from './demos/40-submit.jsx';
import ClassDemo from './demos/41-class.jsx';
import MultiDemo from './demos/42-multi.jsx';
import UseIdDemo from './demos/43-useid.jsx';
import ObjectDemo from './demos/44-object.jsx';
import EmptyDemo from './demos/45-empty.jsx';
import EffectMount from './demos/46-effect.jsx';
import DepsDemo from './demos/47-deps.jsx';
import TimerDemo from './demos/48-timer.jsx';
import LoopDemo from './demos/49-loop.jsx';
import LintDemo from './demos/50-lint.jsx';
import LoadDemo from './demos/51-load.jsx';
import EmptyLoadDemo from './demos/52-empty.jsx';
import AbortDemo from './demos/53-abort.jsx';
import GetDemo from './demos/54-get.jsx';
import PostDemo from './demos/55-post.jsx';
import PutDemo from './demos/56-put.jsx';
import DeleteDemo from './demos/57-delete.jsx';
import ApiDemo from './demos/58-api.jsx';
import DeriveDemo from './demos/59-derive.jsx';
import ClickFetchDemo from './demos/60-click.jsx';
import HookDemo from './demos/61-hook.jsx';
import TwiceDemo from './demos/62-twice.jsx';
import LiftDemo from './demos/63-lift.jsx';
import SiblingsDemo from './demos/64-siblings.jsx';
import ContextDemo from './demos/65-context.jsx';
import RefDemo from './demos/66-ref.jsx';
import ReducerDemo from './demos/67-reducer.jsx';
import ProviderDemo from './demos/68-provider.jsx';
import ActionDemo from './demos/69-action.jsx';
import ActionStateDemo from './demos/70-action-state.jsx';
import OptimisticDemo from './demos/71-optimistic.jsx';
import DefaultDemo from './demos/72-default.jsx';
import RefCountDemo from './demos/73-ref-count.jsx';

const demos = [
  { id: '01', title: '函式元件', Component: Hello },
  { id: '02', title: 'Fragment', Component: FragmentDemo },
  { id: '03', title: '表達式', Component: ExprDemo },
  { id: '04', title: 'style 物件', Component: StyleDemo },
  { id: '05', title: '提早 return', Component: EarlyDemo },
  { id: '06', title: '三元運算子', Component: TernaryDemo },
  { id: '07', title: '邏輯且', Component: AndDemo },
  { id: '08', title: '數字 0', Component: ZeroDemo },
  { id: '09', title: '由父層傳入', Component: DownDemo },
  { id: '10', title: '拆分元件', Component: TreeDemo },
  { id: '11', title: '狀態的位置', Component: PlaceDemo },
  { id: '12', title: 'default export', Component: CardDemo },
  { id: '13', title: 'named export', Component: BoardDemo },
  { id: '14', title: '解構', Component: PropsDemo },
  { id: '15', title: '預設值', Component: DefaultsDemo },
  { id: '16', title: '函式型 props', Component: CallbackDemo },
  { id: '17', title: 'children', Component: ChildrenDemo },
  { id: '18', title: '宣告狀態', Component: CountDemo },
  { id: '19', title: '狀態快照', Component: SnapshotDemo },
  { id: '20', title: '更新函式', Component: UpdaterDemo },
  { id: '21', title: '批次更新', Component: BatchDemo },
  { id: '22', title: 'Hooks 規則', Component: RulesDemo },
  { id: '23', title: '陣列新增', Component: AddDemo },
  { id: '24', title: '陣列刪除', Component: RemoveDemo },
  { id: '25', title: '陣列修改', Component: EditDemo },
  { id: '26', title: '巢狀物件', Component: NestedDemo },
  { id: '27', title: '命名慣例', Component: EventDemo },
  { id: '28', title: '事件物件', Component: TargetDemo },
  { id: '29', title: '帶參數', Component: PickDemo },
  { id: '30', title: 'preventDefault', Component: PreventDemo },
  { id: '31', title: 'map', Component: MapDemo },
  { id: '32', title: 'filter', Component: FilterDemo },
  { id: '33', title: 'key', Component: KeyDemo },
  { id: '34', title: 'input', Component: InputDemo },
  { id: '35', title: 'textarea', Component: AreaDemo },
  { id: '36', title: 'select', Component: SelectDemo },
  { id: '37', title: 'checkbox', Component: CheckDemo },
  { id: '38', title: 'radio', Component: RadioDemo },
  { id: '39', title: '多欄位物件', Component: FieldsDemo },
  { id: '40', title: 'submit', Component: SubmitDemo },
  { id: '41', title: 'className', Component: ClassDemo },
  { id: '42', title: '多個狀態', Component: MultiDemo },
  { id: '43', title: 'useId', Component: UseIdDemo },
  { id: '44', title: '物件欄位', Component: ObjectDemo },
  { id: '45', title: '空清單', Component: EmptyDemo },
  { id: '46', title: '第一次執行', Component: EffectMount },
  { id: '47', title: '依賴陣列', Component: DepsDemo },
  { id: '48', title: '清除函式', Component: TimerDemo },
  { id: '49', title: '無限迴圈', Component: LoopDemo },
  { id: '50', title: '漏寫依賴', Component: LintDemo },
  { id: '51', title: '載入與錯誤', Component: LoadDemo },
  { id: '52', title: '空資料', Component: EmptyLoadDemo },
  { id: '53', title: 'AbortController', Component: AbortDemo },
  { id: '54', title: 'GET', Component: GetDemo },
  { id: '55', title: 'POST', Component: PostDemo },
  { id: '56', title: 'PUT', Component: PutDemo },
  { id: '57', title: 'DELETE', Component: DeleteDemo },
  { id: '58', title: 'API 模組', Component: ApiDemo },
  { id: '59', title: '渲染時計算', Component: DeriveDemo },
  { id: '60', title: '事件裡的請求', Component: ClickFetchDemo },
  { id: '61', title: '抽出讀取', Component: HookDemo },
  { id: '62', title: '在元件裡使用', Component: TwiceDemo },
  { id: '63', title: '父層持有', Component: LiftDemo },
  { id: '64', title: '兄弟元件', Component: SiblingsDemo },
  { id: '65', title: 'Provider', Component: ContextDemo },
  { id: '66', title: '聚焦輸入框', Component: RefDemo },
  { id: '67', title: '待辦清單', Component: ReducerDemo },
  { id: '68', title: '搭配 Context', Component: ProviderDemo },
  { id: '69', title: 'form action', Component: ActionDemo },
  { id: '70', title: 'useActionState', Component: ActionStateDemo },
  { id: '71', title: 'useOptimistic', Component: OptimisticDemo },
  { id: '72', title: '預設值', Component: DefaultDemo },
  { id: '73', title: '不觸發渲染的值', Component: RefCountDemo },
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

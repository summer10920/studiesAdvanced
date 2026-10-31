import { useToggle } from '../hooks/useToggle.js';

function Panel({ label, initialOpen }) {
  const { open, toggle } = useToggle(initialOpen);

  return (
    <section className="rounded border p-3">
      <p>
        {label}：{open ? '開' : '關'}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={toggle}
      >
        切換
      </button>
    </section>
  );
}

export default function ToggleDemo() {
  return (
    <section className="grid gap-3">
      <Panel label="左側" initialOpen={true} />
      <Panel label="右側" initialOpen={false} />
    </section>
  );
}

import { useLocalItems } from '../hooks/useLocalItems.js';

function NameList() {
  const { status, items } = useLocalItems();
  if (status !== 'ready') return <p>{status}</p>;
  return <p>{items.map((item) => item.title).join('、')}</p>;
}

export default function TwiceDemo() {
  return (
    <section className="grid gap-2">
      <NameList />
      <NameList />
    </section>
  );
}

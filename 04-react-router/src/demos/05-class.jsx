export default function ClassDemo() {
  const active = true;
  const buttonClass = active
    ? 'rounded bg-teal-800 px-3 py-1 text-white'
    : 'rounded bg-stone-200 px-3 py-1';

  return (
    <section>
      <p>{active ? '使用中' : '已停用'}</p>
      <button type="button" className={buttonClass}>
        洛奇旅行
      </button>
    </section>
  );
}

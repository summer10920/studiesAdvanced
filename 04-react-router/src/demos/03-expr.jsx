export default function ExprDemo() {
  const name = '台北城市漫遊';
  const price = 12800;
  const people = 2;
  let peopleLabel = '一人';
  if (people === 2) {
    peopleLabel = '兩人';
  } else if (people >= 3) {
    peopleLabel = '多人';
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>
        {peopleLabel} {price * people}
      </p>
    </section>
  );
}

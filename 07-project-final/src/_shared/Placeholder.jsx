export default function Placeholder({ title }) {
  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <h1 className="font-serif text-4xl font-bold text-ink">{title}</h1>
    </main>
  );
}

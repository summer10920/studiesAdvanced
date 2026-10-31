import { Link } from 'react-router';

export default function HomeLinkPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">首頁</h1>
      <p className="mt-2">
        <Link className="text-teal-800 underline" to="/items">
          看清單
        </Link>
      </p>
    </section>
  );
}

import { Link } from 'react-router';
import { themeLinks } from '../data/options.js';

export default function ThemeGrid() {
  return (
    <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {themeLinks.map((item) => (
        <li key={item.theme}>
          <Link to={`/tours?theme=${item.theme}`} className="group relative flex min-h-52 overflow-hidden rounded-card shadow-card">
            <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
            <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
            <span className="relative mt-auto flex flex-col px-5 py-5 text-white">
              <span className="font-serif text-3xl font-semibold">{item.theme}</span>
              <span className="text-foam">{item.places}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

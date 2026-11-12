import Typography from '@mui/material/Typography';
import { Link } from 'react-router';
import { themeLinks } from '../mock.data.js';

export default function ThemeSection() {
  return (
    <section className="bg-mist">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Typography variant="h2">依主題找路</Typography>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
          城市、海岸、山海、古都、離島，或飛一趟京都。
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {themeLinks.map((item) => (
            <li key={item.theme}>
              <Link
                to={`/tours?theme=${item.theme}`}
                className="group relative flex min-h-52 overflow-hidden rounded-card shadow-card"
              >
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <span className="relative mt-auto flex flex-col px-5 py-5 text-white">
                  <span className="font-serif text-3xl font-semibold">
                    {item.theme}
                  </span>
                  <span className="text-foam">{item.places}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

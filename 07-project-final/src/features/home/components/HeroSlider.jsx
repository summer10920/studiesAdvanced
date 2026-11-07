import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '../../../_shared/Icon.jsx';
import { ntd } from '../../../format.js';

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (!count || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), 4500);
    return () => clearInterval(timer);
  }, [count]);

  if (!count) return null;
  const go = (next) => setIndex(((next % count) + count) % count);
  const slide = slides[index % count];
  const bookTo = `/booking?tourId=${slide.id}&departureId=${slide.departures[0].id}`;

  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden lg:h-[70vh]" aria-roledescription="carousel" aria-label="熱門風景">
      {slides.map((item, itemIndex) => (
        <img
          key={item.id}
          src={item.cover}
          alt={itemIndex === index ? item.title : ''}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${itemIndex === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25" />
      <IconButton aria-label="上一張" onClick={() => go(index - 1)} className="absolute top-1/2 left-3 z-20 -translate-y-1/2 bg-white text-ink shadow-card md:left-6"><Icon name="chevron_left" /></IconButton>
      <IconButton aria-label="下一張" onClick={() => go(index + 1)} className="absolute top-1/2 right-3 z-20 -translate-y-1/2 bg-white text-ink shadow-card md:right-6"><Icon name="chevron_right" /></IconButton>
      <div className="relative z-10 w-full px-5 pt-24 pb-14 sm:px-8 lg:pb-28 lg:pl-20">
        <p className="font-serif text-3xl"><span className="inline-block rounded-full bg-accent text-ink font-bold leading-[1.15] py-[0.12em] px-[0.55em]">{ntd(slide.price)}</span></p>
        <p className="mt-3 text-base font-medium text-foam">{slide.region} · {slide.days} 天</p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl font-bold text-balance text-white md:text-6xl">{slide.title}</h1>
        <p className="mt-3 line-clamp-2 h-[2lh] max-w-xl text-base leading-relaxed text-white md:text-lg">{slide.intro}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button component={Link} to={bookTo} variant="contained">立即報名</Button>
          <Button component={Link} to={`/tours/${slide.id}`} variant="contained" color="secondary">看行程</Button>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:bottom-24">
        {slides.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            aria-label={`顯示${item.title}`}
            aria-current={itemIndex === index ? 'true' : undefined}
            onClick={() => go(itemIndex)}
            className={`h-3 w-3 rounded-full ${itemIndex === index ? 'bg-accent' : 'bg-white'}`}
          />
        ))}
      </div>
    </section>
  );
}

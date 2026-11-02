import { useState } from 'react';

export default function Gallery({ images, title }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div className="mt-8">
      <img className="aspect-[3/2] w-full rounded-card object-cover shadow-card" src={current} width="1200" height="800" alt={title} />
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            aria-label={`顯示${title}第 ${index + 1} 張`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => setActive(index)}
            className={`h-20 w-28 shrink-0 overflow-hidden rounded-2xl ring-2 ring-offset-2 ring-offset-paper ${index === active ? 'ring-action' : 'ring-transparent'}`}
          >
            <img className="h-full w-full object-cover" src={src} alt="" width="160" height="106" />
          </button>
        ))}
      </div>
    </div>
  );
}

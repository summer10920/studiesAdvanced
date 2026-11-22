import { useState } from 'react';

export default function Gallery({ images, title }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div className="mt-8">
      <img
        className="aspect-[3/2] w-full rounded-card object-cover shadow-card"
        src={current}
        width="1200"
        height="800"
        alt={title}
      />
      <div className="mt-3 flex gap-3 overflow-x-auto p-1">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            aria-label={`顯示${title}第 ${index + 1} 張`}
            onClick={() => setActive(index)}
            disabled={index === active}
            className="h-20 w-28 shrink-0 opacity-60 disabled:opacity-100"
          >
            <img
              className="h-full w-full rounded-2xl object-cover"
              src={src}
              alt=""
              width="160"
              height="106"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

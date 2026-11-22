const linesOf = (text) =>
  String(text)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const rowId = () => crypto.randomUUID();

export const empty = () => ({
  title: '',
  region: '',
  theme: '城市',
  days: 2,
  price: 0,
  images: [{ id: rowId(), url: '' }],
  intro: '',
  highlights: '',
  itinerary: [{ id: rowId(), title: '', body: '' }],
  includes: '',
  excludes: '',
  departures: [{ id: rowId(), date: '', capacity: 8 }],
  featured: false,
});

export const draftFromTour = (tour) => ({
  title: tour.title,
  region: tour.region,
  theme: tour.theme,
  days: tour.days,
  price: tour.price,
  images: tour.images?.length
    ? tour.images.map((url) => ({ id: rowId(), url }))
    : [{ id: rowId(), url: '' }],
  intro: tour.intro,
  highlights: (tour.highlights ?? []).join('\n'),
  itinerary: tour.itinerary?.length
    ? tour.itinerary.map(({ title, body }) => ({ id: rowId(), title, body }))
    : [{ id: rowId(), title: '', body: '' }],
  includes: (tour.includes ?? []).join('\n'),
  excludes: (tour.excludes ?? []).join('\n'),
  departures: tour.departures?.length
    ? tour.departures.map(({ date, capacity }) => ({
        id: rowId(),
        date,
        capacity,
      }))
    : [{ id: rowId(), date: '', capacity: 8 }],
  featured: Boolean(tour.featured),
});

export const tourFromDraft = (draft) => {
  if (!draft.title.trim()) return { error: '標題要填' };
  const images = (draft.images ?? [])
    .map((item) => String(item.url ?? '').trim())
    .filter(Boolean);
  const itinerary = (draft.itinerary ?? [])
    .map((item) => ({
      title: String(item.title ?? '').trim(),
      body: String(item.body ?? '').trim(),
    }))
    .filter((item) => item.title || item.body)
    .map((item, index) => ({
      day: index + 1,
      title: item.title,
      body: item.body,
    }));
  const departures = (draft.departures ?? [])
    .map((item) => ({
      date: String(item.date ?? '').trim(),
      capacity: Number(item.capacity) || 8,
    }))
    .filter((item) => item.date)
    .map((item) => ({
      id: item.date,
      date: item.date,
      capacity: item.capacity,
    }));
  return {
    error: '',
    tour: {
      title: draft.title.trim(),
      region: draft.region.trim(),
      theme: draft.theme,
      days: Number(draft.days),
      price: Number(draft.price),
      cover: images[0] || '',
      images,
      intro: draft.intro.trim(),
      highlights: linesOf(draft.highlights),
      itinerary,
      includes: linesOf(draft.includes),
      excludes: linesOf(draft.excludes),
      departures,
      featured: Boolean(draft.featured),
    },
  };
};

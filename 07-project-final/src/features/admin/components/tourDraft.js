const linesOf = (text) =>
  String(text)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

export const empty = {
  id: '',
  title: '',
  region: '',
  theme: '城市',
  days: 2,
  price: 0,
  images: [''],
  intro: '',
  highlights: '',
  itinerary: [{ title: '', body: '' }],
  includes: '',
  excludes: '',
  departures: [{ date: '', capacity: 8 }],
  featured: false,
};

export const draftFromTour = (tour) => ({
  id: tour.id,
  title: tour.title,
  region: tour.region,
  theme: tour.theme,
  days: tour.days,
  price: tour.price,
  images: tour.images?.length ? [...tour.images] : [''],
  intro: tour.intro,
  highlights: (tour.highlights ?? []).join('\n'),
  itinerary: tour.itinerary?.length
    ? tour.itinerary.map(({ title, body }) => ({ title, body }))
    : [{ title: '', body: '' }],
  includes: (tour.includes ?? []).join('\n'),
  excludes: (tour.excludes ?? []).join('\n'),
  departures: tour.departures?.length
    ? tour.departures.map(({ date, capacity }) => ({ date, capacity }))
    : [{ date: '', capacity: 8 }],
  featured: Boolean(tour.featured),
});

export const tourFromDraft = (draft) => {
  const id = draft.id.trim();
  if (!id || !draft.title.trim()) return { error: '編號和標題要填' };
  const images = (draft.images ?? [])
    .map((item) => String(item).trim())
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
      id,
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

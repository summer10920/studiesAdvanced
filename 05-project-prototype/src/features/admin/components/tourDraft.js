export const empty = {
  id: '',
  title: '',
  region: '',
  theme: '城市',
  days: 2,
  price: 0,
  cover: '',
  intro: '',
  highlights: '',
  date: '',
  capacity: 8,
};

export const draftFromTour = (tour) => ({
  id: tour.id,
  title: tour.title,
  region: tour.region,
  theme: tour.theme,
  days: tour.days,
  price: tour.price,
  cover: tour.cover,
  intro: tour.intro,
  highlights: tour.highlights.join('\n'),
  date: tour.departures[0]?.date ?? '',
  capacity: tour.departures[0]?.capacity ?? 8,
});

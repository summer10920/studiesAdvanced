export const ntd = (value) =>
  `NT$${Number(value).toLocaleString('zh-Hant-TW')}`;

export const perPerson = (tour) =>
  tour?.id === 'kyoto-nara' ? '/ 人，不含國際機票' : '/ 人';

export const statusLabel = {
  pending: '待確認',
  confirmed: '已確認',
  cancelled: '已取消',
};

export const seatsLeft = (bookings, tourId, departure) =>
  Math.max(
    0,
    departure.capacity -
      bookings
        .filter(
          (item) =>
            item.tourId === tourId &&
            item.departureId === departure.id &&
            item.status !== 'cancelled',
        )
        .reduce((sum, item) => sum + Number(item.people), 0),
  );

export const matchPrice = (price, band) => {
  if (!band) return true;
  if (band === 'lt10000') return price < 10000;
  if (band === '10000-20000') return price >= 10000 && price < 20000;
  if (band === '20000-30000') return price >= 20000 && price < 30000;
  if (band === 'gt30000') return price >= 30000;
  return true;
};

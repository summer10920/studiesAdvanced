import { tours, filterByDays } from './82-js-module-data.js';

const titles = filterByDays(tours, 3).map((tour) => tour.title);
console.log(titles);
console.log(tours.length);

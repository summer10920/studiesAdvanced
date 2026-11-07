import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import { reviews } from '../mock.data.js';
import { tours } from '../../tours/mock.data.js';

const titleOf = (tourId) => tours.find((tour) => tour.id === tourId)?.title ?? '';

export default function ReviewList() {
  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-2">
      {reviews.map((review) => (
        <Card key={review.id} component="figure" className="p-6 md:p-8">
          <Rating value={review.rating} readOnly aria-label={`${review.rating} 分`} />
          <blockquote className="mt-3 max-w-prose leading-relaxed">「{review.body}」</blockquote>
          <figcaption className="mt-3 text-muted">{review.author} · {review.rating} 分 · {titleOf(review.tourId)}</figcaption>
        </Card>
      ))}
    </div>
  );
}

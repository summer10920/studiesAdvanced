import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { reviews } from '../mock.data.js';
import { tours } from '../../tours/mock.data.js';

const titleOf = (tourId) =>
  tours.find((tour) => tour.id === tourId)?.title ?? '';

export default function ReviewSection() {
  return (
    <section className="bg-foam">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Typography variant="h2">旅客怎麼說</Typography>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
          出發回來之後，旅客留下的話。
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {reviews.map((review) => (
            <Card key={review.id} component="figure" className="p-6 md:p-8">
              <Rating value={review.rating} readOnly />
              <blockquote className="mt-3 max-w-prose leading-relaxed">
                「{review.body}」
              </blockquote>
              <figcaption className="mt-3 text-muted">
                {review.author} · {review.rating} 分 · {titleOf(review.tourId)}
              </figcaption>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

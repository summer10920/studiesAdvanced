import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import Alert from '@mui/material/Alert';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import BookingForm from './components/BookingForm.jsx';
import MemberGate from './components/MemberGate.jsx';
import LoadGate from '../../LoadGate.jsx';
import { ntd } from '../../format.js';
import { useTours } from '../../useAsync.js';

const steps = ['選出發日', '填寫資料', '送出確認'];

function BookingBody() {
  const { data, loading, error } = useTours();
  const tours = data ?? [];
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tour = tours.find(
    (item) => item.id === (params.get('tourId') || 'hualien-taroko'),
  );
  const departure =
    tour?.departures.find((item) => item.id === params.get('departureId')) ||
    tour?.departures[0];
  useEffect(() => {
    document.title = '報名 · 洛奇旅行';
  }, []);
  if (loading || error) return <LoadGate loading={loading} error={error} />;

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <Stepper
        activeStep={1}
        alternativeLabel
        className="mb-10"
        sx={{
          '& .MuiStepLabel-label': {
            fontSize: '1.125rem',
            fontWeight: 700,
            marginTop: '8px',
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography variant="h1">報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        姓名與 email 來自 Google 帳號。請留下電話，送出後會寫進訂單。
      </p>
      {!tour || !departure ? (
        <Alert className="mt-8" severity="warning">
          找不到這趟行程或出發日。
          <Link className="ml-2 underline" to="/tours">
            回行程
          </Link>
        </Alert>
      ) : (
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,22rem)]">
          <BookingForm
            tour={tour}
            departure={departure}
            onDone={(row) => navigate('/booking/done', { state: row })}
          />
          <aside className="rounded-card bg-white shadow-card p-6 md:p-8 lg:sticky lg:top-24">
            <Typography variant="h2">這趟行程</Typography>
            <dl className="mt-5 grid gap-4 text-base">
              <div>
                <dt className="text-muted">行程</dt>
                <dd className="mt-1 text-lg font-medium">{tour.title}</dd>
              </div>
              <div>
                <dt className="text-muted">出發日</dt>
                <dd className="mt-1 text-lg">{departure.date}</dd>
              </div>
              <div>
                <dt className="text-muted">天數</dt>
                <dd className="mt-1 text-lg">{tour.days} 天</dd>
              </div>
              <div>
                <dt className="text-muted">每人</dt>
                <dd className="mt-1 whitespace-nowrap font-serif text-3xl font-bold text-ink">
                  {ntd(tour.price)}
                  <span className="font-sans text-base font-normal text-muted">
                    {' '}
                    / 人
                  </span>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      )}
    </main>
  );
}

export default function BookingPage() {
  return (
    <MemberGate>
      <BookingBody />
    </MemberGate>
  );
}

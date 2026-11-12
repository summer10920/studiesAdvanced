import Typography from '@mui/material/Typography';

export default function IntroBanner() {
  return (
    <section className="mt-12 bg-ink text-white md:mt-20">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Typography
          variant="h2"
          className="text-balance text-4xl leading-snug text-white md:text-5xl"
        >
          <span className="whitespace-nowrap">把日子排鬆，</span>
          <br />
          <span className="whitespace-nowrap">把路走慢。</span>
        </Typography>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foam">
          每團最多 8
          人。地名寫清楚，一天只排一段路，下午留給自己。京都五日不含國際機票。
        </p>
      </div>
    </section>
  );
}

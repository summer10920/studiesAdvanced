import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { faqs } from '../data/faqs.js';

export default function AboutPage() {
  const [open, setOpen] = useState(null);
  useEffect(() => { document.title = '關於 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h1" className="max-w-[10em]">關於洛奇旅行</Typography>
      <p className="mt-4 max-w-prose text-lg leading-relaxed">洛奇旅行安排台灣本島與一條日本關西短團。我們把一天怎麼過寫清楚：具體地名、走路的時段、晚上住哪裡。每團 8 人，不催促、不加購物站。</p>
      <section className="panel mt-12 max-w-3xl px-6 py-8" aria-labelledby="license-title">
        <Typography id="license-title" variant="h2">執照與品保</Typography>
        <p className="mt-4">交通部觀光署旅行業執照交觀甲 999999 號</p>
        <p className="mt-3 text-muted">出團前以 email 確認。未成行，團費全額退回。</p>
      </section>
      <section className="mt-12 max-w-3xl" aria-labelledby="faq-title">
        <Typography id="faq-title" variant="h2">常見問題</Typography>
        <div className="mt-4">
          {faqs.map((item, index) => (
            <Accordion key={item.q} expanded={open === index} onChange={(_, expanded) => setOpen(expanded ? index : null)} className="mb-2">
              <AccordionSummary>{item.q}</AccordionSummary>
              <AccordionDetails><p className="max-w-prose text-muted">{item.a}</p></AccordionDetails>
            </Accordion>
          ))}
        </div>
      </section>
    </main>
  );
}

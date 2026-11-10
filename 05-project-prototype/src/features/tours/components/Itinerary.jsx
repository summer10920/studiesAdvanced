import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

export default function Itinerary({ days }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <Typography variant="h2" className="mt-14">
        每日行程
      </Typography>
      <p className="mt-3 text-base text-muted">
        展開每一天，看當天去哪裡、晚上住哪裡。
      </p>
      <div className="mt-5">
        {days.map((item) => (
          <Accordion
            key={item.day}
            expanded={open === item.day}
            onChange={(_, expanded) => setOpen(expanded ? item.day : null)}
            className="mb-2"
          >
            <AccordionSummary>
              第 {item.day} 天 · {item.title}
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-base leading-relaxed text-muted">
                {item.body}
              </p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
}

import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export default function Itinerary({ days }) {
  const [open, setOpen] = useState(null);
  return (
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
            <p className="text-base leading-relaxed text-muted">{item.body}</p>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Icon from './Icon.jsx';
import { reasons } from '../data/options.js';

const icons = ['groups', 'wb_sunny', 'hotel'];

export default function ReasonList() {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      {reasons.map((item, index) => {
        const iconName = icons[index];
        return (
          <Card key={item.title} className="p-6 md:p-8">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-mist text-action">
              <Icon name={iconName} />
            </span>
            <Typography variant="h3">{item.title}</Typography>
            <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
          </Card>
        );
      })}
    </div>
  );
}

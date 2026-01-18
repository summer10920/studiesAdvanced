import LinkItem from './components/LinkItem';
import reactLogo from '@assets/react.svg';
import viteLogo from '/vite.svg';
import { ImgLogo } from '../../_shared/util';

export default function LinkLogos() {
  const logoItems = [
    { id: 1, url: 'https://vite.dev', imgUrl: viteLogo, altText: 'Vite logo' },
    { id: 2, url: 'https://react.dev', imgUrl: reactLogo, altText: 'React logo' },
  ];

  return (
    <div>
      {logoItems.map((item) => (
        <LinkItem url={item.url} key={item.id}>
          <ImgLogo src={item.imgUrl} alt={item.altText} />
        </LinkItem>
      ))}
    </div>
  );
}

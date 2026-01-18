import LinkItem from './LinkItem';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

export default function LinkLogos() {
  const logoItems = [
    { id: 1, url: 'https://vite.dev', imgUrl: viteLogo, altText: 'Vite logo' },
    { id: 2, url: 'https://react.dev', imgUrl: reactLogo, altText: 'React logo' },
  ];

  return (
    <div>
      {logoItems.map((item) => (
        <LinkItem logoItem={item} key={item.id} />
      ))}
    </div>
  );
}

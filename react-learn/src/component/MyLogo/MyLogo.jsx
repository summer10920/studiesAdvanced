import reactLogo from '@assets/react.svg';
import viteLogo from '/vite.svg';
import { MyLink } from './MyLink';

export default function MyLogo() {
  const myBr = <br />;
  const dataList = [
    {
      id: 1,
      name: 'Vite Logo',
      img: viteLogo,
      url: 'https://vite.dev',
    },
    {
      id: 2,
      name: 'React Logo',
      img: reactLogo,
      url: 'https://react.dev',
    },
  ];

  return dataList.map((val) => <MyLink key={val.id} linkItem={val} />);
}

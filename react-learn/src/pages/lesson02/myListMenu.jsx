import MyItem from './myItem';

const listData = [
  {
    name: 'Menu A',
    child: [
      { name: 'Menu 1' },
      { name: 'Menu 2' },
      { name: 'Menu 3', child: [{ name: 'Menu I' }, { name: 'Menu II' }, { name: 'Menu III' }] },
    ],
  },
  {
    name: 'Menu B',
    child: [
      { name: 'Menu 1' },
      { name: 'Menu 2' },
      { name: 'Menu 3', child: [{ name: 'Menu I' }, { name: 'Menu II' }, { name: 'Menu III' }] },
    ],
  },
  {
    name: 'Menu C',
    child: [
      { name: 'Menu 1' },
      { name: 'Menu 2' },
      { name: 'Menu 3', child: [{ name: 'Menu I' }, { name: 'Menu II' }, { name: 'Menu III' }] },
    ],
  },
];

const MyListMenu = () => {
  return (
    <ul>
      {listData.map((obj) => (
        <MyItem key={obj.name} data={obj} />
      ))}
    </ul>
  );
};

export default MyListMenu;

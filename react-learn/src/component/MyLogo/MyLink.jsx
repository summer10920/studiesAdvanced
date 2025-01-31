function MyImg({ imgItem }) {
  return <img src={imgItem.img} className="logo" alt={imgItem.name} />;
}

//採用命名匯出
export function MyLink({ linkItem }) {
  return (
    <a href={linkItem.url} target="_blank">
      <MyImg imgItem={linkItem} />
    </a>
  );
}

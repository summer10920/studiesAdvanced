export default function LinkItem({ url, children }) {
  return (
    <a href={url} target="_blank">
      {children}
    </a>
  );
}

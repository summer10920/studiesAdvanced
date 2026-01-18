export function ImgLogo({ src, alt }) {
  return <img src={src} className="logo" alt={alt} />;
}

// 示範如何把一個fn指定動作丟給小元件
export function Loki({ onClick }) {
  return <button onClick={onClick}>Loki Component</button>;
}

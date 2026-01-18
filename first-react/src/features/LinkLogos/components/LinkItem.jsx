import { ImgLogo } from '../../../_shared/util';

export default function LinkItem({ logoItem }) {
  const { url, imgUrl, altText } = logoItem;
  return (
    <>
      <a href={url} target="_blank">
        <ImgLogo src={imgUrl} alt={altText} />
      </a>
    </>
  );
}

import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  style: string;
}

const Avatar = ({ src, fallbackSrc, alt, style }: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      className={style}
      width={72}
      height={72}
      alt={`${alt}`}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default Avatar;

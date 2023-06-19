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
    <img
      className={style}
      alt={`${alt}`}
      src={imgSrc}
      loading="lazy"
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default Avatar;

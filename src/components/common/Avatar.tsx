import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  src: string;
  fallbackSrc: string;
  width: number;
  height: number;
  alt: string;
}

const Avatar = ({ src, fallbackSrc, width, height, alt }: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      className="mx-4 block h-10 w-10 cursor-pointer  rounded-full object-cover "
      alt={alt}
      src={imgSrc}
      loading="lazy"
      width={width}
      height={height}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default Avatar;

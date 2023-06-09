import React from "react";
import Link from "next/link";

interface LogoProps {
  text: string;
  textYellow: string;
  logo: React.ReactNode;
}

const Logo = ({ text, logo, textYellow }: LogoProps) => {
  return (
    <Link href={"/"}>
      <div className="hidden items-center  justify-center lg:flex">
        <div className="text-logo ">{logo}</div>
        <h1 className="dark:text-dark-head self-center  whitespace-nowrap font-roboto text-xl font-semibold dark:text-gray-100   md:text-lg   lg:text-xl ">
          {text}
          <span className="inline-block   text-logo ">{textYellow}</span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;

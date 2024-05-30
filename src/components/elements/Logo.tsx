import React from "react";
import Link from "next/link";
import { MdWaterDrop } from "react-icons/md";
import { CLIENT_ROUTE_PATHS } from "@/constants/staticContents";

interface ILogoProps {
  text: string;
  textYellow: string;
  footer?: boolean;
}

const Logo = ({ text, textYellow, footer }: ILogoProps) => {
  return (
    <Link href={CLIENT_ROUTE_PATHS.HOME}>
      <div
        className={
          footer
            ? "ml-4 hidden items-center justify-center lg:flex"
            : "ml-4 hidden items-center justify-center lg:flex"
        }
      >
        <div className="text-logo ">
          <MdWaterDrop size={25} />
        </div>
        <h1
          className={
            footer
              ? "dark:text-dark-head md:text-md self-center whitespace-nowrap font-roboto text-base font-semibold dark:text-gray-100 lg:text-lg"
              : "dark:text-dark-head self-center whitespace-nowrap font-roboto text-xl font-semibold dark:text-gray-100 md:text-lg lg:text-xl"
          }
        >
          {text}
          <span className="inline-block text-logo">{textYellow}</span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;

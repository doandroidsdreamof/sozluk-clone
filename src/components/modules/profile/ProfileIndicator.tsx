import React from "react";
import Link from "next/link";

interface ProfileIndicatorProps {
  entryCount: string;
  followers: string;
  following: string;
}

const ProfileIndicator = ({
  entryCount,
  followers,
  following,
}: ProfileIndicatorProps) => {
  const insertElipsis = (param: string) => {
    const result =
      param.length >= 6 ? param.substring(0, 6).concat("...") : param;
    return result;
  };

  return (
    <div className="flex flex-row">
      <Link
        href={"/"}
        className="flex max-w-fit cursor-pointer rounded-md px-2.5 py-1.5 text-xs text-blue-600  hover:underline dark:text-brandGreen-600"
      >
        {insertElipsis(entryCount)} entry
      </Link>
      <Link
        href={"/"}
        className="flex max-w-fit cursor-pointer rounded-md px-2.5 py-1.5 text-xs text-blue-600  hover:underline dark:text-brandGreen-600"
      >
        {insertElipsis(followers)} followers
      </Link>
      <Link
        href={"/"}
        className="flex max-w-fit cursor-pointer truncate text-ellipsis rounded-md px-2.5 py-1.5 text-xs text-blue-600  hover:underline dark:text-brandGreen-600"
      >
        {insertElipsis(following)} following
      </Link>
    </div>
  );
};

export default ProfileIndicator;

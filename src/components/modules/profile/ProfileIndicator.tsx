import React from "react";
import Link from "next/link";
import { insertElipsis } from "~/utils/elipsis";

//TODO refactor

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
  const elipsisOffset = 6;

  return (
    <div className="flex flex-row">
      <span className="flex max-w-fit  rounded-md px-2.5 py-1.5 text-xs text-blue-600   dark:text-brandGreen-600">
        {insertElipsis(entryCount, elipsisOffset)} entry
      </span>
      <Link
        href={"/"}
        className="flex max-w-fit cursor-pointer rounded-md px-2.5 py-1.5 text-xs text-blue-600  hover:underline dark:text-brandGreen-600"
      >
        {insertElipsis(followers, elipsisOffset)} followers
      </Link>
      <Link
        href={"/"}
        className="flex max-w-fit cursor-pointer truncate text-ellipsis rounded-md px-2.5 py-1.5 text-xs text-blue-600  hover:underline dark:text-brandGreen-600"
      >
        {insertElipsis(following, elipsisOffset)} following
      </Link>
    </div>
  );
};

export default ProfileIndicator;

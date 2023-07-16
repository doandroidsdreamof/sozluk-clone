import Avatar from "~/components/common/Avatar";
import { useState } from "react";
import Link from "next/link";
import router from "next/router";

interface UserCardProps {
  imageURL?: string | null;
  userName: string;
  date?: Date;
  reverse?: boolean;
  email?: string;
  urlPath?: string;
  chatBox?: boolean;
}

const UserCard = ({
  imageURL,
  date,
  userName,
  reverse,
  email,
  urlPath,
  chatBox,
}: UserCardProps) => {
  const handleNavigation = () => {
    if (urlPath) void router.push(`/${urlPath}/${userName}`);
  };
  return (
    <div
      className={
        reverse
          ? `mr-auto  flex flex-row-reverse items-center`
          : "ml-auto flex flex-row"
      }
    >
      <div className="mt-0.5">
        <button onClick={handleNavigation}>
          <h1
            className={
              !chatBox
                ? "cursor-pointer text-[0.80rem] font-bold   text-typography-body-light hover:underline dark:text-typography-body-dark"
                : "cursor-pointer text-[0.80rem] font-bold   text-typography-body-light hover:underline"
            }
          >
            {userName}
          </h1>
        </button>
        <p className="font-helvetica text-[0.75em]  font-light text-typography-body-secondary-light dark:text-typography-body-faded-light">
          {date?.toDateString()}
        </p>
        {email ? (
          <p className="font-helvetica text-[0.75em]  font-light text-typography-body-secondary-light dark:text-typography-body-faded-light">
            {email}
          </p>
        ) : (
          <></>
        )}
      </div>
      <button onClick={handleNavigation}>
        <Avatar
          style="mx-4 block  h-10 w-10 cursor-pointer  rounded-full object-cover"
          alt="avatar"
          src="/images/default-avatar.png"
          fallbackSrc="/images/default-avatar.png"
        />
      </button>
    </div>
  );
};

export default UserCard;

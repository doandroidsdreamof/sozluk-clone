import Avatar from "~/components/common/Avatar";
import { useState } from "react";
import Link from "next/link";

interface ProfileCardProps {
  imageURL?: string | null;
  userName: string;
  date?: Date;
  followCard?: boolean;
  email?: string;
}

const ProfileCard = ({
  imageURL,
  date,
  userName,
  followCard,
  email,
}: ProfileCardProps) => {
  return (
    <div
      className={
        followCard
          ? "ml-auto   flex flex-row-reverse items-center"
          : "ml-auto  flex flex-row"
      }
    >
      <div className="mt-0.5">
        <Link href={`/profile/${userName}`}>
          <h1 className="cursor-pointer text-[0.80rem] font-bold  text-typography-body-light hover:underline dark:text-typography-body-dark">
            {userName}
          </h1>
        </Link>
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
      <Link href={`/profile/${userName}`}>
        <Avatar
          style="mx-4 block  h-10 w-10 cursor-pointer  rounded-full object-cover"
          alt="avatar"
          src="/images/default-avatar.png"
          fallbackSrc="/images/default-avatar.png"
        />
      </Link>
    </div>
  );
};

export default ProfileCard;

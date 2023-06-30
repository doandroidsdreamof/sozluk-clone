import Avatar from "~/components/common/Avatar";
import { useState } from "react";
import Link from "next/link";

interface ProfileCardProps {
  imageURL: string;
  name: string;
  date?: Date;
}

const ProfileCard = ({ imageURL, date, name }: ProfileCardProps) => {
  return (
    <div className="ml-auto  flex flex-row">
      <div className="mt-0.5">
        <Link href={`/profile/${name}`}>
          <h1 className="cursor-pointer text-[0.80rem] font-bold  text-typography-body-light hover:underline dark:text-typography-body-dark">
            {name}
          </h1>
        </Link>
        <p className="font-helvetica text-[0.75em]  font-light text-typography-body-secondary-light dark:text-typography-body-faded-light">
          {date?.toDateString()}
        </p>
      </div>
      <Link href={`/profile/${name}`}>
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

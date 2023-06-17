import React from "react";
import { Avatar } from "~/components/common/index";

interface ProfileCardProps {
  imageURL: string;
  name: string;
  date?: Date;
}

const ProfileCard = ({ imageURL, date, name }: ProfileCardProps) => {
  return (
    <>
      <div className="mt-0.5">
        <h1 className="text-[0.80rem]   font-bold text-typography-body-light dark:text-typography-body-dark">
          {name}
        </h1>
        <p className="font-helvetica text-[0.75em] font-light text-typography-body-secondary-light dark:text-typography-body-faded-light">
          {date?.toDateString()}
        </p>
      </div>
      <Avatar
        alt="avatar"
        width={144}
        height={144}
        src="/images/default-avatar.png"
        fallbackSrc="/images/default-avatar.png"
      />
    </>
  );
};

export default ProfileCard;

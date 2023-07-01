import React from "react";
import ProfileCard from "./ProfileCard";
import FollowButton from "./FollowButton";
import { useSession } from "next-auth/react";

interface IFollowersProps {
  avatar: string | null;
  userName: string;
  userId: string;
  email: string;
}

const FollowersCard = ({
  avatar,
  userName,
  userId,
  email,
}: IFollowersProps) => {
  const session = useSession();

  return (
    <div className="relative flex min-h-[6rem]  w-full   flex-col justify-center rounded-sm bg-white p-3  text-sm shadow-sm dark:bg-bg-alt-dark   lg:w-[35rem]  ">
      <div className="flex flex-row  items-center  justify-between ">
        <div>
          {userName && (
            <ProfileCard
              email={email}
              followCard={true}
              userName={userName}
              imageURL={avatar}
            />
          )}
        </div>
        {userId && session.data?.user.id !== userId ? (
          <FollowButton userId={userId} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FollowersCard;

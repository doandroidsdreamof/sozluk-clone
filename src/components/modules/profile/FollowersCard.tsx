import { useSession } from "next-auth/react";
import FollowButton from "./FollowButton";
import UserCard from "@/components/common/UserCard";
import { CLIENT_ROUTE_PATHS } from "@/constants/staticContents";

interface IFollowersProps {
  avatar: string | null;
  userName: string;
  userId: string;
}

const FollowersCard = ({ avatar, userName, userId }: IFollowersProps) => {
  const session = useSession();

  return (
    <div className="relative flex min-h-[6rem]  w-full   flex-col justify-center rounded-sm bg-white p-3  text-sm shadow-sm dark:bg-bg-secondary-dark   lg:w-[35rem]  ">
      <div className="flex flex-row  items-center  justify-between ">
        <div>
          {userName && (
            <UserCard
              reverse={true}
              userName={userName}
              imageURL={avatar}
              urlPath={CLIENT_ROUTE_PATHS.PROFILE}
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

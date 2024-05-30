import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

interface FollowButtonProps {
  userId: string;
}

const FollowButton = ({ userId }: FollowButtonProps) => {
  const { mutate: followUser } = api.follow.followUser.useMutation();
  const { data: followServerState } = api.follow.checkFollow.useQuery({
    followerId: userId,
  });
  const [follow, setFollow] = useState(true);
  const utils = api.useContext();
  const session = useSession();

  useEffect(() => {
    setFollow(followServerState ? true : false);
  }, [followServerState]);

  const handleClick = () => {
    followUser(
      {
        followerId: userId,
      },
      {
        onSuccess: () => {
          utils.follow.checkFollow
            .invalidate()
            .catch((err) => console.error(err));
          utils.user.getUserProfileData
            .invalidate()
            .catch((err) => console.error(err));
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <>
      {session.data?.user ? (
        <Button onClick={handleClick} size="tiny" type="primary">
          {!follow ? "follow user" : "unfollow user"}
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default FollowButton;

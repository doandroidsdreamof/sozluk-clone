import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { api } from "~/utils/api";

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

  useEffect(() => {
    setFollow(followServerState ? true : false);
  }, [followServerState]);
  console.log(
    "🚀 ~ file: FollowButton.tsx:20 ~ useEffect ~ followServerState:",
    followServerState
  );

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
    <Button onClick={handleClick} size="tiny" type="primary">
      {follow ? "unfollow user" : "follow user"}
    </Button>
  );
};

export default FollowButton;

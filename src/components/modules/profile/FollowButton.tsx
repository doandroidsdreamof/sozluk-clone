import React, { useState } from "react";
import Button from "../button/Button";
import { api } from "~/utils/api";

interface FollowButtonProps {
  userId: string;
}

const FollowButton = ({ userId }: FollowButtonProps) => {
  const { mutate: followUser } = api.follow.followUser.useMutation();
  const [follow, setFollow] = useState(true);

  const handleClick = () => {
    followUser(
      {
        followerId: userId,
      },
      {
        onSuccess: (data) => {
          if (data.alreadyFollow === false) {
            setFollow(false);
          }
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <Button onClick={handleClick} size="tiny" type="primary">
      {follow ? "follow user" : "unfollow user"}
    </Button>
  );
};

export default FollowButton;

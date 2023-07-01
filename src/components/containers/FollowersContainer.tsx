import React from "react";
import { useAppSelector } from "~/lib/store/hooks";
import { type IUserName } from "~/@types/interface";
import { api } from "~/utils/api";
import FollowersCard from "../modules/profile/FollowersCard";
import { useRouter } from "next/router";

const FollowersContainer = () => {
  const router = useRouter();
  const { userName: userName } = router.query as {
    userName: string;
  };

  const { data: followersData } = api.follow.getFollowers.useQuery({
    userName: userName,
  });
  const { data: followingData } = api.follow.getFollowing.useQuery({
    userName: userName,
  });

  const tabState = useAppSelector((state) => state.activeFollowers.followers);

  return (
    <>
      {!tabState
        ? followersData?.map((items) => (
            <FollowersCard
              avatar={items.follower.avatar}
              userId={items.follower.id}
              userName={items.follower.name}
              email={items.follower.email}
              key={items.follower.id}
            />
          ))
        : followingData?.map((items) => (
            <FollowersCard
              avatar={items.following.avatar}
              userId={items.following.id}
              userName={items.following.name}
              email={items.following.email}
              key={items.following.id}
            />
          ))}
    </>
  );
};

export default FollowersContainer;

import React from "react";
import { useAppSelector } from "~/lib/store/hooks";

const FollowersContainer = () => {
  const tabState = useAppSelector((state) => state.activeFollowers.followers);

  return (
    <div className="text-white">{tabState ? "followers" : "following"}</div>
  );
};

export default FollowersContainer;

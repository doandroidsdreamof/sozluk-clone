import React from "react";
import ProfileHeader from "../modules/profile/ProfileHeader";
import { api } from "~/utils/api";
import { type IUserName } from "~/@types/interface";

const ProfileHeaderContainer = ({ userName }: IUserName) => {
  const { data } = api.user.getUserProfileData.useQuery({
    userName: userName,
  });

  return (
    <div>
      {data ? (
        <ProfileHeader
          entryCount={data.entryCount}
          followersCount={data.followersCount}
          followingCount={data.followingCount}
          role={data.role}
          userName={data.name}
          userId={data.id}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileHeaderContainer;

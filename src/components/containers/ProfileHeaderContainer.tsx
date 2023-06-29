import React from "react";
import ProfileHeader from "../modules/profile/ProfileHeader";
import { api } from "~/utils/api";

const ProfileHeaderContainer = () => {
  const { data } = api.user.getUserProfileData.useQuery();

  return <div>{/* <ProfileHeader /> */}</div>;
};

export default ProfileHeaderContainer;

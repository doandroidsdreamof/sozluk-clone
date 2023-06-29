import React from "react";
import Tabs from "../modules/profile/Tabs";
import ProfileHeader from "../modules/profile/ProfileHeader";
import { useSession } from "next-auth/react";
import ProfileHeaderContainer from "../containers/ProfileHeaderContainer";
import { type IUserName } from "~/@types/interface";

const ProfileLayout = ({ userName }: IUserName) => {
  const session = useSession();

  return (
    <div className=" top-0 flex min-h-screen w-full  flex-col justify-between gap-4 p-3 px-3 md:mx-auto  lg:w-[38rem]  lg:px-0   ">
      <ProfileHeaderContainer userName={userName} />
      <Tabs userName={userName} />
    </div>
  );
};

export default ProfileLayout;

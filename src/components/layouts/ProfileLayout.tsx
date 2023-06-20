import React from "react";
import { Tabs, ProfileHeader } from "../modules/index";
import { useSession } from "next-auth/react";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = () => {
  const session = useSession();

  return (
    <div className=" top-0 flex min-h-screen w-full  flex-col justify-between gap-4 p-3 px-3 md:mx-auto  lg:w-[38rem]  lg:px-0   ">
      <ProfileHeader />
      <Tabs />
    </div>
  );
};

export default ProfileLayout;

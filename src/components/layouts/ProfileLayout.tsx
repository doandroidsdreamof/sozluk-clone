import React from "react";
import { Tabs, ProfileHeader } from "../modules/index";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = () => {
  return (
    <div className=" top-0 flex min-h-screen w-full flex-col justify-between gap-4 border p-3  md:mx-auto  lg:w-[46rem]  lg:pl-20">
      <Tabs />
    </div>
  );
};

export default ProfileLayout;

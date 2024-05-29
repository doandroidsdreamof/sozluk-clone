import { useSession } from "next-auth/react";
import { useState } from "react";
import { type IUserName } from "~/@types/interface";
import FollowersContainer from "../containers/FollowersContainer";
import Tabs from "../modules/profile/Tabs";

const categories = [
  { id: 0, name: "followers" },
  { id: 1, name: "following" },
];

const FollowersLayout = ({ userName }: IUserName) => {
  const session = useSession();

  return (
    <div className=" top-0 flex min-h-screen w-full   flex-col justify-items-start  gap-4 p-3 px-3 md:mx-auto lg:w-[36rem]  lg:px-0  lg:pr-5">
      <Tabs profilePage={false} categories={categories} />
      <FollowersContainer />
    </div>
  );
};

export default FollowersLayout;

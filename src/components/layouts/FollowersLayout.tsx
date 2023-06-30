import { useSession } from "next-auth/react";
import { useState } from "react";
import { type IUserName } from "~/@types/interface";
import ProfileHeaderContainer from "../containers/ProfileHeaderContainer";
import Tabs from "../modules/profile/Tabs";

const FollowersLayout = ({ userName }: IUserName) => {
  const session = useSession();
  const [categories] = useState({
    followers: [{ id: 0 }, { name: "followers" }],
    following: [{ id: 1 }, { name: "following" }],
  });

  return (
    <div className=" top-0 flex min-h-screen w-full  flex-col justify-between gap-4 p-3 px-3 md:mx-auto lg:w-[36rem]  lg:px-0  lg:pr-5   ">
      <Tabs profilePage={false} categories={categories} />
    </div>
  );
};

export default FollowersLayout;

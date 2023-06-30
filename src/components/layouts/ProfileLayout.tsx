import { useSession } from "next-auth/react";
import { useState } from "react";
import { type IUserName } from "~/@types/interface";
import ProfileHeaderContainer from "../containers/ProfileHeaderContainer";
import Tabs from "../modules/profile/Tabs";

const ProfileLayout = ({ userName }: IUserName) => {
  const session = useSession();
  const [categories] = useState({
    entries: [{ id: 0 }, { name: "entries" }],
    favorites: [{ id: 1 }, { name: "favorites" }],
    images: [{ id: 2 }, { name: "images" }],
  });

  return (
    <div className=" top-0 flex min-h-screen w-full  flex-col justify-between gap-4 p-3 px-3 md:mx-auto  lg:w-[38rem]  lg:px-0   ">
      <ProfileHeaderContainer userName={userName} />
      <Tabs profilePage={true} categories={categories} />
    </div>
  );
};

export default ProfileLayout;

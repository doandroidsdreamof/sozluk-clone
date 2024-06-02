import { type IUserName } from "@/@types/interface";
import dynamic from "next/dynamic";

const Tabs = dynamic(() => import("@/components/modules/profile/Tabs"), {
  ssr: false,
});

const ProfileHeaderContainer = dynamic(
  () => import("@/components/containers/ProfileHeaderContainer"),
  {
    ssr: false,
  }
);

const categories = [
  { id: 0, name: "entries" },
  { id: 1, name: "favorites" },
  { id: 2, name: "images" },
];

const ProfileLayout = ({ userName }: IUserName) => {
  return (
    <div className="top-0 flex min-h-screen w-full flex-col justify-between gap-4 p-3 px-3 md:mx-auto lg:w-[38rem] lg:-translate-x-3 lg:px-0">
      <ProfileHeaderContainer userName={userName} />
      <Tabs profilePage={true} categories={categories} />
    </div>
  );
};

export default ProfileLayout;
